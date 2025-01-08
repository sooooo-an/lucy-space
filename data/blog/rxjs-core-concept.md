---
title: RxJS 핵심 개념 정리
date: 2024-10-25
category: RxJS
thumbnail: rxjs.png
---

### 목차

- [1. RxJS 등장 배경](#1-rxjs-등장-배경)
  - [1.1. 입력 데이터의 오류](#11-입력-데이터의-오류)
  - [1.2. 상태 전파 문제](#12-상태-전파-문제)
  - [1.3. 로직 오류](#13-로직-오류)
- [2. RxJS 핵심](#2-rxjs-핵심)
- [3. Observable 구현 시 고려해야할 점](#3-observable-구현-시-고려해야할-점)
  - [3.1. 에러 발생](#31-에러-발생)
  - [3.2. 데이터 전달이 완료된 경우](#32-데이터-전달이-완료된-경우)
  - [3.3. 구독 해제](#33-구독-해제)
- [4. 함수 vs. Observable vs. Promise](#4-함수-vs-observable-vs-promise)
- [5. Reference](#5-reference)

---

최근 웹 환경에서는 SPA(Single Page Application)가 대세로 자리 잡았습니다. 이는 다양한 기능과 데이터가 하나의 `index.html` 페이지 안에 포함된다는 것을 의미합니다. 최신의 웹 애플리케이션은 **상태 머신**이라고 볼 수 있으며, 사용자의 입력, 로직, 기존 값에 따라 상태가 결정됩니다.

웹 애플리케이션에서 발생하는 오류는 대개 다음과 같은 경우에서 비롯됩니다:

1. **입력값의 오류**
2. **상태 변화가 정확히 전달되지 않는 경우**
3. **로직 오류**

RxJS는 이러한 문제를 효과적으로 해결하기 위해 등장했습니다. 이는 데이터 흐름을 안전하게 처리하고 상태 관리를 단순화하는 데 도움을 주는 라이브러리로, **리액티브 프로그래밍**과 **함수형 프로그래밍** 기법을 활용합니다.

## 1. RxJS 등장 배경

RxJS는 웹 애플리케이션의 오류를 해결하기 위한 도구로 등장했습니다. 아래는 RxJS가 각각의 오류를 해결하는 방식을 설명합니다.

### 1.1. 입력 데이터의 오류

비동기 작업과 동기 작업이 섞여 있는 웹 환경에서, 데이터가 전달되는 시점이 다르기 때문에 데이터 입력 및 전달 과정에서 오류가 발생할 수 있습니다.

RxJS는 **시간의 개념**을 도입하여 이러한 문제를 해결합니다. 모든 데이터를 **`Observable` 인스턴스**로 처리하고, 이를 통해 동기와 비동기를 하나의 시간 축(스트림)에서 관리합니다.

코드 예시

```typescript
const { fromEvent, from, of } = rxjs

// 비동기 이벤트를 Observable 인스턴스로
const key$ = fromEvent(document, 'keydown')
const click$ = fromEvent(document, 'click')

// 동기 이벤트를 Observable 인스턴스로
const arrayFrom$ = from([1, 2, 3])
const iterableFrom$ = from(new Map([1, 2], [2, 4]))

// Promise를 Observable 인스턴스로
const ajaxPromiseFrom$ = from(fetch('/api/some.json'))

// 단일 데이터를 연속으로 전달
const number$ = of(10, 20, 30)
```

### 1.2. 상태 전파 문제

웹 애플리케이션은 상태 머신으로, 각 모듈이 서로 의존 관계를 가지고 있습니다. 따라서 한 모듈의 상태 변화가 다른 모듈에 정확히 반영되지 않으면 문제가 발생합니다.

RxJS는 **옵저버 패턴**을 채택하여 상태 전파 문제를 해결합니다.

`pull` 방식의 문제점

```typescript
class User {
  _state: { name: string; isLogin: boolean } | null = null
  constructor() {
    this._state = {
      name: 'dudu',
      isLogin: false,
    }
  }

  getName() {
    return this._state?.name
  }

  isLogin() {
    return this._state?.isLogin
  }

  login(name: string) {
    this._state = {
      name,
      isLogin: true,
    }
  }

  logout() {
    this._state = {
      name: '',
      isLogin: false,
    }
  }
}

class System {
  _token: number | null
  _id: string
  _user: User

  constructor(user: User) {
    this._token = null
    this._id = 'System'
    this._user = user
  }

  check() {
    const username = this._user.getName() ?? ''
    if (this._user.isLogin()) {
      this._token = [...username].reduce((acc, v) => acc + v.charCodeAt(0), 0)
      console.log(`[${this._id}] ${username} 의 토큰은 ${this._token} 입니다`)
    } else {
      this._token = null
      console.log(`[${this._id}] 로그인 되지 않았습니다`)
    }
  }
}

const user = new User()
const system = new System(user)

system.check() // [System] 로그인 되지 않았습니다
user.login('dudu')
system.check() // [System] dudu 의 토큰은 434 입니다
user.logout()
system.check() // [System] 로그인 되지 않았습니다
```

`pull` 방식에서는 상태를 확인하거나 반영하기 위해 직접 호출이 필요합니다. 상태 변화가 많아질수록 복잡성이 증가하며, 의존성이 높은 구조로 이어질 수 있습니다.

`observer` 패턴 도입

```typescript
type State = { name: string; isLogin: boolean } | null

type Observer = {
  update: (state: State) => void
}

class Subject {
  _observers: Observer[]
  constructor() {
    this._observers = []
  }

  add(observer: Observer) {
    this._observers.push(observer)
  }

  remove(observer: Observer) {
    const idx = this._observers.indexOf(observer)
    if (idx !== -1) {
      this._observers.splice(idx, 1)
    }
  }

  notify(status: State) {
    this._observers.forEach((v) => {
      v.update(status)
    })
  }
}

class User extends Subject {
  _state: State = null
  constructor() {
    super()
    this._state = {
      name: 'dudu',
      isLogin: false,
    }
  }

  getName() {
    return this._state?.name
  }

  login(name: string) {
    this._state = {
      name,
      isLogin: true,
    }
    this.notify(this._state)
  }

  logout() {
    this._state = {
      name: '',
      isLogin: false,
    }
    this.notify(this._state)
  }
}

class System {
  _token: number | null
  _id: string

  constructor() {
    this._token = null
    this._id = 'System'
  }

  update(state: State) {
    if (state?.isLogin) {
      this._token = [...state.name].reduce((acc, v) => acc + v.charCodeAt(0), 0)
      console.log(`[${this._id}] ${state.name} 의 토큰은 ${this._token} 입니다`)
    } else {
      this._token = null
      console.log(`[${this._id}] 로그인 되지 않았습니다`)
    }
  }
}

const user = new User()
const system = new System()

user.add(system)
user.login('dudu') // [System] dudu 의 토큰은 434 입니다
user.logout() // [System] 로그인 되지 않았습니다
user.login('dududu') // [System] dududu 의 토큰은 651 입니다
```

옵저버 패턴에서는 상태가 변경될 때 구독 중인 클래스들에게 자동으로 전파됩니다. 이를 통해 직접 호출 없이 상태 전파가 이루어질 수 있습니다.

**옵저버 패턴의 한계와 RxJS의 개선**

옵저버 패턴은 상태 전파와 의존성 관리를 효율적으로 해결하는 데 유용하지만, 실제 사용 시 몇 가지 한계점이 존재합니다. RxJS는 이러한 한계를 개선하여 더 안정적이고 유연한 상태 관리와 데이터 처리를 가능하게 합니다.

**상태 변화의 종료**

- 한계점: `Subject`가 서비스를 종료할 때 이를 구독 중인 클래스들에게 별도로 공지해야 합니다. 이 과정에서 추가적인 의사소통 비용이 발생하며, 구독 해제를 수동으로 관리해야 하는 부담이 있습니다.
- RxJS의 개선: RxJS는 상태 변화 종료를 명확하게 처리하기 위해 `complete` 메서드를 제공합니다.

**상태 변화에서의 에러 처리**

- 한계점: `Subject`에서 상태 변화 중 에러가 발생하면, 기본적으로 구독자들은 해당 에러를 감지할 수 없습니다. 이는 단순한 구조에서는 문제가 없지만, 구독자가 개별적으로 에러를 처리해야 하는 경우에는 어려움을 야기합니다.
- RxJS의 개선: RxJS는 에러 처리를 구독자 수준에서 명확히 관리할 수 있도록 `error` 콜백과 다양한 에러 처리 연산자를 제공합니다. 이를 통해 에러가 발생해도 각 구독자가 독립적으로 처리할 수 있습니다.

**Observer ↔ Subject의 역할 충돌**

- 한계점: `Observer`와 `Subject`의 역할을 동시에 수행하는 클래스에서는 상태를 지속적으로 생성하거나 변경해야 하는 상황이 발생할 수 있습니다. 이로 인해 상태 전파가 무한히 반복되거나, 잘못된 방식으로 관리되어 브라우저가 뻗는 등의 문제가 생길 수 있습니다.
- RxJS의 개선: RxJS는 상태 관리와 데이터 흐름의 복잡성을 해결하기 위해 **`Observable`의 단방향 데이터 흐름**과 **읽기 전용 데이터 처리**를 제공합니다. **`Observable`**은 `subscribe`를 통해 데이터를 전달할 대상(`Observer`)에게 데이터를 전달할 수는 있지만, 반대로 데이터를 전달받을 수는 없습니다.

**코드 예시**

```typescript
const { of } = rxjs
const numbers$ = of([1, 2, 3, 4, 5, 6]) // Observable 인스턴스

number$.subscribe({
  next(v) {
    console.log(v)
  },
  error(e) {
    console.error(e)
  }, // Observer에서의 에러처리
  complete() {
    console.log('complete')
  }, // 상태 변화의 종료
})
```

### 1.3. 로직 오류

반복문, 분기문, 그리고 변수 관리가 복잡한 코드를 만들어 디버깅과 유지보수를 어렵게 만듭니다. RxJS는 이러한 로직의 복잡성을 줄이기 위해 **고차 함수 기반의 오퍼레이터**를 제공합니다. 이를 통해 코드를 간결하고 선언적으로 작성할 수 있습니다.

RxJS 오퍼레이터는 데이터를 변환, 필터링, 병합, 그리고 시간 기반으로 처리하는 다양한 기능을 제공합니다. 이를 활용하면 복잡한 로직을 간단한 연산으로 표현할 수 있습니다.

더 자세한 내용은 [RxJS 오퍼레이터 글](https://www.lucy-an.space/posts/rxjs-operator)에서 확인할 수 있습니다.

## 2. RxJS 핵심

![스크린샷 2025-01-03 오후 1.17.24.png](/images/posts/rxjs-core-concept/1.png)

- **Observable**은 **데이터를 시간의 축으로 다룰 수 있는 객체**로, 연속적인 데이터를 표현합니다. 데이터를 생성하거나 외부 소스(API, 이벤트 등)로부터 데이터를 받아와 Observer에게 전달하는 역할을 합니다.
- **오퍼레이터는** **Observable을 생성하거나 조작하는 함수**입니다. 데이터를 변환하거나 필터링하고, 기존 Observable을 기반으로 **새로운 Observable을 생성합**니다. 항상 새로운 Observable을 반환하기 때문에 기존 데이터 스트림을 변경하지 않는다는 점이 특징입니다
- **Observer**는 **Observable에서 방출된 데이터를 소비하는 주체**입니다. 데이터를 수신(`next`), 에러 처리(`error`), 스트림 완료 처리(`complete`)를 담당하는 메서드를 포함합니다.
- **Subscription**은 **Observable을 구독(`subscribe`)할 때 반환되는 객체**로, 데이터 스트림을 관리합니다. 필요할 경우 `unsubscribe`를 호출해 **스트림을 종료하고 자원을 해제**할 수 있습니다.

코드예시

```typescript
const subscription = currentTarget$.subscribe(observer)

// 자원 해제
subscription.unsubscribe()
```

## 3. Observable 구현 시 고려해야할 점

Observable은 단순히 데이터를 Observer에게 전달하는 역할만 하지 않습니다. **현재 상태**를 포함한 다양한 상황(에러, 완료, 구독 해제 등)을 관리하고 Observer에게 전달해야 합니다. 이를 고려하여 Observable을 구현할 때 다음과 같은 점을 신경 써야 합니다.

### 3.1. 에러 발생

```typescript
const number$ = new Observable(function subscribe(observer) {
  try {
    observer.next(1)
    observer.next(2)
    // 에러발생
    throw new Error('데이터 전달 도중 에러가 발생했습니다.')
    observer.next(3)
  } catch (e) {
    observer.error(e)
  }
})

number$.subscribe({
  next: (v) => console.log(v),
  error: (e) => console.error(e),
})

// 출력:
// 1
// 2
// "데이터 전달 도중 에러가 발생했습니다."
```

Observable에서 `Observer.error`가 호출되면, 현재 스트림은 종료되고 구독은 자동으로 해지됩니다. 이후 Observer는 더 이상 데이터를 전달받지 못하며, Observable도 추가적인 작업을 수행하지 않습니다.

### 3.2. 데이터 전달이 완료된 경우

```typescript
const number$ = new Observable(function subscribe(observer) {
  try {
    observer.next(1)
    observer.next(2)
    observer.next(3)
    observer.complete()
  } catch (e) {
    observer.error(e)
  }
})

number$.subscribe({
  next: (v) => console.log(v),
  error: (e) => console.error(e),
  complete: () => console.log('데이터 전달 완료'),
})

// 출력:
// 1
// 2
// 3
// "데이터 전달 완료"
```

`Observer.complete`가 호출되면 현재 스트림이 정상적으로 종료됩니다. 이 시점 이후로 Observer는 더 이상 데이터를 전달받지 않으며, 구독도 자동으로 해지됩니다.

### 3.3. 구독 해제

유한한 데이터를 다루는 Observable은 `complete` 호출 시 자동으로 구독이 해지되므로 추가적인 자원 관리가 필요하지 않습니다. 그러나 **무한 데이터 스트림**(예: 이벤트 핸들러, WebSocket, interval 등)에서는 **구독 해제 시 자원을 반드시 정리**해야 합니다. 그렇지 않으면 메모리 누수와 같은 문제가 발생할 수 있습니다.

구독 해제를 위해 `subscription.unsubscribe`를 호출해야 하며, Observable 생성 시 할당한 자원도 함께 제거해야 합니다.

```typescript
const interval$ = new Observable(function subscribe(observer) {
  const id = setInterval(function () {
    observer.next(new Date().toString())
  }, 1000)

  // 자원을 해제하는 함수
  return function () {
    console.log('interval 제거')
    clearInterval(id)
  }
})

const subscription = interval$.subscribe((v) => console.log(v))

// 5초 뒤 구독을 해제한다
setTimeout(function () {
  subscription.unsubscribe()
}, 5000)
```

## 4. 함수 vs. Observable vs. Promise

| 구분                     | 함수             | Observable           | Promise                            |
| ------------------------ | ---------------- | -------------------- | ---------------------------------- |
| 정의                     | 함수 선언        | Observable 객체 생성 | Promise 객체 생성                  |
| 호출                     | 함수 호출        | Observable.subscribe | Promise then                       |
| 호출 시 정의부 실행 여부 | 매번 정의부 실행 | 매번 정의부 실행     | 생성 시 단 한번 호출               |
| 지연(lazy) 가능 여부     | O                | O                    | X (Promise는 정해진 상탯값만 호출) |
| 데이터                   | 한 개            | 여러 개              | 한 개                              |
| 에러처리 지원            | 별도로 없음      | error 상태           | reject 상태                        |
| 취소 지원                | X                | O                    | X                                  |
| 전달 방식                | Pull             | Push                 | Push                               |

**함수 지연 예시 코드**

```typescript
function foo(value) {
  console.log(`I'm function ${value}`)
  return value + 1
}

const xhr = new XMLHttpRequest()
xhr.onload = function (e) {
  afterAjaxResult = JSON.parse(xhr.responseText)

  const result = foo(afterAjaxResult)
  console.log(result)
}
```

호출 지연: 넘겨주어야 할 파라미터(`afterAjaxResult`)가 존재하지 않거나 아직 준비되지 않았다면, 준비될 때까지 함수 호출을 지연시킬 수 있습니다.

**Promise 지연 불가 예시 코드**

```typescript
const promise = new Promise((resolve, reject) => {
  console.log('create promise')
  try {
    resolve(1)
  } catch (e) {
    reject('error promise!')
  }
})

promise.then(
  (value) => console.log(`첫 번째 promise ${value}`),
  (error) => console.error(`첫 번째 promise ${error}`)
)

promise.then(
  (value) => console.log(`두 번째 promise ${value}`),
  (error) => console.error(`두 번째 promise ${error}`)
)

// 출력
// 'create promise'
// 첫 번째 promise 1
// 첫 번째 promise 2
```

Promise 정의부는 생성 시 즉시 실행되며, 상태가 한 번 결정되면 변경되지 않습니다. `then`이나 `catch`는 Promise의 상태가 결정된 이후에도 호출 가능하며, 이미 결정된 상태의 값이나 에러를 반환합니다. Promise가 이미 Fulfilled 상태라면, 지연되지 않고 즉시 동일한 값을 반환합니다. 이는 Promise의 상태가 "결정된 값"을 유지하기 때문입니다.

**Promise 취소 불가 예시 코드**

```typescript
const promise = new Promise((resolve, reject) => {
  try {
    let value = 0
    setInterval(() => {
      console.log(`is going? ${value}`)
      resolve(value++)
    }, 1000)
  } catch (e) {
    reject('error promise!')
  }
})

promise.then((value) => console.log(`promise value ${value}`))

// is going? 0
// promise value 0
// is going? 1
// is going? 2
// is going? 3
```

Promise의 상태가 Fulfilled 상태가 되더라도 계속적으로 Interval은 호출됩니다.

**Observable 예시 코드**

```typescript
const obs$ = new Observable((observer) => {
  let id
  try {
    let value = 0
    id = setInterval(() => {
      console.log(`is going? ${value}`)
      observer.next(value++)
    }, 1000)
  } catch (e) {
    observer.error(e)
  }

  // 자원을 해제하는 함수 지원
  return () => {
    clearInterval(id)
    console.log('cancelled')
  }
})

const subscription = obs$.subscribe((value) => console.log(`observable value ${value}`))

// 3초 후에 observable의 구독을 취소
setTimeout(() => subscription.unsubscribe(), 3000)

// is going? 0
// observable value 0
// is going? 1
// observable value 1
// is going? 2
// observable value 2
// cancelled
```

## 5. Reference

[RxJS](https://m.yes24.com/Goods/Detail/62601794)
