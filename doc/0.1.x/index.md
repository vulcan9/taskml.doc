# taskml

미리 정의된 Tag와 최소한의 Javascript 만으로 인터렉션을 구현(표현)을 할 수 있는 방법을 제공합니다.

* [Quick Start](./taskml)
* [version download](https://github.com/vulcan9/taskml.doc/tree/main/doc/0.1.x/dist/taskml)

> v 0.1.4 버전부터 `<as-task>`태그 대신 `<task>` 태그를 사용할 수 있습니다.

### DEMO

* [Demo](./test/sample.html)
* [task 단위 테스트](./test/task.html) (디버깅 창 log 확인)
* ~~[매개변수 단위 테스트](./test/args.js)~~
* [레이아웃 정렬](./test/layout.html)
* [드래그 앤 드랍](./task/드래그앤드랍)
* [미디어 컨트롤](./task/미디어%20컨트롤) `ver 0.1.4`

### taskml 구성 요소

taskml은 크게 두가지 구성요소로 구분됩니다.

* 인터렉션을 표현하는 `task` 컴포넌트 (시멘틱)
* 화면을 구성하는 DOM 컴포넌트

> taskml에서 "on"으로 시작되는 attribute은 모두 이벤트 핸들러를 위한 attribute으로 간주합니다.
> * 파싱되는 과정에서 핸들러는 등록되고 DOM atrtibute에서는 삭제될 수도 있습니다.
>
>
> 템플릿 내용은 최초 한번만 랜더링 됩니다.
> * task 컴포넌트, DOM 컴포넌트 태그는 `<template>` 태그 내에서만 사용할 수 있습니다.
> * 따라서 생성된 DOM에 `task:click` 같은 attribute을 동적으로 생성해 넣어도 동작하지 않습니다.

### task 컴포넌트 (hidden)

인터렉션을 표현(구현)하는 hidden 요소입니다.  
그중 `<as-task>` 태그는 여러 task 요소를 그룹화할 수 있습니다.  
나머지 task 태그들은 각각 특별한 기능을 구현하고 있습니다.

좀더 자세한 내용은 다음 링크를 참고하세요

- [task 컴포넌트](./task%20컴포넌트)
- [`<as-task>` 태그](./task/as-task%20태그)
- [task 아이템 태그](./task/)

### 글로벌 객체

`taskml`만으로 부족한 기능이 있다면 Javascript에서 템플릿에 정의된 `task` 객체에 접근할 수 있도록 글로벌 객체를 제공합니다.  
다음 글로벌 객체를 이용하여 기능을 필요한 기능을 확장할수 있습니다.

좀더 자세한 내용은 다음 링크를 참고하세요
- [글로벌 객체](./글로벌%20객체)


### DOM 컴포넌트 (visible)

화면에 보여지는 요소입니다.    
UI를 빠르게 구성할 수 있도록 HTML 태그에 몇가지 기능이 추가된 DOM 래퍼 객체입니다.

- [DOM 컴포넌트](./DOM%20컴포넌트)
- [컨테이너 태그](./component/컨테이너%20요소)
- [컴포넌트 태그](./component/컴포넌트%20요소)
