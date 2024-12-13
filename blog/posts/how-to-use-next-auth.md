---
title: next-auth 라이브러리로 OAuth 로그인 구현하기
date: 2024-11-20
category: Next.js
---

### 목차

[What is OAuth](#what-is-oauth)
[OAuth Flow](#oauth-flow)
[Next.js 코드 예시: 직접 구현하기](#nextjs-코드-예시-직접-구현하기)
[Next.js 코드 예시: next-auth 라이브러리로 구현하기](#nextjs-코드-예시-next-auth-라이브러리로-구현하기)
[직접 구현 vs. next-auth](#직접-구현-vs-next-auth)

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

## Next.js 코드 예시: 직접 구현하기

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

> 코드는 [구글 OAuth 2.0 문서](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow#redirecting)를 보고 구현하였음

일단, 아까 설정해주지 못한 `redirect_url`을 `api/auth/callback` 앤드포인트로 추가해주자
![redirect_url 셋팅하기](/images/posts/how-to-use-next-auth/set-redirect-url.mov)

1. `/api/auth/login/route.ts`에 Google 인증 페이지로 리디렉션하는 코드를 구현해보자.

   ```typescript
   import { NextResponse } from 'next/server'

   export async function GET() {
     const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
     const options = {
       redirect_uri: process.env.GOOGLE_REDIRECT_URL!,
       client_id: process.env.GOOGLE_CLIENT_ID!,
       response_type: 'code',
       scope: 'email profile',
     }

     const qs = new URLSearchParams(options)
     return NextResponse.redirect(`${rootUrl}?${qs.toString()}`)
   }
   ```

   `response_type`을 `code` 또는 `token`으로 설정할 수 있는데, token으로 작성하게된다면, 클라이언트 queryParam으로 token이 노출되기 떄문에 보안 이슈가 있을 수 있다. 그렇기 때문에 code로 설정하여 code를 queryParam으로 받아서 다시 한번 API를 호출하는 것이 좋다.

2. 그럼 이제 `/api/auth/callback` 코드를 구현해보자 `code`를 이용하여 `access_token`을 받아오는 로직을 구현해보자

   ```typescript
   import { NextRequest, NextResponse } from 'next/server'

   export async function GET(req: NextRequest) {
     if (!req.nextUrl.searchParams.has('code')) {
       throw new Error('No code found in query string')
     }

     try {
       const code = req.nextUrl.searchParams.get('code')
       const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
         method: 'POST',
         body: JSON.stringify({
           code,
           client_id: process.env.GOOGLE_CLIENT_ID!,
           client_secret: process.env.GOOGLE_CLIENT_SECRET!,
           redirect_uri: process.env.GOOGLE_REDIRECT_URL!,
           grant_type: 'authorization_code',
         }),
         headers: { 'Content-Type': 'application/json' },
       })

       const data = await tokenResponse.json()

       return NextResponse.json({ data })
     } catch (error) {
       console.error('Error exchanging token:', JSON.stringify(error, null, 2))
       if (error instanceof Error) {
         throw error
       }
     }
   }
   ```

3. 이 `access_token`을 이용하여 회원정보를 불러오는 로직을 추가해보자. 현재는 포함되어 있지 않지만, DB에서 회원정보를 찾은 후, 존재하지 않는 이메일이라면 회원으로 만들어주는 로직도 추가해볼 수 있다.

   ```typescript
   import { NextRequest, NextResponse } from 'next/server'

   export async function GET(req: NextRequest) {
     if (!req.nextUrl.searchParams.has('code')) {
       throw new Error('No code found in query string')
     }

     try {
       const code = req.nextUrl.searchParams.get('code')
       const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
         method: 'POST',
         body: JSON.stringify({
           code,
           client_id: process.env.GOOGLE_CLIENT_ID!,
           client_secret: process.env.GOOGLE_CLIENT_SECRET!,
           redirect_uri: process.env.GOOGLE_REDIRECT_URL!,
           grant_type: 'authorization_code',
         }),
         headers: { 'Content-Type': 'application/json' },
       })

       const data = await tokenResponse.json()

       const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
         headers: { Authorization: `Bearer ${data.access_token}` },
       })

       const userInfo = await userInfoResponse.json()
       console.log(userInfo)

       const response = NextResponse.redirect('http://localhost:3000')

       return response
     } catch (error) {
       console.error('Error exchanging token:', JSON.stringify(error, null, 2))
       if (error instanceof Error) {
         throw error
       }
     }
   }
   ```

4. 지금까지 로직을 보면 로그인은 되었으나 로그인이 유지가 되지는 않는다. jwt 토큰을 이용하여 토큰을 쿠키에 저장해주는 로직을 구현해보자.

   ```typescript
   import { NextRequest, NextResponse } from 'next/server'
   import jwt from 'jsonwebtoken'

   export async function GET(req: NextRequest) {
     if (!req.nextUrl.searchParams.has('code')) {
       throw new Error('No code found in query string')
     }

     try {
       const code = req.nextUrl.searchParams.get('code')
       const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
         method: 'POST',
         body: JSON.stringify({
           code,
           client_id: process.env.GOOGLE_CLIENT_ID!,
           client_secret: process.env.GOOGLE_CLIENT_SECRET!,
           redirect_uri: process.env.GOOGLE_REDIRECT_URL!,
           grant_type: 'authorization_code',
         }),
         headers: { 'Content-Type': 'application/json' },
       })

       const data = await tokenResponse.json()

       const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
         headers: { Authorization: `Bearer ${data.access_token}` },
       })

       const userInfo = await userInfoResponse.json()
       const token = jwt.sign(userInfo, process.env.JWT_SECRET!, {
         expiresIn: '1h',
       })

       const response = NextResponse.redirect('http://localhost:3000')
       response.cookies.set('token', token, { httpOnly: true })

       return response
     } catch (error) {
       console.error('Error exchanging token:', JSON.stringify(error, null, 2))
       if (error instanceof Error) {
         throw error
       }
     }
   }
   ```

5. 이제 `/api/auth/me` 라우터를 만들어서 이 쿠키가 있는지 확인 한 뒤 회원정보를 가지고 오는 로직을 구현하여 클라이언트에서 사용할 수 있게 한다.

   ```typescript
   import { NextRequest, NextResponse } from 'next/server'
   import jwt from 'jsonwebtoken'

   export async function GET(req: NextRequest) {
     const token = req.cookies.get('token')?.value

     if (!token) {
       return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
     }

     try {
       const user = jwt.verify(token, process.env.JWT_SECRET!)
       return NextResponse.json(user)
     } catch (error) {
       return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
     }
   }
   ```

## Next.js 코드 예시: next-auth 라이브러리로 구현하기

next-auth는 OAuth를 포함한 다양한 인증 방식을 추상화하여 간단한 설정만으로 사용할 수 있도록 도와주는 라이브러리이다.
앞서 구현했던 OAuth 로직을 next-auth 라이브러리를 사용하여 더 간단하게 구현해보자.

1. next-auth 설치 \
   `npm install next-auth`

2. 환경 변수 설정

   ```md
   GOOGLE_CLIENT_ID=<Google Client ID>
   GOOGLE_CLIENT_SECRET=<Google Client Secret>
   NEXTAUTH_URL=http://localhost:3000
   JWT_SECRET=<Random String>
   ```

3. `app/api/auth/[...nextauth]/route.ts`을 생성한다.
   next-auth의 API 엔드포인트를 설정하기 위해 파일을 생성한다. `[...]`는 동적 라우팅으로, 이 설정을 통해 `api/auth/*` 경로를 자동으로 처리할 수 있게 된다.

   ```typescript
   import NextAuth from 'next-auth'
   import GoogleProvider from 'next-auth/providers/google'

   const handler = NextAuth({
     providers: [
       GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
       }),
     ],
     secret: process.env.JWT_SECRET,
   })

   export { handler as GET, handler as POST }
   ```

4. `SessionProvider`로 로그인 상태 유지
   `SessionProvider`를 사용하여 애플리케이션의 컴포넌트를 감싸면 인증 세션을 전역적으로 관리할 수 있다.

   ```typescript
   import { SessionProvider } from "next-auth/react";

   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return (
       <html lang="en">
         <body>
           <SessionProvider>{children}</SessionProvider>
         </body>
       </html>
     );
   }
   ```

5. 회원 정보 DB 저장 로직 추가 (선택 사항)

   ```typescript
   import NextAuth from 'next-auth'
   import GoogleProvider from 'next-auth/providers/google'

   const handler = NextAuth({
     providers: [
       GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
       }),
     ],
     callbacks: {
       async signIn({ user }) {
         // 회원 정보를 저장하는 로직 추가
         // 예: DB에서 사용자를 확인하거나, 없으면 새로 생성
         const userExists = await findUserInDatabase(user.email)
         if (!userExists) {
           await createUserInDatabase(user)
         }
         return true // 로그인 성공 시 true 반환
       },
       async session({ session, token }) {
         // 세션에 추가 정보 삽입
         session.user.id = token.id
         return session
       },
       async jwt({ token, user }) {
         // JWT에 사용자 ID 추가
         if (user) {
           token.id = user.id
         }
         return token
       },
     },
     secret: process.env.JWT_SECRET,
   })

   export { handler as GET, handler as POST }
   ```

## 직접 구현 vs. next-auth

| 구분     | 직접 구현                  | next-auth 사용                  |
| -------- | -------------------------- | ------------------------------- |
| **장점** | 세부 로직을 직접 제어 가능 | 빠르고 간편하게 OAuth 구현 가능 |
| **단점** | 코드 복잡도가 높아짐       | 복잡한 커스터마이징에는 부적합  |
