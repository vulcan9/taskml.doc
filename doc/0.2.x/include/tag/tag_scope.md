# scope 태그

`<scope>` 태그는 한 문서 안에서 “특정 범위 + 그 안의 `<script>`”를 묶어서 로컬 스코프처럼 다루기 위한 태그입니다.

> scope 태그는 namespace를 설정하지 않습니다.
> scope 태그는 Dom 검색 범위에만 관여합니다.

### `<scope>` 태그 안에 작성할 수 있는 요소들

- 일반 DOM 요소들
- `<task>` (task 정의)
- `<template>`
- `<script>`
- 커스텀 컴포넌트용 마크업

> `<define>` 태그는 `<scope>` 태그 내부에 사용할 수 없습니다.

등이 그대로 다 들어갈 수 있습니다.

### 주의할 점

- `<task>`는 원래 어디에 두든 DOM으로 렌더링되는 노드는 만들지 않고 $task provider에만 등록됩니다.
- `<template>`도 scope 전용으로 따로 구별하지 않고 namespace에 의해서만 분류되어 관리됩니다.
- `<scope>` + `<define>` 조합은 사용할 수 없습니다.
  - `<define>` 안에 `<scope>` 넣는 건 안전하지 않습니다. 
  - `<scope>` 안에 `<define>` 넣는 건 안전하지 않습니다.

## scope 태그의 기능 설명

다음과 같이 전역 공간에 `퀴즈 1`과 `퀴즈 2` UI가 있는 경우,
```html
<!--퀴즈 1 UI-->
<div class="quiz_1">
    <div class="item"></div>
    <div class="item"></div>
</div>

<!--퀴즈 2 UI-->
<div class="quiz_2">
    <div class="item"></div>
    <div class="item"></div>
</div>
```

퀴즈에 스크립트를 적용시킬때 DOM을 참조하는 코드를 작성하게되는데,

```html
<!--퀴즈 1 UI-->
<div class="quiz_1"> ... </div>
<script>
    // 이 스크립트는 퀴즈 1에만 관심 있음
    const item = document.querySelector('.quiz_1 .item');
</script>

<!--퀴즈 2 UI-->
<div class="quiz_2"> ... </div>
<script>
    // 이 스크립트는 퀴즈 2에만 관심 있음
    const item = document.querySelector('.quiz_2 .item');
</script>
```

검색되는 `item` element의 검색 범위를 제한하는 방법으로는 다음 방법이 있습니다.
```js
// 부모 selecctor를 추가하여 검색 범위를 제한
const item1 = document.querySelector('.quiz_1 .item');
const item2 = document.querySelector('.quiz_2 .item');
```

다른 방법으로는 `<scope>` 태그로 감싸는 것입니다.  
핵심 개념은 `<scope>` 안에서 실행되는 스크립트가 자기 구역에서만 쉽게 찾고 다룰 수 있도록 하는 것입니다.  

```html
<!--퀴즈 1 UI-->
<scope>
    <div class="quiz"> ... </div>
    <script>
        // 이 스크립트는 이 scope에만 관심 있음
        const scope = $inject.scopeElement;
        // 전역이 아니라 이 스코프 안에서만 찾기
        const items = scope.querySelectorAll('.item');
    </script>
</scope>

<!--퀴즈 2 UI-->
<scope>
    <div class="quiz"> ... </div>
    <script>
        // 스크립트는 이 scope에만 관심 있음
        const scope = $inject.scopeElement;
        // 전역이 아니라 이 스코프 안에서만 찾기
        const items = scope.querySelectorAll('.item'); 
    </script>
</scope>
```
`<scope>` 태그로 감싸면서 `퀴즈1`과 `퀴즈2`의 코드, css class 이름, 구조가 모두 같아졌습니다.  
- 공통된 로직을 모듈화 하기가 보다 쉬워졌습니다.
- 공통으로 사용하기 위해 외부 파일로 분리하기가 쉬워졌습니다.





























































