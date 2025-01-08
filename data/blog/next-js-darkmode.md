---
title: Next.js와 React의 렌더링 차이 - 다크 모드 구현을 통해 살펴보기
date: 2025-01-02
category: Next.js
thumbnail: implementing-dark-mode.png
---

### 목차

- [1. React에서 다크 모드 구현](#1-react에서-다크-모드-구현)
  - [1.1. useEffect를 사용한 다크 모드 구현](#11-useeffect를-사용한-다크-모드-구현)
  - [1.2. 깜빡임 문제: useEffect와 useLayoutEffect 비교](#12-깜빡임-문제-useeffect와-uselayouteffect-비교)
- [2. Next.js에서 다크 모드 구현: 문제점](#2-nextjs에서-다크-모드-구현-문제점)
  - [2.1. Next.js의 렌더링 과정](#21-nextjs의-렌더링-과정)
- [3. Next.js에서 깜빡임 없는 다크 모드 구현: next-themes 리버스 엔지니어링](#3-nextjs에서-깜빡임-없는-다크-모드-구현-next-themes-리버스-엔지니어링)
  - [3.1. ThemeContext와 ThemeProvider](#31-themecontext와-themeprovider)
  - [3.2. Theme 컴포넌트와 ThemeScript](#32-theme-컴포넌트와-themescript)
  - [3.3. 핵심: React 하이드레이션 전에 DOM에 테마 적용](#33-핵심-react-하이드레이션-전에-dom에-테마-적용)
- [4. 직접구현](#4-직접구현)
  - [4.1. ThemeScript 구현: SSR에서 초기 테마 설정 코드 삽입](#41-themescript-구현-ssr에서-초기-테마-설정-코드-삽입)
  - [4.2. ThemeProvider 구현: 테마 상태 관리](#42-themeprovider-구현-테마-상태-관리)
  - [4.3. 애플리케이션에 통합](#43-애플리케이션에-통합)

---

Next.js는 React를 기반으로 한 프레임워크지만, **클라이언트 렌더링 방식에서 차이**가 있음을 다크 모드를 구현하면서 알게 되었습니다. 다크 모드는 사용자 경험을 개선하고 접근성을 높이는 중요한 UI 요소입니다. 일반적으로 React로 다크 모드를 구현하는 방식과 Next.js에서 이를 적용했을 때의 차이를 살펴보고, 이를 해결하기 위해 `next-themes` 라이브러리를 활용하는 방식을 분석하겠습니다.

## 1. React에서 다크 모드 구현

React에서 다크 모드는 다음과 같은 방식으로 구현됩니다:

1. **로컬 스토리지 확인:**

   사용자의 테마 설정이 로컬 스토리지에 저장되어 있는지 확인합니다. 저장된 설정이 없다면, 운영체제의 다크 모드 여부를 감지하여 기본 테마를 결정합니다.

2. **테마 설정 적용:**

   결정된 테마를 HTML 루트 요소(`<html>`)에 클래스(`class="dark"`)나 속성(`data-theme="dark"`)으로 추가합니다.

### 1.1. `useEffect`를 사용한 다크 모드 구현

React의 `useEffect`를 사용하여 로컬 스토리지에서 테마를 읽고 설정하는 코드는 다음과 같습니다:

```tsx
export const DarkModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = React.useState(false)

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev)
    updateDarkMode(!darkMode)
  }

  React.useEffect(() => {
    const isDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setDarkMode(isDark)
    updateDarkMode(isDark)
  }, [])

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}
```

### 1.2. 깜빡임 문제: `useEffect`와 `useLayoutEffect` 비교

**`useEffect`를 사용할 경우**

`useEffect`는 브라우저가 **렌더링을 완료한 후 실행**되기 때문에, 초기 렌더링 시 HTML 루트 요소가 아무런 클래스도 가지지 않은 상태로 표시됩니다. 이로 인해 **라이트 모드로 잠시 렌더링된 뒤 다크 모드로 전환**되는 "깜빡임(FOUC)" 현상이 발생할 수 있습니다.

![useEffect.gif](/images/posts/next-js-darkmode/useEffect.gif)

![useEffect.png](/images/posts/next-js-darkmode/useEffect.png)

레이아웃, 페인트가 완료된 뒤에 `useEffect`의 함수호출이 이루어지는 것을 볼 수 있습니다.

**`useLayoutEffect`로 전환**

`useLayoutEffect`는 **DOM 업데이트 직후 실행**되므로, 테마가 완전히 설정된 상태에서 화면이 렌더링됩니다. 이를 통해 초기 렌더링에서 깜빡임 현상을 방지할 수 있습니다.

![useLayoutEffect.gif](/images/posts/next-js-darkmode/useLayoutEffect.gif)

![useLayoutEffect.png](/images/posts/next-js-darkmode/useLayoutEffect.png)

레이아웃 단계 전에 `useLayoutEffect` 함수가 호출됨을 확인할 수 있습니다.

## 2. Next.js에서 다크 모드 구현: 문제점

그러나 React에서의 `useLayoutEffect` 방식은 Next.js 환경에서 동일한 결과를 얻지 못합니다. 이유는 Next.js의 렌더링 메커니즘이 **SSR(서버 사이드 렌더링)**을 기반으로 하기 때문입니다.

### 2.1. Next.js의 렌더링 과정

1. **서버에서 HTML 생성 (SSR)**: Next.js는 React 컴포넌트를 서버에서 렌더링하여 초기 HTML을 생성합니다. 브라우저는 이 HTML을 파싱하고 화면에 렌더링합니다. (전체 페이지를 클라이언트 컴포넌트로 구현했다고 하더라도, Next.js는 최대한 서버에서 만들 수 있는 부분은 서버에서 만들어서 가지고 옵니다.)
2. **클라이언트 하이드레이션:** 브라우저는 서버에서 전달된 HTML과 React 컴포넌트를 연결하여 **React 상태 관리 및 동적 동작**이 가능하도록 만듭니다.
3. **React의 부수 효과 실행:** 하이드레이션이 완료된 후, React는 `useEffect`와 `useLayoutEffect`를 실행합니다. 따라서 Next.js에서는 React 하이드레이션 이후에만 테마가 적용되므로 **초기 깜빡임 문제가 해결되지 않습니다**.

![useLayoutEffect.png](/images/posts/next-js-darkmode/next-js.png)

![useLayoutEffect.png](/images/posts/next-js-darkmode/next-js-2.png)

브라우저 성능 탭과 네트워크 탭을 확인하면, 서버에서 생성한 HTML을 보내고, 브라우저는 그 HTML을 파싱한 뒤, 스타일 파일을 전부 받은 뒤, 레이아웃작업을 거칩니다. Load 작업이 완료된 뒤에 `DarkModeProvider.useLayoutEffect` 함수호출을 통해 레이아웃이 다시 한 번 변경되면서 다크모드로 스타일이 전환되는 것을 볼 수 있습니다.

<aside>

<a href='https://github.com/reactwg/server-components/discussions/4' target='_blank'>Next.js 클라이언트 렌더링 </a>

</aside>

## 3. Next.js에서 깜빡임 없는 다크 모드 구현: `next-themes` 리버스 엔지니어링

그렇다면, Next.js에서깜빡임(Flash of Unstyled Content, FOUC)없는 다크모드를 구현하기 위해서는, 어떤 방법이 있을까요?

`next-themes`는 React 하이드레이션 전에 DOM에 테마를 적용하여 깜빡임 없는 초기 렌더링을 제공합니다. 이를 가능하게 하는 핵심은 **서버에서 JavaScript를 삽입하여 클라이언트가 HTML을 렌더링할 때 즉시 테마를 설정**하는 방식입니다.

이번 파트에서는 `next-themes` 라이브러리를 리버스 엔지니어링하여, 해당 라이브러리가 어떻게 React 하이드레이션(hydration) 전에 DOM에 테마를 적용하는지 내부 동작 원리를 분석해보겠습니다.

[https://github.com/pacocoursey/next-themes/blob/main/next-themes/src/index.tsx](https://github.com/pacocoursey/next-themes/blob/main/next-themes/src/index.tsx)

### 3.1. `ThemeContext`와 `ThemeProvider`

`next-themes`는 `ThemeContext`와 이를 기반으로 한 `ThemeProvider`를 통해 테마 설정과 관련된 상태 및 기능을 제공합니다. 이를 통해 컴포넌트 트리에서 테마 상태를 공유하고 관리할 수 있습니다

**`ThemeProvider`의 구현:**

```tsx
export const ThemeProvider = (props: ThemeProviderProps) => {
  const context = React.useContext(ThemeContext)

  // Ignore nested context providers, just passthrough children
  if (context) return <>{props.children}</>
  return <Theme {...props} />
}
```

- 이미 상위에 `ThemeProvider`가 있다면, 추가적인 동작 없이 `children`만 렌더링합니다.
- `ThemeProvider`가 최상위에 있으면, 내부적으로 `Theme` 컴포넌트를 호출하여 테마 관련 로직을 실행합니다.

### 3.2. `Theme` 컴포넌트와 `ThemeScript`

`Theme` 컴포넌트는 테마를 설정하고 상태를 관리하는 핵심 로직을 포함합니다. 특히, DOM에 초기 테마를 적용하기 위해 React 컴포넌트와 함께 `<script>` 태그를 삽입하는 `ThemeScript`를 반환하는 것이 특징입니다.

**`Theme` 컴포넌트의 주요 로직:**

```tsx
return (
  <ThemeContext.Provider value={providerValue}>
    <ThemeScript
      {...{
        forcedTheme,
        storageKey,
        attribute,
        enableSystem,
        enableColorScheme,
        defaultTheme,
        value,
        themes,
        nonce,
        scriptProps,
      }}
    />
    {children}
  </ThemeContext.Provider>
)
```

- **`ThemeContext.Provider`:** 테마 관련 상태와 함수를 자식 컴포넌트에 전달합니다.
- **`ThemeScript`:** 초기 테마를 DOM에 설정하는 `<script>` 태그를 렌더링합니다.

**`ThemeScript`의 역할:**

`ThemeScript`는 SSR 단계에서 HTML에 JavaScript 코드를 삽입해, 브라우저가 React 하이드레이션 전에 DOM에 테마를 적용할 수 있도록 합니다.

```tsx
const ThemeScript = React.memo(
  ({
    forcedTheme,
    storageKey,
    attribute,
    enableSystem,
    enableColorScheme,
    defaultTheme,
    value,
    themes,
    nonce,
    scriptProps,
  }: Omit<ThemeProviderProps, 'children'> & { defaultTheme: string }) => {
    const scriptArgs = JSON.stringify([
      attribute,
      storageKey,
      defaultTheme,
      forcedTheme,
      themes,
      value,
      enableSystem,
      enableColorScheme,
    ]).slice(1, -1)

    return (
      <script
        {...scriptProps}
        suppressHydrationWarning
        nonce={typeof window === 'undefined' ? nonce : ''}
        dangerouslySetInnerHTML={{ __html: `(${script.toString()})(${scriptArgs})` }}
      />
    )
  }
)
```

`dangerouslySetInnerHTML`로 주입되는 스크립트를 위의 `scriptArgs`를 인자값으로 하여 즉시실행함수와 클로저를 이용하여 실행시키는 것을 확인할 수 있습니다.

### 3.3. 핵심: React 하이드레이션 전에 DOM에 테마 적용

`ThemeScript`는 `dangerouslySetInnerHTML`을 사용해 `<script>` 태그로 JavaScript 코드를 삽입합니다. 삽입된 코드는 브라우저가 HTML을 파싱하는 동안 실행되어 React 하이드레이션 이전에 DOM에 테마를 적용합니다. 이 과정을 통해 next-themes을 사용하면 초기 스타일 깜빡임(FOUC)를 방지할 수 있게 됩니다.

`script` 코드:

[https://github.com/pacocoursey/next-themes/blob/main/next-themes/src/script.ts](https://github.com/pacocoursey/next-themes/blob/main/next-themes/src/script.ts)

- **`updateDOM`:** DOM의 `class` 또는 `data-` 속성을 업데이트하여 테마를 설정합니다.
- **`setColorScheme`:** 브라우저의 기본 UI(예: 스크롤바)의 색상을 테마에 맞게 설정합니다.
- **로컬 스토리지 확인:** `localStorage`에서 저장된 테마를 읽어오거나, 없을 경우 기본 테마(`defaultTheme`)를 사용합니다.
- **시스템 테마 지원:** 시스템 다크 모드(`(prefers-color-scheme: dark)`)를 감지해 테마를 설정합니다.

Next.js에서 깜빡임 없는 다크 모드를 구현하려면, React 하이드레이션 전에 테마를 적용해야 합니다. `next-themes`는 SSR 단계에서 `<script>` 태그를 삽입하고, 브라우저가 HTML을 파싱하면서 테마를 즉시 적용하도록 설계되었습니다.

이를 통해 React의 렌더링 메커니즘을 이해하고, 초기 렌더링에서 사용자 경험을 개선할 수 있습니다.

## 4. 직접구현

원리는 알겠으나, 직접 구현해보고 어떻게 주입되는 지 확인을 해봐야할 것 같습니다.

### 4.1. `ThemeScript` 구현: SSR에서 초기 테마 설정 코드 삽입

먼저, 테마 설정을 위한 `<script>` 태그를 생성하는 컴포넌트를 작성합니다. 이 컴포넌트는 SSR 단계에서 HTML에 포함되어 브라우저가 HTML을 렌더링할 때 즉시 실행됩니다.

```tsx
export const script = (storageKey: string, defaultTheme: string) => {
  let theme
  try {
    theme = localStorage.getItem(storageKey) || defaultTheme
  } catch (e) {
    theme = defaultTheme
  }

  if (theme !== null) {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
  }
}
```

### 4.2. `ThemeProvider` 구현: 테마 상태 관리

`ThemeProvider`는 React Context를 사용하여 테마 상태를 관리하고, 테마를 변경하거나 토글할 수 있는 기능을 제공합니다.

```tsx
'use client'

import React, { createContext, useCallback, useContext, useEffect } from 'react'
import { script } from './script'

type ThemeContextType = {
  theme: string
  setTheme: (theme: string) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export default function ThemeProvider({
  children,
  storageKey = 'theme',
  defaultTheme = 'light',
}: {
  children: React.ReactNode
  storageKey?: string
  defaultTheme?: string
}) {
  const [theme, setThemeState] = React.useState(defaultTheme)

  const setTheme = useCallback(
    (theme: string) => {
      setThemeState(theme)
      localStorage.setItem(storageKey, theme)
      document.documentElement.style.colorScheme = theme
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(theme)
    },
    [storageKey]
  )

  useEffect(() => {
    const storedTheme =
      localStorage.getItem(storageKey) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setTheme(storedTheme)
  }, [storageKey, setTheme])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <ThemeScript />
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeScript = ({
  storageKey,
  defaultTheme,
}: {
  storageKey?: string
  defaultTheme?: string
}) => {
  const scriptArgs = JSON.stringify([storageKey, defaultTheme]).slice(1, -1)
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(${script.toString()})(${scriptArgs})`,
      }}
    />
  )
}
```

### 4.3. 애플리케이션에 통합

`ThemeProvider`를 추가해 컴포넌트에서 테마를 관리할 수 있도록 설정합니다.

```tsx
import DarkModeButton from '@/darkModeButton'
import ThemeProvider from '@/ThemeProvider'

export default function Home() {
  return (
    <ThemeProvider>
      <DarkModeButton />
    </ThemeProvider>
  )
}
```

이를 통해 Next.js 환경에서도 초기 스타일 깜빡임(Fouc)을 방지하며, 다크 모드와 라이트 모드 전환을 매끄럽게 구현할 수 있습니다.
