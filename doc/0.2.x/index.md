# taskml

미리 정의된 Tag와 최소한의 Javascript 만으로 인터렉션을 구현(표현)을 할 수 있는 방법을 제공합니다.

* [Quick Start](./taskml)
* [version download](https://github.com/vulcan9/taskml.doc/tree/main/doc/0.2.x/dist/taskml)

> v 0.1.4 버전부터 `<as-task>`태그 대신 `<task>` 태그를 사용할 수 있습니다.

### DEMO

* ~~[Demo](./test/sample.html)~~
* [task 단위 테스트](./test/task.html) (디버깅 창 log 확인)
* ~~[매개변수 단위 테스트](./test/args.js)~~
* ~~[레이아웃 정렬](./test/layout.html)~~
* [드래그 앤 드랍](./task/드래그앤드랍)
* ~~[미디어 컨트롤](./task/미디어%20컨트롤) `ver 0.1.4`~~

# taskml 사용 방법

### 1. taskml 라이브러리 로드

```html
<!-- "/taskml" alias를 설정하고 모듈을 로드합니다.-->
<link rel="stylesheet" href="./dist/taskml/index-0.2.1.css">
<script type="importmap">{"imports":{"/taskml":"./dist/taskml/index-0.2.1.js"}}</script>
```

다음 방식으로 사용할 수도 있습니다.
```html
<!--app_importmap.js 파일에서 taskml 버전을 설정합니다.-->
<script src="./dist/taskml/app_importmap.js"></script>
```


### 2. template 작성
task 태그와 html 태그를 사용하여 template을 작성합니다. 

```html
<body>
    <!--template id 설정-->
    <template id="taskml">
        <task>
            <script>console.log('Hello~ ');</script>
        </task>
        <task id="클릭">
            <script>console.log('TaskML~!!');</script>
        </task>
        <button task:click="클릭">TaskML 실행</button>
    </template>

</body>
```

### 3. template 랜더링 호출

```html
<body>
    ...
    
    <script type="module">
        // 모듈 로드시 설정된 alias를 이용하여 모듈 메서드 호출
        import {createApp} from "/taskml";
        createApp('#app');
    </script>
    
    <!--template attr 생략해도 (기본값) #taskml 사용됨-->
    <div id="app" template="#taskml"></div>
</body>
```

### 4. template 파싱

> 0.2.0 버전부터 preload, include 기능으로 외부 taskml 파일을 불러올 수 있습니다.

#### template 파싱 순서

* DOM 및 inline script 태그가 순서대로 생성되고 실행 됩니다. (top-down)
* 도중에 `preload` task 구문을 만나면 해당 페이지 내용을 로드 & 파싱 완료 후 계속 진행합니다.
* 로드 과정에서 파싱된 순서대로 task 오버라이딩이 처리됩니다. (top-down)
* 모듈 script는 원래대로  DOM 생성이 완료된 후 실행됩니다.
* 외부 JS 파일을 로드하는 script 태그의 async, defer attribute 설정에 따른 실행 순서는 최대한 유지됩니다.

> taskml에서 "on"으로 시작되는 attribute은 모두 이벤트 핸들러를 위한 attribute으로 간주합니다.
> * 파싱되는 과정에서 핸들러는 등록되고 DOM atrtibute에서는 삭제될 수도 있습니다.

### 5. template 랜더링 시작

#### DOM 생성 (실행) 순서

1. DOM 요소가 top-down 순서로 생성되고 inline script도 이때 실행됩니다.
    - 중간에 `preload` 된 script가 있으면 `preload` 태그 위치에서 순서대로 함께 실행됩니다.
2. `domCreated` 이벤트가 발생합니다. (document custom 이벤트)
3. DOM 생성이 완료된 후 모듈 script가 로드 & 실행됩니다.
    - `preload`된 문서의 inline 모듈 script도 이때 실행됩니다.
4. `DOMContentLoaded` docuemnt 이벤트가 발생합니다.
5. `appCreated` 이벤트가 발생합니다. (document custom 이벤트)
6. 익명 Task가 자동으로 실행됩니다.
    - preload 문서의 익명 task도 DOM 구조(top-down) 순서대로 실행됩니다.
7. `include` 문서가 있으면 위 과정과 같은 순서로 파싱됩니다.

> 템플릿 내용은 최초 한번만 랜더링 됩니다.
> * task 컴포넌트, DOM 컴포넌트 태그는 `<template>` 태그 내에서만 사용할 수 있습니다.
> * 따라서 생성된 DOM에 `task:click` 같은 attribute을 동적으로 생성해 넣어도 동작하지 않습니다.

# taskml 구성 요소

taskml은 크게 두가지 구성요소로 구분됩니다.

* 인터렉션을 표현하는 `task` 컴포넌트 (시멘틱)
* 화면을 구성하는 DOM 컴포넌트

### task 컴포넌트 (hidden)

인터렉션을 표현(구현)하는 hidden 요소입니다.  
그중 `<task>` 태그는 여러 task 요소를 그룹화할 수 있습니다.  
나머지 task 태그들은 각각 특별한 기능을 구현하고 있습니다.

좀더 자세한 내용은 다음 링크를 참고하세요

- [`task` 인터페이스](./task/task%20인터페이스)
- [`<task>` 태그](./task/task%20태그)
- [`task` 인터페이스가 구현된 태그](./task/task%20내장%20객체)

### 글로벌 객체

`taskml`만으로 부족한 기능이 있다면 Javascript에서 템플릿에 정의된 `task` 객체에 접근할 수 있도록 글로벌 객체를 제공합니다.  
다음 글로벌 객체를 이용하여 기능을 필요한 기능을 확장할수 있습니다.

좀더 자세한 내용은 다음 링크를 참고하세요
- [글로벌 객체](./글로벌%20객체)

### DOM 컴포넌트 (visible)

화면에 보여지는 요소입니다.    
UI를 빠르게 구성할 수 있도록 HTML 태그에 몇가지 기능이 추가된 DOM 래퍼 객체입니다.

- ~~[DOM 컴포넌트](./DOM%20컴포넌트)~~
- ~~[컨테이너 태그](./component/컨테이너%20요소)~~
- ~~[컴포넌트 태그](./component/컴포넌트%20요소)~~

> 0.2.0 버전부터 화면을 구성하는 SolidJS DOM 컴포넌트는 지원하지 않습니다.  
> 0.1.x 버전의 SolidJS 컴포넌트 대신 `template`과 `customElements.define` 메서드를 사용하는 표준 custom element 구성 방법을 사용합니다.

- Custom Elements 사용하기