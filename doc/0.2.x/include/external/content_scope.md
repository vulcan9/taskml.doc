# 외부 파일에 `<scope>`가 있는 경우

외부 파일에 DOM 요소를 작성하려면 `<scope>` 또는 `<define>` 태그로 묶는것이 좋습니다.

### 언제 <scope>를 쓰면 좋은가?

- 페이지 단위 외부 화면을 preload할 때
- 화면 일부를 모듈처럼 분리해서 불러올 때
- 외부 파일이 완전한 HTML 문서가 아니라 "조각"일 때
- 스타일/스크립트 영향 범위를 국지화하고 싶을 때
- 컴포넌트가 아니라 "페이지 조각"을 불러와 DOM으로 합치고 싶을 때

### 왜 `<scope>`으로 감싸야 하나?

preload로 불러오는 외부 파일 전체를 마치 `<html>` 태그처럼 `<scope> ... </scope>` 태그로 감싸서,  
그 파일 내부에서 사용하는 DOM/스크립트/스타일/템플릿이 "그 영역 안에서만" 동작하도록 만드는 방식입니다.

즉, 해당 외부 파일은 하나의 독립된 화면 블록처럼 취급됩니다.

## 외부 파일 전체를 scope으로 감싸는 경우

### 1. HTML 조각(fragment) 파싱 문제 해결

외부 파일이 HTML 전체 문서가 아니라 조각이면, HTML 파서가 `<script>`, `<template>` 같은 요소를 `body`가 아니라 `head` 쪽으로 이동시키는 문제가 생깁니다.

예시 (문제 되는 경우):
```html
<script>
    console.log("나는 왜 head로 가지?");
</script>

<div>내용</div>
```

이걸 preload에서 읽을 때 브라우저 파서는 이 조각을 자동으로 재배치해버릴 수 있습니다.

```html
<html>
  <head>
     <script>...</script>   ← 여기에 들어가버림
  </head>
  <body>
     <div>내용</div>
```

즉, HTML 문자열을 파싱할 때,
- `<html><head>...<body>...` 구조를 가진 파일이라면 문제가 덜한데
- 조각(fragment)을 파싱할 때는 `<script>`, `<template>` 같은 태그가 head 쪽으로 들어가 버리는 경우가 있습니다.

이걸 안정적으로 body 범위로 보내기 위해 전체를 `<scope> ... </scope>`로 감싸서 파싱하는 패턴을 씁니다.  
`<scope>` 태그는 "body 내용이다" 라고 강제로 알려주는 역할을 합니다.

> ⚠️ 주의  
> `<scope>` 태그로 감싸줘야 파싱 결과가 `body` 태그에 생성된다.    
> 감싸지 않으면 script 태그나 일부 template 태그들이 `head` 태그에 생성되는 경우가 생긴다.

### 2. 스크립트/DOM 조작을 해당 범위 안에만 제한할 수 있음

라이브러리 내부의 `this.getInject().querySelector()`는
- 자신이 속한 `<scope>` 안에서만 DOM을 찾도록 설계되어 있습니다.

즉, 외부 파일에서 쓴 JS가 전체 페이지를 건드리지 않고 스코프 안에서 안전하게 동작하게 해줍니다.

### 3. define 구조와 충돌 방지

외부 파일은 `scope` 기반 또는 `define` 기반 둘 중 하나만 사용할 수 있습니다.  
`<scope>`를 사용하면 이 파일은 "하나의 isolated block"으로 취급되어 `<define>`과 섞을 수 없습니다.

> ⚠️ 주의  
> 내부적으로 scope과 define 옵션이 있는데, 같은 파일에 둘 다 쓰면 에러가 나도록 막혀 있습니다.
> - `<scope>`과 `<define>` 태그를 함께 사용할 수 없습니다.

즉, 이 파일을
- `define 기반 컴포넌트 묶음`으로 쓸 건지
- `scope 기반의 단일 블록`으로 쓸 건지

둘 중 하나만 선택해야 한다는 의미입니다.

## 요약

- 조각(fragment) HTML을 preload하고 싶다면 `<scope>...</scope>`로 감싸는 것을 권장
    - 그래야 script/template가 head로 튀지 않고
    - 의도한 대로 body 영역으로 들어감.


- `<scope>` 안에서 실행되는 스크립트는
    - TaskML이 제공하는 헬퍼(`getInject().querySelectorAll`)를 쓰면,
    - scope 내부만 대상으로 동작하도록 할 수 있습니다.


- 한 파일에서 `<define>`과 `<scope>`를 동시에 쓰지 않는다.
    - 둘은 서로 다른 용도의 "격리 레벨"로 동작합니다.

# 실제 작성 예시

## 외부 파일 전체를 `<scope>`으로 감싼 형태  

(예: /pages/page1.task.html)
```html
<scope>

    <style>
        .title { font-size: 20px; }
    </style>

    <script>
        console.log("이 스크립트는 이 scope 안에서만 동작합니다.");
    </script>

    <template id="tpl-item">
        <div class="title">템플릿 아이템: ${data.text}</div>
    </template>

    <div class="title">Page Title</div>
    <div id="list-area"></div>

    <task id="리스트그리기">
        <task>
            <script>
                const el = this.getInject().querySelector("#list-area");
                el.innerHTML = "Scope 내부 DOM 접근 성공!";
                $next();
            </script>
        </task>
    </task>

</scope>
```
이 파일 전체가 preload 과정에서 "하나의 화면 블록"으로 처리됩니다.  
이렇게 preload합니다.

```html
<task preload="./pages/page1.task.html"
      selector="#main"
      shadowroot="open">
</task>
```

preload 로딩 후 결과:

- `<scope>` 안의 `<style>` : shadowRoot 또는 selector 내부로만 적용됨
- `<scope>` 안의 ` : scope 내부에서만 DOM 조작
- `<template>` : 등록됨
- `<task>` : 전역 Task에 등록되지만, scope 기반 inject를 사용
- `<div id="list-area">` 등 DOM : selector에 append됨
- HTML 파싱 문제 (템플릿이 head로 가거나 script가 밖으로 튀는 현상) 없음


## scope 구조가 없으면 생기는 문제

예를 들어 아래처럼 외부 파일을 작성하면:

```html
<style>.box { color: red; }</style>

<script>
    // 이게 전체 document.body를 참조해버릴 수 있음
</script>

<template id="item-tpl">...</template>

<div class="box">내용</div>
```

preload할 때 브라우저 파서가 이걸 다음처럼 재구성할 수 있음:

```html
<html>
<head>
    <style>...</style>
    <script>...</script>  ← head로 감
</head>
<body>
<div class="box">내용</div>

```

문제점:

- `<script>`가 head로 이동해 버려 기대했던 DOM을 찾지 못함
- 템플릿도 head에 들어간 경우가 발생하여 TaskML 템플릿 파서가 꼬임
- 스타일이 전역에 적용되어버림
- 페이지 전체 DOM을 건드릴 위험 있음

`<scope>`로 감싸면 이 문제들이 모두 해결됩니다.






