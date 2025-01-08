---
title: RxJS 오퍼레이터
date: 2024-10-28
category: RxJS
thumbnail: rxjs.png
---

### 목차

- [1. 오퍼레이터](#1-오퍼레이터)
  - [1.1. 오퍼레이터의 역할](#11-오퍼레이터의-역할)
  - [1.2. 자바스크립트 배열 고차 함수와 Observable의 차이점](#12-자바스크립트-배열-고차-함수와-observable의-차이점)
- [2. 마블 다이어그램 및 오퍼레이터 활용법](#2-마블-다이어그램-및-오퍼레이터-활용법)
  - [2.1. 마블 다이어그램](#21-마블-다이어그램)
- [3. 오퍼레이터의 종류](#3-오퍼레이터의-종류)
  - [3.1. 생성 오퍼레이터](#31-생성-오퍼레이터)
  - [3.2. 변환 오퍼레이터](#32-변환-오퍼레이터)
  - [3.3. 추출 오퍼레이터](#33-추출-오퍼레이터)
  - [3.4. 결합 오퍼레이터](#34-결합-오퍼레이터)
  - [3.5. 멀티캐스팅 오퍼레이터](#35-멀티캐스팅-오퍼레이터)
  - [3.6. 에러 처리 오퍼레이터](#36-에러-처리-오퍼레이터)
- [4. Reference](#4-reference)

---

RxJS는 **반복문**, **분기문**, **변수 사용**으로 인한 로직 오류를 해결하기 위해 설계된 **오퍼레이터**를 제공합니다. 이를 통해 **함수형 프로그래밍**의 개념을 적용하여 선언적이고 직관적인 코드 작성을 가능하게 합니다.

함수형 프로그래밍을 통해 RxJS는 다음과 같은 이점을 제공합니다:

1. **가독성 향상**: 복잡한 로직을 간단한 체인 형태로 구성해 코드를 읽기 쉽게 만듭니다.
2. **상태 관리 최소화**: 불필요한 변수와 상태를 줄여 코드 오류 가능성을 낮춥니다.
3. **명확한 데이터 흐름**: 데이터의 생성, 변환, 전달 과정을 오퍼레이터로 명확히 표현합니다.

RxJS 오퍼레이터는 데이터를 변환, 필터링, 병합하며 반복 작업을 줄이고, 로직의 복잡성을 효과적으로 낮춥니다.

## 1. 오퍼레이터

웹 애플리케이션에서 로직 오류는 주로 반복문, 분기문, 그리고 변수를 사용하는 과정에서 발생합니다. 이를 해결하기 위해 자바스크립트는 **일급 객체**로 취급되는 **함수**를 활용할 수 있습니다. 함수는 불필요한 변수를 줄이고 반복문을 대체하는 데 유용합니다.

특히, **고차 함수**는 이런 문제를 효과적으로 해결합니다. 고차 함수는 **다른 함수를 인자로 받거나 결과로 반환하는 함수**로, 코드의 흐름을 단순화하고 선언적으로 작성할 수 있게 합니다.

RxJS는 이러한 고차 함수 개념을 확장하여 **오퍼레이터**를 제공합니다. **Observable을 생성 및 조작하는 함수를 오퍼레이터(operator)라고 합니다.** 오퍼레이터는 현재의 Observable 인스턴스 기반으로 항상 새로운 Observable을 반환합니다.

### **1.1 오퍼레이터의 역할**

RxJS의 오퍼레이터는 **Observable**이라는 데이터 스트림을 기반으로 동작하며, 다음과 같은 역할을 수행합니다:

1. **Observable 생성:** 오퍼레이터를 통해 데이터를 스트림으로 만들어 이벤트를 관리하거나 비동기 작업을 처리할 수 있습니다.
2. **데이터 변환 및 추출:** Observable에서 흐르는 데이터를 변환하거나 필요한 데이터만 선택적으로 추출할 수 있습니다.
3. **Observable 합성:** 여러 Observable을 결합하여 복잡한 데이터 흐름을 간단하게 처리할 수 있습니다.

### 1.2. 자바스크립트 배열 고차 함수와 Observable의 차이점

자바스크립트의 **Array 고차 함수**와 RxJS의 **Observable**은 둘 다 데이터를 처리하는 함수형 접근 방식을 사용하지만, 중요한 차이점이 존재합니다.

**새로운 객체 반환**:

- 자바스크립트 Array 고차 함수(`map`, `filter` 등)는 호출할 때 **새로운 배열 레퍼런스**를 반환하지만, 반환된 배열 자체는 불변 객체가 아닙니다.즉, 반환된 배열은 이후에 수정될 수 있습니다.
- 반면, Observable은 항상 **불변 객체**로, 오퍼레이터를 호출해도 기존 Observable의 상태를 변경하지 않습니다.

**Observable의 동작 원리**:

![스크린샷 2025-01-03 오후 1.17.24.png](/images/posts/rxjs-operator/1.png)

- Observable은 새로운 Observable을 생성하며, 새롭게 생성된 Observable은 **오퍼레이터를 호출한 원래 Observable을 내부적으로 구독(Subscribe)**합니다.
- 이 과정에서 Observable은 **링크드 리스트(Linked List)** 형태로 기존 Observable과 새 Observable을 연결합니다.즉, 데이터 흐름이 체인처럼 연결되며, 각 단계의 Observable은 독립적입니다.

코드 예시

```tsx
// map 오퍼레이터
map = function (transformationFn) {
  const source = this // Observable
  const result = new rxjs.Observable((observer) => {
    // 새로운 Observable은 현재의 Observable을 Subscribe 한다.
    source.subscribe(
      function (x) {
        observer.next(transformationFn(x))
      },
      function (err) {
        observer.error(err)
      },
      function () {
        observer.complete()
      }
    )
  })
  return result
}

// source ----map 오퍼레이터-----> result
```

`source`부터 전달된 데이터, 에러, 종료여부가 `source`(Observable)의 `map`(오퍼레이터)들을 통해 전달되거나 변형되어 구독한 `result`(Observer)에게 전달할 수 있게 됩니다.

## 2. 마블 다이어그램 및 오퍼레이터 활용법

위의 오퍼레이터를 제외하고도 RxJS는 다양한 오퍼레이터를 제공합니다. 이를 전부 다 외울 수는 없으며, 필요한 오퍼레이터가 있다면, 아래의 홈페이지를 확인하여 마블 다이어그램을 찾아야 합니다.

[https://rxmarbles.com/](https://rxmarbles.com/)

### 2.1. 마블 다이어그램

마블 다이어그램(marble diagram)은 시간에 따른 데이터 흐름을 추상화한 도표로, `merge` 오퍼레이터를 예시로 마블 다이어그램 보는 방법에 대해 설명해보도록 하겠습니다

![스크린샷 2025-01-03 오후 1.17.24.png](/images/posts/rxjs-operator/2.png)

1. 두 개 이상의 Observable 병합: 다이어그램 상단에는 두 개의 Observable이 있으며, `merge` 오퍼레이터를 통해 병합된 Observable이 하단에 나타납니다.
2. 각 Observable의 독립적인 데이터 방출: 병합된 Observable은 각 Observable에서 방출되는 값을 시간 순서에 따라 독립적으로 전달합니다. **값 간의 연관성은 없습니다**. 즉, 두 Observable의 호출 순서나 데이터 간에는 관계가 없습니다.
3. 결과 Observable: 하단에 표시된 결과 Observable은 두 Observable이 방출하는 모든 값을 시간 순서대로 방출합니다. **값이 방출되는 즉시 새로운 Observable로 전달**됩니다.
4. complete 이벤트: 다이어그램 끝부분에서 동그라미와 선이 이어진 기호는 Observable이 **complete**되었음을 의미합니다.

위의 설명을 종합하면, `merge` 오퍼레이터는 두 개 이상의 Observable을 병합하여 **각 Observable에서 독립적으로 방출된 데이터를 하나의 Observable로 결합**합니다. 데이터 간의 연관이 없으며, 시간 순서대로 방출됩니다. 주로 **순서와 관계없이 여러 데이터 스트림을 결합**하고자 할 때 사용됩니다.

## 3. 오퍼레이터의 종류

### 3.1. 생성 오퍼레이터

**생성 오퍼레이터**는 RxJS에서 **Observable이 아닌 데이터를 Observable로 변환하거나 새로운 Observable을 생성하는 데 사용되는 오퍼레이터**입니다. 이 오퍼레이터는 기존 데이터, 이벤트, 또는 비동기 작업을 Observable로 래핑하여 RxJS의 스트림 기반 데이터 처리 방식을 활용할 수 있도록 합니다.

생성 오퍼레이터의 예시로는 `throwError`, `from`, `fromEvent`, `of`, `never`가 있습니다.

```tsx
/**
 * throwError
 * 에러를 방출하는 Observable을 생성합니다.
 * 사용처: 에러 처리 시뮬레이션, 테스트
 **/
const errorObservable = throwError(() => new Error('Something went wrong!'))
errorObservable.subscribe({
  next: () => console.log('success!'),
  error: (err) => console.error('Error:', error),
})
// 출력: Error: Something went wrong!

/**
 * never
 * 아무 값도 방출하지 않고, 완료도 하지 않는 Observable을 생성합니다.
 * 사용처: 무한 대기 상태를 나타내거나, 테스트에서 특별한 상태를 시뮬레이션 할 때
 **/
const neverObservable = never()
neverObservable.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('Complete'),
})
```

### 3.2. 변환 오퍼레이터

RxJS에서 **변환 오퍼레이터**는 Observable에서 방출된 데이터를 다른 Observable로 변환하거나, 데이터를 처리한 후 새로운 Observable을 반환하는 역할을 합니다. 변환 오퍼레이터는 데이터를 처리하고 병합하는 방식을 제어하기 때문에 비동기 작업의 흐름을 관리하는 데 매우 유용합니다.

변환 오퍼레이터의 예시로는 `concatMap`, `exhaustMap`, `mergeMap`, `switchMap`가 있습니다.

```tsx
/**
 * concatMap
 * 에러를 이전 Observable의 작업이 완료될 때까지 대기한 후, 다음 Observable을 처리합니다.
 * 사용처: 순차적인 비동기 요청 처리 시 유용 (API 호출 순서)
 **/
const source = of(1, 2, 3)
const result = source.pipe(concatMap((value) => of(`Processed: ${value}`).pipe(delay(1000))))

result.subscribe(console.log)
// 출력:
// Processed: 1 (1초 후)
// Processed: 2 (2초 후)
// Processed: 3 (3초 후)

/**
 * switchMap
 * 이전 Observable의 작업을 취소하고, 새로 들어온 Observable만 처리합니다.
 * 사용처: 최신 데이터만 유효한 상황 (예: 검색 요청, 자동완성)
 **/
const clicks = fromEvent(document, 'click')
const result = clicks.pipe(switchMap(() => interval(1000)))

result.subscribe(console.log)
// 클릭할 때마다 이전 작업을 취소하고 새로 시작
```

### 3.3. 추출 오퍼레이터

**추출 오퍼레이터**는 RxJS에서 Observable의 데이터 흐름에서 특정 값이나 이벤트를 선택적으로 추출하거나, 흐름을 제한하는 데 사용됩니다. 이를 통해 데이터 스트림에서 불필요한 값을 제거하고, 원하는 조건에 맞는 값만 추출할 수 있습니다.

추출 오퍼레이터의 예시로는 `debounceTime`, `take`, `takeUntil` 가 있습니다.

```tsx
/**
 * debounceTime
 * Observable에서 값이 방출된 후 지정된 시간이 경과할 때까지 새로운 값이 방출되지 않으면 그 값을 전달합니다. 연속적인 값 중 마지막 값만 방출합니다.
 * 사용처: 사용자 입력(검색창, 폼)에서 연속적인 이벤트 줄이기
 **/

const input = fromEvent(document.getElementById('input'), 'input')
const debounced = input.pipe(debounceTime(300))

debounced.subscrbie((event) => console.log(event))
// 300ms 동안 추가 입력이 없으면 마지막 입력 이벤트 방출

/**
 * takeUntil
 * 지정된 Observable이 값을 방출하거나 완료될 때까지 값을 방출합니다. 지정된 Observable이 값을 방출하면 즉시 완료됩니다.
 * 사용처: 특징 이벤트까지 데이터 스트림 유지, 구독 중단 시점 지정
 **/

const source = interval(1000)
const stopButton = fromEvent(document.getElementById('stop'), 'click')

// stopButton이 값을 방출하거나 완료될 때까지 값을 기다린다.
const controlled = source.pipe(takeUtil(stopButton))

controlled.subscribe((value) => console.log(value))
// 출력: 0, 1, 2, ... (버튼 클릭 시 즉시 완료)
```

### 3.4. 결합 오퍼레이터

**결합 오퍼레이터**는 RxJS에서 여러 Observable의 데이터 스트림을 결합하거나, 특정 방식으로 데이터를 병합해 새로운 Observable을 생성하는 데 사용됩니다. 이를 통해 복잡한 데이터 흐름을 간단하고 선언적으로 표현할 수 있습니다.

결합 오퍼레이터의 예시로는 `combineLatest`, `forkJoin`, `zip`, `mergeAll` 가 있습니다.

```tsx
/**
 * combineLatest
 * 여러 Observable에서 값을 방출할 때마다 가장 최신 값의 조합을 방출합니다.
 * 사용처: 두 개 이상의 데이터 스트림을 조합해 최신 상태를 기반으로 계산할 떄 사용
 **/

const obs1 = of(1, 2, 3)
const obs2 = of('A', 'B', 'C')

const combined = combineLatest([obs1, obs2])
combined.subscribe(([value1, value2]) => console.log(value1, value2))
// 출력: 3 A, 3 B, 3 C
// 이유 combineLatest의 경우, 첫 번쨰 배열(obs1)이 먼저 구독되기 떄문에 obs2가 구독될 때는 obs1는 전부 완료되고 3만 남아있음

/**
 * zip
 * 여러 Observable에서 동일한 순서로 방출된 값들을 묶어 배열로 반환합니다.
 * 사용처: 각 Observable에서 동기화된 데이터를 결합해야 할 때 사용
 **/

const obs1 = of(1, 2, 3)
const obs2 = of('A', 'B', 'C')

const zipped = zip(obs1, obs2)
zipped.subscribe(([value1, value2]) => console.log(value1, value2))
// 출력: 1 A, 2 B, 3 C
```

### 3.5. 멀티캐스팅 오퍼레이터

멀티캐스팅 오퍼레이터는 RxJS에서 하나의 Observable을 여러 구독자(Subscriber)에게 공유하도록 만들어줍니다. 기본적으로 Observable은 Cold Observable로 동작하며, 구독자마다 독립적인 데이터 스트림을 생성합니다. 멀티캐스팅 오퍼레이터를 사용하면 Observable을 Hot Observable처럼 동작하게 만들어, 데이터 스트림을 공유할 수 있습니다.

멀티캐스팅 오퍼레이터의 예시로는 `share`가 있습니다.

```tsx
/**
 * share
 * Observable을 멀티캐스팅하여 하나의 데이터 스트림을 여러 구독자와 공유합니다.
 * 사용처: WebSocket 연결 공유, 데이터 캐싱 (리소스 절약)
 **/

const source$ = interval(1000).pipe(take(5), share())

source$.subscribe((val) => console.log(`Subscriber 1: ${val}`))

// 2초 후에 구독이 시작되며, 현재 시점부터 방출되는 값을 공유받습니다.
setTimeout(() => {
  source$.subscribe((val) => console.log(`Subscriber 2: ${val}`))
}, 2000)

// 출력:
// Subscriber 1: 0
// Subscriber 1: 1
// Subscriber 2: 2
// Subscriber 1: 2
// Subscriber 2: 3
// Subscriber 1: 3
// Subscriber 2: 4
// Subscriber 1: 4
```

**Cold Observable vs. Hot Observable**

| 특징                  | Cold Observable                         | Hot Observable                          |
| --------------------- | --------------------------------------- | --------------------------------------- |
| 데이터 스트림 시작    | 구독자가 생길 때마다 새로 시작          | Observable 생성 시점에 시작             |
| 구독자 간 데이터 공유 | 구독자마다 독립적인 데이터 스트림 생성  | 구독자간 데이터를 공유                  |
| 주요 사용 사례        | API 호출, 데이터베이스, 쿼리, 파일 읽기 | WebSocket, 마우스 이벤트, 실시간 타이머 |
| 비유                  | 동영상 스트리밍 서비스 (개별 세션)      | 라이브 TV 방송                          |

### 3.6. 에러 처리 오퍼레이터

RxJS에서 **에러 처리 오퍼레이터**는 데이터 스트림에서 발생하는 에러를 처리하거나, 에러가 발생한 경우 특정 로직을 수행하고 스트림을 복구하기 위해 사용됩니다. 이를 통해 Observable의 안정성과 복원력을 강화할 수 있습니다.

에러 처리 오퍼레이터의 예시로는 `catchError`, `retryWhen` 가 있습니다.

```tsx
/**
 * catchError
 * 스트림에서 에러가 발생했을 때, 이를 가로채어 처리하고 새로운 Observable을 반환합니다.
 * 사용처: API호출이나 데이터 처리 중 에러 발생 시 복구하거나 대체 데이터 제공
 **/

const source$ = throwError(() => new Error('Something went wrong!'))

source$
  .pipe(
    catchError((err) => {
      console.error('Error caught:', err.message)
      return of('Fallback value') // 대체 값 반환
    })
  )
  .subscribe((value) => console.log(value))

// 출력:
// Error caught: Something went wrong!
// Fallback value
```

## 4. Reference

[RxJS](https://m.yes24.com/Goods/Detail/62601794)
