---
title: next-auth 라이브러리로 OAuth 로그인 구현하기
date: 2024-11-20
category: Next.js
---

### 목차

[What is OAuth](#what-is-oauth) \
[OAuth Flow](#oauth-flow) \
[OAuth 코드 예시](#oauth-코드-예시) \
[next-auth 톱아보기](#next-auth-톱아보기) \
[next-auth 코드 예시](#next-auth-코드-예시)

---

## What is OAuth?

요즘 많은 애플리케이션에서 회원가입을 간소화하기 위해 OAuth 로그인 방식을 채택하고 있다. OAuth를 사용하면, 외부 서비스(예: Google, Facebook 등)에서 사용자 정보를 가져와 간편하게 가입할 수 있기 때문이다. 이로 인해 사용자는 복잡한 회원가입 절차를 생략할 수 있고, 개발자는 사용자 데이터 관리를 보다 효율적으로 처리할 수 있게 된다.

그렇다면, OAuth란 무엇이며, 이를 통해 무엇을 할 수 있을까?

- **OAuth(Open Authorization)** \
  흔히 "인증"으로 오해되지만, 실제 OAuth는 "승인"을 의미한다. OAuth의 주요 목적은 단순히 사용자가 로그인하는 것이 아니라 **서로 다른 서비스 간에 통신하며 어떤 권한을 허용할지 관리**하는 데 중점을 둔다. 예를 들어 사용자가 특정 어플리케이션에 자신의 Google 캘린더 접근 권한을 부여하는 것이 OAuth의 대표적인 사례이다.

## OAuth Flow

웹사이트에 구글 캘린더 초대 기능을 추가한다고 가정해보자. 이 기능은 Google Calendar API를 통해 구현할 수 있는데, 이 작업을 수행하는 주체는 웹사이트 운영자가 아니라 최종 사용자이다. 문제는 최종 사용자가 이 기능을 사용하기 위해 자신의 Google 비밀번호를 웹사이트에 입력하고 싶지 않을 것이다.

이 때, OAuth를 활용하면, 사용자 비밀번호를 공유하지 않고도 필요한 권한을 부여할 수 있게된다. 구글 캘린더가 OAuth를 사용할 때, 다음과 같은 과정을 거치게 된다.

![process](/images/posts/how-to-use-next-auth/process.png)

1. 사용자 승인 요청
   웹 사이트는 Google Calendar API와 연동하기 위해 사용자에게 권한을 요청한다. 이를 위해 사용자가 Google 계정을 통해 웹사이트를 승인할 수 있도록 Google의 인증 화면 팝업으로 표시된다.

2. 사용자 동의
   팝업 화면에서 사용자에게 "이 웹사이트에서 Google Calendar 계정의 특정 권한에 접근하려고 합니다"라는 메시지가 나타난다.
   사용자가 "예, 이 웹사이트를 신뢰합니다" 버튼을 클릭하면 Google은 사용자의 승인을 받아 처리한다.

3. 토큰 발급
   사용자 동의가 완료되면, Google은 웹 사이트로 Access Token을 보낸다. 이 토큰은 사용자를 대신에 Google Calendar API에 요청을 보낼 때 사용하는 인증 수단이다.

4. API 요청
   웹 사이트는 이 Access Token을 이용하여 Google Calendar API에 요청을 보낼 수 있게 된다.

   예를 들어, "새로운 캘린더 초대를 생성"하는 작업만 가능하다. Access Token은 사용자가 승인한 권한 범위 내에서만 동작하기 때문이다. 예를 들어 토큰을 이용해 계정을 삭제하거나 승인받지 않은 다른 작업을 시도하려고 하면, API에서 "이 토큰으로는 불가능하다"는 메시지가 반환된다.

   이는 OAuth의 중요한 특징 중 하나로, Access Token이 오용되지 않도록 최소 권한 원칙(Principle of Least Privilege)를 적용하기 때문이다. 이를 통해 사용자는 자신의 데이터를 안전하게 보호하면서, 특정 작업에 필요한 권한을 클라이언트(웹사이트)에게 부여한다.

---

## OAuth 코드 예시: Next.js에서 구현하기

OAuth 플로우를 Next.js로 구현해보자

1. Google Console 설정 \
   먼저 [Google Cloud Console](https://console.cloud.google.com/apis/credentials)에서 OAuth 클라이언트를 생성해야한다. OAuth 클라이언트를 생성하기 전에 먼저 OAuth 스크린을 설정해주어야한다. 그리고 `Authorized JavaScript origins`에는 내 개발서버의 url과 운영서버의 url을 작성해주면 된다. `redirect_url`도 작성을 해야하는데, 코드를 먼저 작성한 뒤에 다시 작성해보도록 하자

   ![get client id](/images/posts/how-to-use-next-auth/get-client-id.mov)

2. 환경 변수 설정
   `.env.local` 파일에 다음 변수를 추가한다

   ```md
   GOOGLE_CLIENT_ID=<Google Client ID>
   GOOGLE_CLIENT_SECRET=<Google Client Secret>
   NEXTAUTH_URL=http://localhost:3000
   ```

3. Next.js API 라우트 구성
   사용자 권한 요청 및 토큰 교환을 처리하기 위한 API 라우트를 작성한다

#### Next.js 코드 예시

1. Google 인증 페이지로 리디렉션하기

```

```

2. Google에서 받은 Authorization Code 처리 및 Access Token 요청

3. API 요청으로 Google Calendar와 통신

---

## next-auth 사용하기

next-auth 라이브러리는 오픈 소스 라이브러리로 엄청나게 많은 Provider가 내장되어 있어서 우리가 따로 문서를 확인하지 않고도, Provider만 호출해서 사용할 수 있다. next-auth는 어쩌구 저쩌구

OAuth 코드를 직접 짜게된다면, CSRF를 방지하기 위한 방어로직을 직접 구현해야하는 어려움이 있다.
CSRF는 OAuth 창에서 탈취가 일어나서 생길 수 있는 웹 보안 이슈로

#### next-auth 동작 방식

next-auth는 app의 어쩌꼬저쩌고

---

## OAuth 코드 예시: next-auth 라이브러리 사용하기

1. Next.js 프로젝트에 next-auth를 설치한다

2.
