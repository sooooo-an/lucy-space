---
title: 개발하면서 알아야할 웹 보안
date: 2024-10-20
category: Web Security
---

### 목차

[CORS](#cors)
[CSRF](#csrf)
[Cross-Site Script Attacks](#cross-site-script-attacks)

---

Swit은 협업툴을 서비스로 하기 때문에 사용자 간의 데이터 전달이 빈번하다.\
특히 내가 작성한 데이터가 다른 사용자에게 보여질 수도 있고, 서드파티 앱을 설치한다면 서드파티 앱 개발자가 만든 데이터가 화면에 그려져야하기 때문에 웹 보안에 유념해서 개발을 해야한다.\
백엔드로만 해결할 수 있는 부분도 있지만, 프론트엔드에서만 해결해야할 부분이 있을 수도 있고, 각 부서끼리 협업해서 개발을 해나가야하는 부분도 있기 때문에 웹에서 일어날 수 있는 공격은 알아두는 것이 좋다.

---

## CORS

개발을 할 때, 백엔드에서 알려준 API로 데이터를 받아오려고 하면, 개발자 도구의 네트워크창에서 CORS Error라고 떠있는 경우를 종종 볼 수 있다. \
**CORS란 Cross Origin Resource Sharing의 약자로 서버와 클라이언트가 교차 출처 요청이 괜찮다는 데 동의하는 정책**이다.
브라우저는 동일 출처를 기본 정책으로 두고 있기 때문에 교차 출처를 하기 위해서는 데이터를 보내는 서버와 데이터를 받는 클라이언트에게 모두 동의를 받아야한다.

#### - 동일 출처 정책(Same-Origin Policy)이란?

프로토콜이 같고, 호스트가 같고, 포트가 같은 URL을 동일 출처라고 한다. \
 동일 출처는 네트워크 통신에만 해당되는 것이 아니라 각 탭간, iframe 기능을 사용할 때도 동일 출처 정책을 따른다.

```mdx
https://example.com:443 // 동일 출처
https://example.com:443/test // 동일 출처
http://example.com:443 // 교차 출처, 프로토콜이 다르다
https://www.example.com:443 // 교차 출처, 호스트가 다르다
```

위의 코드를 보면, 첫 번째와 두 번째의 URL은 프로토콜과 호스트 그리고 포트가 같기 때문에 동일 출처로 볼 수 있다 \
 그러나 세 번째는 프로토콜이 다르고, 네 번째는 호스트, 서브도메인이 다르기 때문에 동일 출처로 보기 어렵다.

#### - 동일 출처 정책이 필요한 이유

사이트의 데이터를 보호하기 위해서는 동일 출처 정책을 따르는 것이 좋다 \
 만약 브라우저가 동일 출처 정책을 따르지 않는다면, 내가 A라는 은행사이트의 회원 정보를 탈취하고자 할 때, API 앤드포인트만 알게되면 데이터를 탈취할 수 있게 된다.
그러나 브라우저는 동일 출처 정책을 따르기 때문에 A라는 은행사이트가 실수로 나에게 API 응답을 보내주더라도 브라우저에서 이를 확인하고 응답을 볼 수 없게 한다.

#### - CORS Error를 해결하는 방법

CORS 에러를 해결하기 위해서는 프록시 서버를 사용하거나 게이트웨이 활용 등 몇가지 방법이 있으나 서버에서 CORS 헤더를 설정해주는 것이 보편적인 해결방법이다.

- `Access-Control-Allow-Origin`: 동일 출처 정책을 재정의한다는 의미를 가진 헤더로 이 헤더에 설정되어 있는 출처에 한해서 브라우저는 응답을 볼 수 있도록 허용해준다.
- `Access-Control-Allow-Credentials`: 인증 정보(쿠키, 인증 토큰 등)를 포함한 요청을 허용할지를 설정하는 헤더로, 클라이언트와 서버에서 양방향 합의가 되어야한다.

#### - 프리플라이트(preflight)를 사용하는 이유

브라우저의 일부 요청을 사전 실행하는 것으로, 어떤 메서드, 어떤 도메인이 허용되는 지에 대해 미리 알 수 있게되어 쓸데없이 API를 호출하는 것을 방지할 수 있다.

---

## CSRF

위조된 교차 출처 요청을 보내는 공격으로, 다른 사이트인 것처럼 가장해서 서버에 요청을 보낸다.\
이 공격이 가능한 이유는, 브라우저 쿠키의 동작 방식에 있는데, 도메인이 다르다고 하더라도 응답을 보내면, 쿠키는 자동으로 포함되기 때문에 CSRF 공격이 가능하게 된다. \
SOP(Same Origin Policy)은 클라이언트에서 요청을 보냈을 때, 다른 출처인 경우 브라우저가 응답을 보지못하게 막는 정책인데 보통 CSRF의 경우에는 POST 메서드에서 일어나기 때문에 클라이언트에서 응답값을 확인하지 않아도 된다.
그렇기 때문에 SOP로는 CSRF 공격을 방지할 수 없다.

#### - CSRF의 동작 과정

```html
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="amount" value="1000" />
  <input type="hidden" name="toAccount" value="attackerAccount" />
</form>
<script>
  document.forms[0].submit() // 페이지를 열면 자동으로 폼 제출
</script>
```

1. 은행 사이트에 사용자가 미리 로그인한 상태로 사용자의 브라우저에는 `bank.com`에서 발급한 인증 쿠키가 남아 있는 상태이다.

2. 사용자가 공격자가 보낸 링크를 타고 `attack.com` 이라는 사이트에 접속하면, 위의 폼이 바로 POST 요청을 보낸다

3. 요청 대상이 `bank.com`이기 때문에 `bank.com`의 쿠키를 자동으로 포함하여 요청을 보낸다. 이는 브라우저가 쿠키를 도메인별로 관리하고, 동일 출처 정책에 따라 해당 도메인으로의 요청에 쿠키를 포함하기 때문이다.

4. CORS로 인해 응답은 볼 수 없지만, 요청은 정상적으로 처리하므로 사용자는 알지 못하는 사이에 돈이 송금된다.

#### - CSRF 공격이 가능한 이유

1. 공격 대상 API 엔드포인트를 사전에 알고 있어야 한다. 공격자가 탈취할 API를 미리 알아내어 해당 요청을 위조할 수 있어야 한다.

2. 피해자가 로그인 상태여야 한다.

3. 브라우저의 자동 쿠키 포함 기능을 악용한다. CSRF 공격은 사용자가 로그인된 상태에서 다른 도메인에서 요청을 보내더라도 브라우저가 자동으로 인증 쿠키를 포함시키는 점을 악용합니다. 피해자가 공격자가 유도한 다른 사이트에서 특정 API 호출을 하게 되면, 브라우저는 해당 도메인에 대한 인증 쿠키를 자동으로 포함해 서버에 유효한 요청처럼 전달될 수 있습니다.

#### - CSRF를 방지하는 방법

1. 쿠키를 설정할 때마다 동일 출처 쿠키 플래그를 사용하고 있는 지 확인한다

- `strict`: 교차 출처가 아예 불가능하다.
- `lax`: 웹사이트에서 직접 이동(링크 및 탭 열기)하는 경우를 제외하고는 `strict`과 동일한 작업을 수행한다. 대부분의 브라우저의 기본 동작이다.

- `none`: CSRF 공격에 대해 취약점이 많다.

2. Anti-CSRF 토큰을 사용한다

- 클라이언트에서 Anti-CSRF 토큰을 헤더에 넣어서 API 요청을 보낸다. 서버도 이 토큰을 보고, 해당 사용자가 보내는 응답인지 다른 사이트에서 보내는 응답인지 확인할 수 있다.

---

## Cross-Site Script Attacks

#### - XSS(Cross-Site Scripting)

공격자가 사용자 인터페이스에 자바스크립트를 삽입하는 공격으로, 공격자가 자바스크립트 코드를 다른 사용자 인터페이스 내에서 실행하게되면, 동일 출처 정책을 우회할 수 있게 된다. XSS 공격의 종류에는 3가지가 있다.

#### - XSS 공격의 종류

1. 지속형(persistent): 저장된 교차 사이트 스크립팅 공격이라고도 하며, 공격자가 서버에 일부 악성 코드를 저장하고 이를 사용자에게 표시하도록 유도하는 방법이다. 예를 들면, 공격자가 example.com 이라는 사이트에 댓글을 달 때, 스크립트가 실행되는 코드를 추가할 수 있다. 그렇게 된다면, example.com 사이트를 방문한 모든 사용자는 피해자가 된다.
2. 비지속형(Non-persistent): 반사 공격이라고도 한다. 예를 들면, 공격자가 서치파라미터에 스크립트를 주입시켜놓은 링크를 여기저기에 뿌리고 다녔다고 하면, 그 링크를 클릭해서 들어가는 모든 유저는 정보를 탈취당할 수 있게 된다
3. DOM기반: 프론트엔드에서만 일어나는 공격으로, 비지속형과 비슷하게 동작하지만, 비지속형과의 차이점은 프론트엔드에서만 일어나느냐 아니냐의 문제이다

#### - XSS 공격을 막는 방법

- 동적 텍스트를 추가할 때 항상 `textContext` 또는 `innerText`을 사용한다
- 사용자가 어떤 것을 입력하고, 서버로 보낼 때마다 sanitize 한다. 앵귤러에서는 이를 지원해주는 라이브러리가 내장되어 있다.
- 민감한 쿠키에 HttpOnly 플래그를 추가하여 클라이언트 측에서 쿠키에 액세스하는 것을 제한한다.
