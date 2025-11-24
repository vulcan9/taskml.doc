# 스타일 적용 규칙

taskML의 템플릿에서 스타일을 정의하면 작성하는 곳에 따라 적용 범위가 달라집니다.

### CSS 적용 기준

CSS 적용 범위를 구분하는 기준입니다. `<define>` 관련 내용을 제외하면 웹 표준과 같습니다.
- 브라우저 기본 규칙
- shadow DOM 경계
- (추가됨) `<define>`의 스타일 규칙

> `<scope>`는 CSS에는 전혀 관여 안 하고, 스크립트용 `영역 제한`만 합니다.

# `<define>` 내부에서 작성한 스타일

### `<define>` 안에서 작성한 스타일의 동작 규칙

내부에 최상위 자식으로 다음 요소들만 사용 가능합니다.  
나머지 태그는 다 제거됩니다. 

- `<style>`
- `<link rel="stylesheet">`
- `<script>`
- `<template>`
- `<task>`

이중에 같은 namespace에 속하는 모든 `<style>`과 `<link rel="stylesheet">`는
같은 범위의 모든 `<template>` 의 `template.content` 맨 앞에 자동으로 추가됩니다.

## `<template>` 외부에 작성한 `<style>`, `<link>`

- `<define>` (정확히는 같은 ns) 안의 각 `<template>` 안에 그대로 적용됨
- 따라서 컴포넌트가 그 `<template>`을 사용할 때마다 CSS 설정이 같이 딸려 나감

각 `<template>` 내부에 직접 작성한 `<style>`
- 그 `<template>` 안에만 남음
- 다른 `<template>`으로는 복사되지 않음

```html
<define ns="quiz">

    <!-- ①번 스타일 -->
    <style> .item { border: 3px solid red; } </style>

    <template id="quiz-view">
        <!-- ②번 스타일 -->
        <style> .quiz-box { display: flex; } </style>
        ...
    </template>

    <template id="quiz-result">
        ...
    </template>
    
</define>
```

파싱 후에는 내부적으로는 다음 모양처럼 처리됩니다.

```html
<define ns="quiz">

    <template id="quiz-view">
        <!-- ①번 스타일: 템플릿 내부에 자동 추가됨 -->
        <style> .item { border: 3px solid red; } </style>

        <!-- ②번 스타일 -->
        <style> .quiz-box { display: flex; } </style>
        ...
    </template>

    <template id="quiz-result">
        <!-- ①번 스타일: 템플릿 내부에 자동 추가됨 -->
        <style> .item { border: 3px solid red; } </style>
        ...
    </template>
    
</define>
```

# `<define>` 외부에서 작성한 스타일

## `<template>` 외부에 작성한 `<style>`, `<link>`

### 본문(루트 HTML)에서 쓰는 `<style>`, `<link>`

```html
<head>
  <link rel="stylesheet" href="base.css">
  <style>
    body { font-family: sans-serif; }
  </style>
</head>
```
이건 그냥 일반 HTML 페이지처럼 전체 문서에 적용됩니다.

taskml 이 별도로 건드리지 않습니다.
- `<template>`으로 렌더링된 DOM(= 라이트 DOM)에도 그대로 적용
- 단, shadow root 내부에는 브라우저 기본 규칙대로 직접 적용되지 않음

### include/preload 로 로드한 HTML 안의 `<style>`, `<link>`

(`<define>` 외부)
```html
<!--preload.html-->

<link rel="stylesheet" href="base.css">
<style>
    <style> .box { border: 3px solid red; } </style>
</style>
```
`<style>` 은 별도 특수 처리 없이 그냥 일반 DOM 요소로 붙기 때문에

- include 할 때 `shadowroot` 지정 안 하면   
  현재 문서의 라이트 DOM에 붙고, 전역 CSS처럼 동작
    ```html
    <task preload="${$inject.dirname}/preload.html" 
          selector="#script-include" shadowroot="false"></task>
    ```

- `shadowroot="open"` 같은 옵션으로 include 하면    
  호스트의 shadowRoot 안에 붙고, 그 shadow root 안에서만 적용
    ```html
    <task preload="${$inject.dirname}/preload.html" 
          selector="#script-include" shadowroot="open"></task>
    ```

# shadow root 와 스타일

## CustomElement 기반 컴포넌트

```html
<template id="userComponent">
    <style> .quiz-box { display: flex; } </style>
</template>

<user-component template="#userComponent" useShadowRoot="open"></user-component>
```
- `useshadowroot` 속성을 주면 shadow root 생성됨
- 템플릿 내용(template.content)은 그 shadow root 안에 렌더링 됨
- 이때 템플릿 안에 들어 있는 `<style>`, `<link>`들은 그대로 shadow root 안에 생김

따라서, 템플릿 안에 있는 스타일들은

- 라이트 DOM에 렌더되면 문서에 전역적으로 적용
- shadow root 안에 렌더되면 그 shadow root 내부에만 적용

`<define>` 바깥에 있는 전역 `<style>`은 shadow DOM 내부에는 기본적으로 영향을 주지 않습니다.

## `<define>` + shadow root 의 조합

```html
<define ns="quiz">
    <style>
        .item { border: 3px solid red; }
    </style>

    <template id="quiz-view">
        <div class="item"> ... </div>
    </template>

    <script type="module">
        import { CustomElement } from "/taskml";

        class QuizBox extends CustomElement {
            defaultTemplate() { return '#quiz-view'; }
            // DOM에 추가됨 (컴포넌트 내부 동작을 설명하기 위한 코드)
            connectedCallback() {
                // useshadowroot 같은 효과
                this.setShadowRootMode('open');
                // 템플릿 렌더
                this.render();
            }
        }

        customElements.define('quiz-box', QuizBox);
    </script>
</define>
```

동작 순서:
1. define 태그가 `<style>`을 `quiz-view` 템플릿 안으로 복사
2. `quiz-box` 컴포넌트 생성 시
  - 템플릿 `#quiz-view`를 shadow root 안에 렌더링
  - 템플릿 안 첫머리에 `<style> .item { ... } </style>`가 있기 때문에  
    shadow root 안의 `.item`만 스타일 적용

결과:
- 전역 문서에는 `.item` 스타일 영향 없음
- `quiz-box` 컴포넌트 내부(= shadow root) 에만 적용됨

### `<link rel="stylesheet">` 의 경우

> `<style>`과 같은 로직으로 동작합니다.  

`<define>` 안에 `<link rel="stylesheet" href="...">` 를 두면
- 각 템플릿 안으로 `<link>` 가 복사됨

그 템플릿이 라이트 DOM에 쓰이면
- 해당 `<link>`가 body 안에 생기지만, 브라우저가 CSS를 로드해서 전역처럼 적용

템플릿이 shadow root 안에 쓰이면
- `<link>`가 shadow root 안에 생기고, 브라우저 지원 범위 내에서 그 안에만 스타일 적용

# 스타일 적용 요약

| 스타일 위치 (`<style>`/`<link>`)           | 템플릿에 자동 복사                                    | 적용 범위 (기본)                                | 비고                               |
|-------------------------------------|-----------------------------------------------|-------------------------------------------|----------------------------------|
| 루트 HTML `<head>` 안                  | ❌                                             | 전체 문서(light DOM)                          | 일반 HTML 과 동일, shadow root 밖에만 영향 |
| include 된 HTML 안, `<define>` 밖      | ❌                                             | include 된 DOM 이 붙는 위치 (문서 or shadow root) | 전역 스타일이지만 템플릿에는 안 들어감            |
| `<define>` 바로 아래                    | ✅ 같은 owner/ns 의 **모든 `<template>` 에 prepend** | 템플릿이 렌더되는 위치 (문서 or shadow root)          | define-level 공용 스타일 용도           |
| `<define>` 안의 `<template>` 내부       | ❌ (원래 템플릿에만 있음)                               | 그 템플릿이 렌더되는 위치                            | 개별 템플릿 전용 스타일                    |
| `<scope>` 안                         | ❌                                             | 문서 전역 (또는 shadow root 안)                  | scope 는 CSS랑 무관, 스크립트용 영역 태그     |
| CustomElement 템플릿 안 (shadowroot 사용) | ❌ (템플릿 안에 있는 그대로)                             | 해당 컴포넌트의 shadow root 내부                   | define 에서 복사된 스타일 포함             |


- 스타일 범위는 기본적으로 브라우저 CSS 규칙 + shadow DOM 규칙에 따르고,
- TaskML 쪽에서 추가로 건드리는 부분은 `<define>` 내부 스타일을 템플릿으로 복사하는 것입니다.

- `<scope>`은 CSS에는 영향이 없고, 오로지 스크립트에서 `$inject.scopeElement` 로 `내 영역`을 찾는 용도입니다.

shadowroot 를 쓰면
- 전역 스타일은 안 들어가고
- 템플릿 안에 들어 있는 `<style>/<link>` 만 그 shadow root 에 적용됩니다.
- `<define>` 직속 스타일은 자동으로 템플릿에 복사되기 때문에, 결국 `컴포넌트 전용 스타일`처럼 동작하게 됩니다.




