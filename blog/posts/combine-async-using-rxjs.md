---
title: RxJS로 흩어진 상태 관리하기
date: 2024-10-28
category: RxJS
---

RxJS는 상태를 더욱 정교하게 관리할 수 있도록 도와준다. 동기와 비동기 상태를 합쳐서 관리할 수도 있고, 비동기상태끼리 합쳐서 관리할 수도 있다. 그리고 RxJS를 사용할 때, 흥미로운 연결을 체감할 수 있지만, RxJS가 필요하지 않는 개발이라면, 사용하지 않는 것을 권한다.

한 때 팀원 모두가 RxJS에 재미를 느껴 모든 기능 개발을 RxJS 파이프로 개발한 적이 있었는데, 추후에 기능이 추가되거나 디버깅을 할 때, 엄청난 어려움을 겪었다.

## RxJS 스트림

통합알림개편 프로젝트 개발 중, 추후에 추가된 요가사항이 있었다. 사용자 정의 필터를 로컬스토리지에 저장하고 스크롤 정보를 세션스토리지에 저장하는 작업이였다. 그 2가지 상태는 서로의 스트림에 연관을 주지 않았지만 하나의 스트림으로 묶어서 상태를 컨트롤해야하는 작업이다. 그렇다면, RxJS에서 서로 독립적이나 하나의 스트림으로 합쳐서 사용할 때, 사용할 수 있는 오퍼레이터에는 무엇이 있는지 어떤 상황에 사용해야 하는지 알아보자

상태들이 의존적으로 동작한다면, `switchMap`, `mergeMap`, `concatMap`, `exhaustMap`을 사용해야하지만, 독립적으로 동작한다면, `zip`, `combineLatest`, `withLatestFrom`, `forkJoin` 을 사용할 수 있다.

## 상태들이 독립적일 때

#### 1. zip

zip은 스트림이 모두 도착해야지만 동작하는 오퍼레이터로 각 스트림의 값이 모두 변경되어야 이벤트 방출이 일어난다

아래 그림은 zip 오퍼레이터의 동작 방식을 시각화한 것입니다
![zip 동작 방식 스크린샷](/images/posts/combine-async-using-rxjs/zip.png)

아래 코드는 zip 오퍼레이터가 이벤트를 방출하는 방식을 보여줍니다.

```typescript
import { forkJoin, zip, combineLatest, Subject, of } from 'rxjs'
import { tap } from 'rxjs/operators'

type Color = 'white' | 'green' | 'red' | 'blue'
type Logo = 'fish' | 'dog' | 'bird' | 'cow'

const color$ = new Subject<Color>()
const logo$ = new Subject<Logo>()

zip(color$, logo$)
  .pipe(tap(([color, logo]) => console.log(color, logo)))
  .subscribe()

// 하얀색 티에 물고기 로고 티셔츠
color$.next('white')
logo$.next('fish')

color$.next('green') // color만 전달되어 이벤트가 발생하지 않음
logo$.next('dog') // 녹색 옷에 강아지 로고 티셔츠

color$.next('red') // color만 전달되어 이벤트가 발생하지 않음
logo$.next('bird') // 빨간색 옷에 새 로고 티셔츠

color$.next('blue') // color만 전달되어 이벤트가 발생하지 않음
```

`color$`는 `logo$`의 새로운 상태가 들어올 때까지 기다린다. `color$`와 `logo$`가 새로운 값으로 둘 다 변경하면 그 때 이벤트 방출이 일어난다

#### 2. combineLatest

combineLatest는 서로의 값을 기다리지 않고 하나의 스트림이 도착하면 이벤트 방출이 일어난다.

아래 그림은 combineLatest 오퍼레이터의 동작 방식을 시각화한 것입니다
![combineLatest 동작 방식 스크린샷](/images/posts/combine-async-using-rxjs/combineLatest.png)

아래 코드는 combineLatest 오퍼레이터가 이벤트를 방출하는 방식을 보여줍니다.

```typescript
import { forkJoin, zip, combineLatest, Subject, of } from 'rxjs'
import { tap } from 'rxjs/operators'

type Color = 'white' | 'green' | 'red' | 'blue'
type Logo = 'fish' | 'dog' | 'bird' | 'cow'

const color$ = new Subject<Color>()
const logo$ = new Subject<Logo>()

combineLatest([color$, logo$])
  .pipe(tap(([color, logo]) => console.log(color, logo)))
  .subscribe()

// 하얀색 티에 물고기 로고 티셔츠
color$.next('white')
logo$.next('fish')

color$.next('green') // 녹색 옷에 물고기 로고 티셔츠
logo$.next('dog') // 녹색 옷에 강아지 로고 티셔츠

color$.next('red') // 빨간 옷에 강아지 로고 티셔츠
logo$.next('bird') // 빨간색 옷에 새 로고 티셔츠

color$.next('blue') // 파란 옷에 새 고로 티셔츠
```

`color$`와 `logo$` 상태가 모두 들어왔을 때, 이벤트 방출을 시작할 수 있다. `color$`만 여러차례 변경된다고해도, `logo$` 상태가 들어오지 않으면, 이벤트는 동작하지 않는다

#### 3. withLatestFrom

withLatestFrom은 primary와 secondary 오퍼레이터로 구분되어 있다. primary 스트림 상태가 변경될 때만 이벤트가 방출된다.

아래 그림은 withLatestFrom 오퍼레이터의 동작 방식을 시각화한 것입니다
![withLatestFrom 동작 방식 스크린샷](/images/posts/combine-async-using-rxjs/withLatestFrom.png)

아래 코드는 withLatestFrom 오퍼레이터가 이벤트를 방출하는 방식을 보여줍니다.

```typescript
import { forkJoin, zip, Subject, withLatestFrom } from 'rxjs'
import { tap } from 'rxjs/operators'

type Color = 'white' | 'green' | 'red' | 'blue'
type Logo = 'fish' | 'dog' | 'bird' | 'cow'

const color$ = new Subject<Color>()
const logo$ = new Subject<Logo>()

color$
  .pipe(
    withLatestFrom(logo$),
    tap(([color, logo]) => console.log(color, logo))
  )
  .subscribe()

color$.next('white') // 이벤트가 발생하지 않음
logo$.next('fish') // 이벤트가 발생하지 않음

color$.next('green') // 녹색 옷에 물고기 로고 티셔츠
logo$.next('dog') // 이벤트가 발생하지 않음

color$.next('red') // 빨간 옷에 강아지 로고 티셔츠
logo$.next('bird') // 이벤트가 발생하지 않음

color$.next('blue') // 파란 옷에 새 고로 티셔츠
```

- `color$`: primary 스트림
- `logo$`: secondary 스트림
  처음에 `secondary`가 응답을 하게 되면, `primary` 스트림이 그 다음부터 주도하게 된다. 이벤트 방출은 `primary` 값이 변경될 때 동작을 하게 되는데, `secondary` 값은 변경이 되어도 동작하지 않는다

#### 4. forkJoin

모든 스트림이 완전히 종결되었을 때만 커밋하는 오퍼레이터다

아래 그림은 forkJoin 오퍼레이터의 동작 방식을 시각화한 것입니다
![forkJoin 동작 방식 스크린샷](/images/posts/combine-async-using-rxjs/forkJoin.png)

아래 코드는 forkJoin 오퍼레이터가 이벤트를 방출하는 방식을 보여줍니다.

```typescript
import { forkJoin, zip, Subject, withLatestFrom } from 'rxjs'
import { tap } from 'rxjs/operators'

type Color = 'white' | 'green' | 'red' | 'blue'
type Logo = 'fish' | 'dog' | 'bird' | 'cow'

const color$ = new Subject<Color>()
const logo$ = new Subject<Logo>()

forkJoin([color$, logo$])
  .pipe(tap(([color, logo]) => console.log(color, logo)))
  .subscribe()

color$.next('white') // 이벤트가 발생하지 않음
logo$.next('fish') // 이벤트가 발생하지 않음

color$.next('green') // 이벤트가 발생하지 않음
logo$.next('dog') // 이벤트가 발생하지 않음

color$.next('red') // 이벤트가 발생하지 않음
logo$.next('bird') // 이벤트가 발생하지 않음

color$.next('blue') // 이벤트가 발생하지 않음

color$.complete()
logo$.complete() // 파란 옷에 새 고로 티셔츠
```

`color$`와 `logo$`가 종결될 때까지 이벤트가 발생하지 않는다. 종결되지 않았다는 뜻은 `next` 메서드를 호출하여 값을 변경시킬 수 있다는 의미이다.

![forkJoin 동작 방식 스크린샷](/images/posts/combine-async-using-rxjs/forkJoin2.png)

#### 5. 자동으로 종결시켜주는 오퍼레이터

`complete`를 사용하지 않더라도 자동으로 종결시켜주는 오퍼레이터가 있다.

![자동으로 종결시켜주는 오퍼레이터 동작 방식 스크린샷](/images/posts/combine-async-using-rxjs/stream_complete.png)

```typescript
import { forkJoin, zip, Subject, withLatestFrom } from 'rxjs'
import { first, take, tap } from 'rxjs/operators'

type Color = 'white' | 'green' | 'red' | 'blue'
type Logo = 'fish' | 'dog' | 'bird' | 'cow'

const color$ = new Subject<Color>()
const logo$ = new Subject<Logo>()
const firstColor$ = color$.pipe(take(1)) // 1번의 상태만 받고 종결한다
const firstLogo$ = logo$.pipe(first()) // 첫번째 상태만 받고 종결한다

forkJoin([firstColor$, firstLogo$])
  .pipe(tap(([color, logo]) => console.log(color, logo)))
  .subscribe()

color$.next('white') // 이벤트가 발생하지 않음
logo$.next('fish') // 하얀색 티에 물고기 로고 티셔츠

color$.next('green') // 이벤트가 발생하지 않음
logo$.next('dog') // 이벤트가 발생하지 않음

color$.next('red') // 이벤트가 발생하지 않음
logo$.next('bird') // 이벤트가 발생하지 않음

color$.next('blue') // 이벤트가 발생하지 않음
```

## Reference

[https://www.digitalocean.com/community/tutorials/rxjs-operators-forkjoin-zip-combinelatest-withlatestfrom](https://www.digitalocean.com/community/tutorials/rxjs-operators-forkjoin-zip-combinelatest-withlatestfrom)
