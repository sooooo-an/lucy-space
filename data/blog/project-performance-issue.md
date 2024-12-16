---
title: 개발자 도구를 활용하여 메모리 누수 진단하기
date: 2024-10-30
category: Web Performance
---

Angular에는 RxJS 라이브러리가 내장되어있다. \
RxJS는 비동기 상태를 효율적으로 관리할 수 있다는 장점이 있지만, 구독을 취소하지 않으면 내부적으로 메모리 누수가 발생할 수 있는 치명적인 단점이 있다.\
정보성 페이지나 일시적으로 켜고 끌 수 있는 애플리케이션에서는 이 문제가 비교적 덜하지만, 일렉트론을 이용해 하루 종일 켜 두는 협업 도구에서는 메모리 누수가 특히 심각할 수 있다. \
사용자가 며칠 동안 애플리케이션을 종료하지 않고 지속해서 사용하기 때문이다.

## 1. 메모리 누수 확인 방법

메모리 누수를 확인하려면, 노가다를 좀 해야한다... 개발자 도구 > 성능 탭과 개발자 도구 > 메모리 탭의 녹화 버튼을 통해서 메모리 누수를 확인하는 방법도 있지만, 회사에서 거의 메모리누수가 일어나는 경우는 RxJS 구독을 취소하지 않거나, 자식 컴포넌트를 부모 컴포넌트로 가지고와서 사용하기 때문에 자식 컴포넌트가 destroy되지 않았거나 등의 이유였다. \
그래서 녹화버튼을 활용하기보다는 이벤트 전의 DOM Node 갯수와 이벤트 후의 DOM Node 갯수를 비교하는 방식으로 성능을 확인한 뒤에 그 컴포넌트에서 구독 취소가 안되어있는지 확인하고, 위의 이유가 아니라면 녹화버튼을 활용하여 심층적으로 확인하는 방식을 채택했다.

![메모리 체크하는 방법](/images/posts/project-performance-issue/memory-check.png)

1. 이벤트를 실행하기 전 JS 힙 크기와 DOM 노드의 크기를 확인한다
2. 이벤트를 실행한다
3. 가비지 컬렉터 버튼을 클릭한다
4. 이벤트를 실행하기 전과 JS 힙 크기와 DOM 노드의 크기가 동일한지 확인한다

#### - 프로젝트 리스트 이동 이벤트

- 스크린샷
  ![프로젝트 리스트 스크린샷](/images/posts/project-performance-issue/project-tab.png)

- 프로젝트 탭 이동 전
  ![탭 이동 스크린샷](/images/posts/project-performance-issue/project-memory-before.png)

- 프로젝트 탭 여러번 진입 시
  ![탭 이동 스크린샷](/images/posts/project-performance-issue/project-memory-after.png)

- 이전 코드

```typescript
this.tabViewerSub = this.activatedRoute.paramMap.subscribe((paramMap) => {
  this.isTabViewer = !!paramMap.get(TAB_PARAM_ID)
  if (this.isTabViewer) {
    this.viewType = 'tab'
  } else {
    const projectViewSub = this.projectService.$getProjectView().subscribe((data) => {
      this.viewType = data.view
    })
    this.subscription.add(projectViewSub)
  }
})
```

- 수정 코드

```typescript
ngOnInit() {
  this.activatedRoute.paramMap
  .pipe(
    map((paramMap) => {
      this.isTabViewer = !!paramMap.get(TAB_PARAM_ID);
      if (this.isTabViewer) {
        this.viewType = "tab";
        return;
      } else {
        return of(true);
      }
    }),
    filter((isTabView) => !!isTabView),
    switchMap(() => this.projectService.$getProjectView()),
    takeUntil(this.destroy$)
  )
  .subscribe((data) => {
    this.viewType = data.view;
  });
}


ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

`subscribe` 안에 `subscribe`를 넣는 것 또한 안티패턴이기 때문에 이를 수정해주고, `subscribe`에서 많은 일이 일어나기 때문에 `map` 메서드로 올려서 작업해주었다. 또한 `takeUntil`을 통해서 컴포넌트가 `destroy`될 때, 함께 구독취소되도록 구현해주었다.
