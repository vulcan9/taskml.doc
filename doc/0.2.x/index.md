# taskml

미리 정의된 Tag와 최소한의 Javascript 만으로 인터렉션을 구현(표현)을 할 수 있는 방법을 제공합니다.  
TaskML은 HTML 안에 `<task>` 같은 태그로 `절차 (플로우)`를 선언하고, 
그걸 이벤트나 JS에서 호출해서 실행하는 작은 워크플로우 엔진이에요.

### TaskML 이란?
TaskML은 HTML 안에 `Task`를 정의하고, 버튼 클릭 같은 DOM 이벤트나 JavaScript 코드에서 그 Task를 호출해서 실행하는 라이브러리입니다.
- `<task>` 태그로 작업 묶음(Task) 을 선언합니다.
- `<task>` 태그로 다른 Task를 호출하거나, 하위 Task 아이템들을 순서대로 실행합니다.
- Task 안에는 `<script>`, `<include>`, `<blank>` 같은 Task 아이템 태그들이 들어갑니다.
- TaskML은 페이지 어디에 <task>를 두어도, 전역으로 한 번 파싱해서 관리합니다.

* [Quick Start](./taskml/Quick_Start)
* [taskml 요약](./taskml/taskml_요약.md)
* [version download](https://github.com/vulcan9/taskml.doc/tree/main/doc/0.2.x/dist/taskml)

> v 0.1.4 버전부터 `<as-task>`태그 대신 `<task>` 태그를 사용할 수 있습니다.

# taskml 구성 요소

taskml은 크게 두가지 구성요소로 구분됩니다.

* 인터렉션을 표현하는 `task` 컴포넌트 (시멘틱)
* 화면을 구성하는 DOM 컴포넌트

### task 인터페이스
  
`<task>` 태그는 여러 task 요소를 그룹화할 수 있습니다.  
나머지 task 태그들은 각각 특별한 기능을 구현하고 있습니다.

- [`task` 인터페이스](./taskml/task/task_intrface)
- [`<task>` 태그](./taskml/task_태그)
- [`task` 이벤트 주기](./taskml/task/task_event)
- [매개변수 전달 ($args)](./taskml/task/task_args.md)
- [`task` Attribute 인터페이스](./taskml/task/task_attribute.md)
- [`task` 인터페이스가 구현된 태그](./taskml/task_내장_객체)

### 글로벌 객체

`taskml`만으로 부족한 기능이 있다면 Javascript에서 템플릿에 정의된 `task` 객체에 접근할 수 있도록 글로벌 객체를 제공합니다.  
다음 글로벌 객체를 이용하여 기능을 필요한 기능을 확장할수 있습니다.

좀더 자세한 내용은 다음 링크를 참고하세요
- [글로벌 객체](./taskml/글로벌_객체)

# 0.2.x 버전에서 달라진점

### DOM 컴포넌트 (사용안함)

~~화면에 보여지는 요소입니다.~~    
~~UI를 빠르게 구성할 수 있도록 HTML 태그에 몇가지 기능이 추가된 DOM 래퍼 객체입니다.~~

- ~~[DOM 컴포넌트](../0.1.x/DOM%20컴포넌트)~~ (사용안함)
- ~~[컨테이너 태그](../0.1.x/component/컨테이너%20요소)~~ (사용안함)
- ~~[컴포넌트 태그](../0.1.x/component/컴포넌트%20요소)~~ (사용안함)

> 0.2.0 버전부터 화면을 구성하는 SolidJS DOM 컴포넌트는 지원하지 않습니다.  
> 0.1.x 버전의 SolidJS 컴포넌트 대신 `template`과 `customElements.define` 메서드를 사용하는  
> 표준 웹 컴포넌트를 사용합니다.

### 표준 웹 컴포넌트 사용

- [웹 컴포넌트 (Custom Elements) 사용하기](./include/web_component)
- [taskML에서 확장된 웹 컴포넌트 기능](./include/web_component_extention)

## 아이디 충돌 방지를 위한 기능

taskML을 한곳에서 작성하면 너무 복잡해집니다.  
이런 경우 외부 파일 불러오기 기능과 `<scope>`, `<define>` 태그를 사용하여 충돌 방지할 수 있습니다.

### namespace (define)

- [`<define>` 태그를 이용하여 독립적인 namespace 만들기](./include/tag/tag_define)
- [namespace 사용 방법](./include/tag/use_namespace)
- [style 적용 규칙](./include/rules/rules_style)

### DOM 탐색 제한 (scope)

- [`<scope>` 태그를 이용하여 범위 제한하기](./include/tag/tag_scope)
- [`<scope>` vs `<define>`](./include/tag/scope_vs_define)

### task 오버라이딩 (재정의)

task 태그에 `override` attribute이 추가되었습니다.
- [Task 오버라이딩](./include/rules/task_override)

## 외부 파일 Import

- [`preload` vs `include`](./include/import)
- [문서 로드와 실행 순서](./include/rules/문서_로드와_실행_순서)
- [$inject 객체 사용](./include/inject)

## 외부 파일에 TaskML 작성하기

- [외부 파일에 Root에 DOM이 있는 경우](./include/external/content_html)
- [외부 파일에 `<template>`이 있는 경우](./include/external/content_template)
- [외부 파일에 `<define>`이 있는 경우](./include/external/content_define)
- [외부 파일에 `<scope>`이 있는 경우](./include/external/content_scope)

## 요약

- preload된 외부 파일은 먼저 템플릿과 Task를 등록한 뒤, 본문 DOM이 만들어지고 난 다음에 DOM과 스크립트를 attach합니다.
- 외부 파일 안의 `<template>`은 `<define>` 바깥에 있으면 전역, `<define>` 안에 있으면 해당 define 전용으로 동작합니다.
- `<define>`은 Task/템플릿/스크립트/스타일을 하나의 영역으로 묶어 외부와 격리된 "작은 앱"처럼 사용할 때 쓰입니다.
- `<scope>`는 한 블록의 DOM과 스크립트가 페이지 전체가 아니라 특정 범위 안에서만 동작하도록 격리할 때 사용합니다.
- 한 외부 파일에서 `<define>`과 `<scope>`은 동시에 사용하지 않습니다.

# DEMO

* ~~[Demo](../0.1.x/test/sample.html)~~

* [task 단위 테스트](../0.1.x/test/task.html) (디버깅 창 log 확인)
* ~~[매개변수 단위 테스트](../0.1.x/test/args.js)~~ (작성중)
* ~~[레이아웃 정렬](../0.1.x/test/layout.html)~~ (사용안함)

* [드래그 앤 드랍](./feature/드래그앤드랍)
* svg 선긋기 (작성중)

* [미디어 컨트롤](./feature/미디어%20컨트롤) `custom element` (작성중)
* [미디어 API](./feature/미디어API) (작성중)






