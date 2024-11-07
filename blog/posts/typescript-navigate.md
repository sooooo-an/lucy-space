---
title: 타입스크립트 단언식 떼어내기
date: 2024-10-22
category: Typescript
---

타입스크립트는 프론트엔드 생태계에서 떼어낼 수 없는 존재가 되었다. \
타입스크립트는 자바스크립트에서 생길 수 있는 타입 관련 런타임 에러를 사전에 방지하여 조금 더 안전하게 코드를 짤 수 있게 도와주기 때문이다. 그러나 타입스크립트를 현명하게 사용하지 못한다면, 나중에 코드를 확장하는데 어려움을 겪을 뿐더러, 타입스크립트를 사용하는 의미가 없어지게 된다. \
예를 들면, 유니온 타입을 통한 타입 확장으로 결국에는 string을 추가하여 모든 타입을 사용할 수 있게 된다거나 등의 어려움을 겪게 된다. \
아래의 코드는 회사에서 직접 수정해본 코드로, 북마크 리스트 API를 호출할 때 들어오는 데이터가 각 북마크 타입에 따라 인터페이스가 다를 경우, 이 부분을 어떻게 타입스크립트로 타입을 선언해야하는 지에 대한 방법이다.

## 1. 베이스 코드

```typescript
const BOOKMARK_CATEGORIES = {
  CHANNEL: "channel",
  PROJECT: "project",
  DIRECT_MESSAGE: "dm",
} as const;

type BookmarkCategoriesType =
  (typeof BOOKMARK_CATEGORIES)[keyof typeof BOOKMARK_CATEGORIES];

interface BookmarkChannelValuesType {
  ch_id: string;
  ch_name: string;
  msg_id: string;
  ws_id: string;
  ws_name: string;
  user_id: string;
}

interface BookmarkProjectValuesType {
  log_id: string;
  prj_id: string;
  prj_name: string;
  ws_id: string;
  ws_name: string;
  assign_user_ids: string[];
}

interface BookmarkDirectMessageValuesType {
  contents_id: string;
  members: string[];
  room_id: string;
  room_name: string;
  room_type: string;
  user_id: string;
}
```

북마크 카테고리의 종류가 3가지가 있다고 가정하고, 하나의 API에서 전부 다른 인터페이스를 가진 데이터를 호출한다고 가정해보자

## 2. 변경 전 코드

```typescript
export interface BookmarkApiType {
  bookmark_id: string;
  bookmark_type: BookmarkCategoriesType;
  values:
    | BookmarkChannelValuesType
    | BookmarkProjectValuesType
    | BookmarkDirectMessageValuesType;
}

const apiResponse: BookmarkApiType = {
  bookmark_id: "1",
  bookmark_type: BOOKMARK_CATEGORIES.CHANNEL,
  values: {
    ch_id: "123",
    ch_name: "123",
    msg_id: "123",
    ws_id: "123",
    ws_name: "123",
    user_id: "123",
  },
};

const getName = (item: BookmarkApiType) => {
  switch (item.bookmark_type) {
    case BOOKMARK_CATEGORIES.CHANNEL:
      return (item.values as BookmarkChannelValuesType).ch_name;
    case BOOKMARK_CATEGORIES.PROJECT:
      return (item.values as BookmarkProjectValuesType).prj_name;
    case BOOKMARK_CATEGORIES.DIRECT_MESSAGE:
      return (item.values as BookmarkDirectMessageValuesType).room_name;
  }
};

getName(apiResponse);
```

`getName` 통해 자식 컴포넌트에 보여주는 코드이다. `getName` 함수 안의 단언식을 제거하면 아래의 에러가 찍히는 것을 볼 수 있다. 각 카테고리가 어떤 타입을 가지고 있는 지 명시되어 있지 않기 때문에 생기는 이슈이다 \

```typescript
// Property 'ch_name' does not exist on type 'BookmarkChannelType | BookmarkProjectType | BookmarkDirectMessageType'.
```

각 카테고리 별로 어떤 인터페이스를 가지고 있는지 짝지어준다면 이 문제를 쉽게 해결할 수 있다

## 3. 변경 후 코드

```typescript
interface BookmarkChannelApiType {
  bookmark_id: string;
  bookmark_type: typeof BOOKMARK_CATEGORIES.CHANNEL;
  values: BookmarkChannelValuesType;
}

interface BookmarkProjectApiType {
  bookmark_id: string;
  bookmark_type: typeof BOOKMARK_CATEGORIES.PROJECT;
  values: BookmarkProjectValuesType;
}

interface BookmarkDmApiType {
  bookmark_id: string;
  bookmark_type: typeof BOOKMARK_CATEGORIES.DIRECT_MESSAGE;
  values: BookmarkDirectMessageValuesType;
}

type BookmarkApiType =
  | BookmarkChannelApiType
  | BookmarkProjectApiType
  | BookmarkDmApiType;

const getName = (item: BookmarkApiType) => {
  switch (item.bookmark_type) {
    case BOOKMARK_CATEGORIES.CHANNEL:
      return item.values.ch_name;
    case BOOKMARK_CATEGORIES.PROJECT:
      return item.values.prj_name;
    case BOOKMARK_CATEGORIES.DIRECT_MESSAGE:
      return item.values.room_name;
  }
};
```

`bookmark_type`과 `values`의 링크를 만들어준다면, 단언식을 사용하지 않더라도 타입스크립트를 사용할 수 있게 된다. 타입 단언식은 개발자가 강제로 타입을 지정하는 것으로, 타입 체커에게 오류를 무시하라는 것과 같다.
즉, 타입스크립트의 자동 추론 시스템이 동작하지 않기 때문에 타입스크립트를 사용하는 장점을 잃게 된다. \
그렇다면 우리는 단언식을 언제 사용하면 좋을까? \
단언식의 경우에는, 타입 체커가 추론한 타입보다 우리가 판단하는 타입이 더 정확할 때 사용해야한다. 예시로는 DOM 엘리먼트 및 라이브러리를 사용했는데 그 라이브러리의 타입 선언이 잘 되어 있지 않은 경우 등이 있을 것이다.
