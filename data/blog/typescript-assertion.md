---
title: 타입스크립트 단언식
date: 2024-10-22
category: TypeScript
thumbnail: typescript.webp
---

### 목차

1. [타입스크립트](#1-타입스크립트)
2. [단언식(Type Assertion) 소개](#2-단언식type-assertion-소개)
3. [단언식을 잘 사용한 예시와 그렇지 않은 예시](#3-단언식을-잘-사용한-예시와-그렇지-않은-예시)
4. [왜 이렇게 사용하면 안 되는지](#4-왜-이렇게-사용하면-안-되는지)
5. [처리 방법 코드 예시](#5-처리-방법-코드-예시)
6. [결론](#6-결론)

---

코드 리뷰를 하다 보면, 타입이 너무 얽혀있어서 이를 단언식으로 처리하는 경우를 종종 보게 됩니다. 단언식은 마치 **대출**과 같은 존재라고 생각합니다. 처음 사용할 때는 편리하고 빠르게 문제를 해결할 수 있지만, 나중에는 유지보수에서 더 큰 어려움을 초래합니다.

특히, 단언식은 TypeScript의 타입 검사를 우회하기 때문에 컴파일 단계에서 에러를 검출하지 못합니다. 이로 인해 런타임에서만 에러가 드러나게 되고, 에러를 추적하고 해결하는 데 더 많은 시간과 노력이 필요하게 됩니다.

이번 글에서는 제가 코드 리뷰에서 발견했던 단언식이 사용된 코드를 살펴보고, 이를 **단언식 없이 더 안전하게** 작성하는 방법을 제안하고자 합니다.

## 1. 타입스크립트

TypeScript는 JavaScript의 슈퍼셋으로, 정적 타입을 지원하여 코드의 안정성과 가독성을 높이는 데 도움을 줍니다. TypeScript는 컴파일 타임에 타입 오류를 잡아주며, 대규모 애플리케이션 개발에서 오류를 줄이고 유지보수를 용이하게 만듭니다.

**특징**

- **정적 타입**: 변수나 함수의 타입을 명시적으로 지정.
- **자동 완성 및 타입 검증**: IDE와의 통합으로 개발 생산성 향상.
- **최신 JavaScript 기능**: ECMAScript 표준을 준수하며, 하위 호환성 제공

## 2. 단언식(Type Assertion) 소개

단언식(Type Assertion)은 개발자가 특정 값의 타입을 **직접 선언**하여 TypeScript에게 이 값이 지정된 타입이라고 "확신"하도록 하는 구문입니다.

코드 예시

```tsx
value as Type; // 또는
<Type>value; // (JSX를 사용하지 않을 때)
```

단언식(Type Assertion)은 TypeScript가 타입을 정확히 추론하지 못할 때, 외부 라이브러리나 API의 반환 타입이 불확실하거나, 브라우저 API에서 타입이 명확하지 않을 경우 사용합니다.

## 3. 단언식을 잘 사용한 예시와 그렇지 않은 예시

**잘 사용한 예시**

```tsx
// HTML 요소를 명시적으로 단언
const inputElement = document.querySelector('#my-input') as HTMLInputElement

inputElement.value = 'Hello, TypeScript!'
```

**설명**: `querySelector`는 반환값을 `HTMLElement | null`로 추론하지만, 단언식을 사용하여 `HTMLInputElement`임을 명시적으로 선언하였습니다

**잘못 사용한 예시**

북마크 카테고리는 `CHANNEL`, `PROJECT`, `DIRECT_MESSAGE` 세 가지이며, 하나의 API에서 각기 다른 구조의 데이터를 호출합니다. 이 데이터를 처리하기 위한 코드를 작성합니다.

```typescript{58,60,62}
const BOOKMARK_CATEGORIES = {
  CHANNEL: 'channel',
  PROJECT: 'project',
  DIRECT_MESSAGE: 'dm',
} as const

type BookmarkCategoriesType = (typeof BOOKMARK_CATEGORIES)[keyof typeof BOOKMARK_CATEGORIES]

interface BookmarkChannelValuesType {
  ch_id: string
  ch_name: string
  msg_id: string
  ws_id: string
  ws_name: string
  user_id: string
}

interface BookmarkProjectValuesType {
  log_id: string
  prj_id: string
  prj_name: string
  ws_id: string
  ws_name: string
  assign_user_ids: string[]
}

interface BookmarkDirectMessageValuesType {
  contents_id: string
  members: string[]
  room_id: string
  room_name: string
  room_type: string
  user_id: string
}

export interface BookmarkApiType {
  bookmark_id: string
  bookmark_type: BookmarkCategoriesType
  values: BookmarkChannelValuesType | BookmarkProjectValuesType | BookmarkDirectMessageValuesType
}

const apiResponse: BookmarkApiType = {
  bookmark_id: '1',
  bookmark_type: BOOKMARK_CATEGORIES.CHANNEL,
  values: {
    ch_id: '123',
    ch_name: '123',
    msg_id: '123',
    ws_id: '123',
    ws_name: '123',
    user_id: '123',
  },
}

const getName = (item: BookmarkApiType) => {
  switch (item.bookmark_type) {
    case BOOKMARK_CATEGORIES.CHANNEL:
      return (item.values as BookmarkChannelValuesType).ch_name
    case BOOKMARK_CATEGORIES.PROJECT:
      return (item.values as BookmarkProjectValuesType).prj_name
    case BOOKMARK_CATEGORIES.DIRECT_MESSAGE:
      return (item.values as BookmarkDirectMessageValuesType).room_name
  }
}

getName(apiResponse)
```

`getName` 함수에서 `values`를 타입 단언식을 사용하여 처리합니다. 단언식을 제거하면 컴파일러에서 다음과 같은 오류가 발생합니다:

```tsx
Property 'ch_name' does not exist on type 'BookmarkChannelValuesType | BookmarkProjectValuesType | BookmarkDirectMessageValuesType'.
```

이는 `bookmark_type`과 `values`의 연결이 명확히 정의되어 있지 않기 때문입니다. 결과적으로, 타입 단언식을 남용하면 타입 체커의 추론 기능이 무력화되고 런타임 오류 가능성이 높아집니다.

## 4. 왜 이렇게 사용하면 안 되는지

단언식은 **타입 체커의 추론보다 우리가 타입을 더 잘 알고 있다고 컴파일러에 "확신"을 전달하는 방법**입니다. 그러나 남용하면 다음과 같은 문제가 발생합니다:

- **타입 안전성 부족**: 잘못된 타입 단언으로 인해 컴파일은 성공하더라도, 런타임에 프로그램이 중단될 위험.
- **가독성 저하**: 단언식 남용은 코드의 의도를 명확히 파악하기 어렵게 만듦.
- **디버깅 시간 증가**: 런타임 오류는 디버깅과 수정에 더 많은 시간 소모.

## 5. 처리 방법 코드 예시

```tsx
interface BookmarkChannelApiType {
  bookmark_id: string
  bookmark_type: typeof BOOKMARK_CATEGORIES.CHANNEL
  values: BookmarkChannelValuesType
}

interface BookmarkProjectApiType {
  bookmark_id: string
  bookmark_type: typeof BOOKMARK_CATEGORIES.PROJECT
  values: BookmarkProjectValuesType
}

interface BookmarkDmApiType {
  bookmark_id: string
  bookmark_type: typeof BOOKMARK_CATEGORIES.DIRECT_MESSAGE
  values: BookmarkDirectMessageValuesType
}

type BookmarkApiType = BookmarkChannelApiType | BookmarkProjectApiType | BookmarkDmApiType

const getName = (item: BookmarkApiType) => {
  switch (item.bookmark_type) {
    case BOOKMARK_CATEGORIES.CHANNEL:
      return item.values.ch_name
    case BOOKMARK_CATEGORIES.PROJECT:
      return item.values.prj_name
    case BOOKMARK_CATEGORIES.DIRECT_MESSAGE:
      return item.values.room_name
  }
}
```

- `bookmark_type`과 `values`의 타입 연결을 명확히 정의하여 타입스크립트가 자동으로 타입을 추론할 수 있도록 수정했습니다.
- 단언식 없이도 컴파일러가 올바른 타입을 인식하며, 코드 가독성과 안전성이 크게 향상됩니다.

## 6. 결론

- **단언식을 대체하는 방법**: 타입 체커가 타입을 자동으로 추론할 수 있도록 인터페이스와 타입 구조를 명확히 정의합니다.
- **안전한 코드 작성**: 단언식 없이 타입스크립트의 강력한 타입 시스템을 최대한 활용해 유지보수성과 안정성을 확보합니다.
- **단언식은 최후의 수단**으로 사용하되, 언제나 안전한 대안을 먼저 고려해야 합니다.
