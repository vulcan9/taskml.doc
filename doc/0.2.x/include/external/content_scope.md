# 외부 파일에 `<scope>`가 있는 경우

여기서는 두 가지 `scope 개념`이 섞여 있습니다
- 외부 파일 전체를 scope로 쓰는 경우 (옵션의 scope)
- `<scope>` 엘리먼트 자체

## 외부 파일 전체를 scope로 쓰는 경우 (옵션의 scope)

내부적으로 scope과 define 옵션이 있는데, 같은 파일에 둘 다 쓰면 에러가 나도록 막혀 있습니다.

> `<scope>`과 `<define>` 태그를 함께 사용할 수 없습니다.

즉, 이 파일을
- `define 기반 컴포넌트 묶음`으로 쓸 건지
- `scope 기반의 단일 블록`으로 쓸 건지

둘 중 하나만 선택해야 한다는 의미입니다.

## `<scope>` 엘리먼트 자체

> `<scope>` 태그로 감싸줘야 파싱 결과 body 태그에 생성된다.    
> 감싸지 않으면 script 태그나 일부 template 태그들이 head 태그에 생성되는 경우가 생긴다.

즉, HTML 문자열을 파싱할 때,
- `<html><head>...<body>...` 구조를 가진 파일이라면 문제가 덜한데
- 조각(fragment)을 파싱할 때는 `<script>`, `<template>` 같은 태그가 head 쪽으로 들어가 버리는 경우가 있습니다.

이걸 안정적으로 body 범위로 보내기 위해 전체를 `<scope> ... </scope>`로 감싸서 파싱하는 패턴을 씁니다.

또 Injection 쪽 코드에서는:

- script 안에서 `this.getInject().querySelectorAll(...)` 같이 쿼리할 때
- 자신이 속한 `<scope>` 영역 안에서만 검색되도록 하는 로직이 들어가 있습니다.
- 즉, "이 스크립트는 이 scope 블록 내부만 건드린다"는 걸 보장하는 용도로 사용됩니다.

## 요약

1. 조각(fragment) HTML을 preload하고 싶다면 `<scope>...</scope>`로 감싸는 것을 권장
    - 그래야 script/template가 head로 튀지 않고
    - 의도한 대로 body 영역으로 들어감.


2. `<scope>` 안에서 실행되는 스크립트는 
    - TaskML이 제공하는 헬퍼(`getInject().querySelectorAll`)를 쓰면, 
    - scope 내부만 대상으로 동작하도록 할 수 있습니다.


3. 한 파일에서 `<define>`과 `<scope>`를 동시에 쓰지 않는다.  
    - 둘은 서로 다른 용도의 "격리 레벨"로 동작합니다.









