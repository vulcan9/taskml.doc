# Quick Start

### Taskml 목적

미리 정의된 Tag와 최소한의 Javascript 만으로 인터렉션을 구현(표현)을 할 수 있는 방법을 제공한다.

* ~~화면 레이아웃을 쉽게 구성~~
    - ~~CSS에서 레이아웃 (위치, 크기) 작성 부분을 분리~~
    - ~~DOM attr에서 직접 위치 설정~~
    - ~~DOM attr에서 직접 레이아웃 설정~~

> 0.2.0 버전부터 화면을 구성하는 SolidJS DOM 컴포넌트는 지원하지 않습니다.  
> 0.1.x 버전의 SolidJS 컴포넌트 대신 `template`과 `customElements.define` 메서드를 사용하는 표준 custom element 구성 방법을 사용합니다.

* 디자인, 인터렉션 표현
    - `selector`에 종속되지 않는 컴포넌트 구성 요소
    - 디자인을 위한 `selector`는 작업자가 지정할 수 있도록 함
    - 템플릿에서 인터렉션 표현 방식을 제공

* 비동기 작업 흐름 제어
    - CSS에서 Animation (transition) 작업을 분리
    - 제어 로직은 재사용 가능하고 상태 파악(가독성)이 쉬워야함

### Taskml 특징

* HTML 방식으로 컨텐츠 내용과 비동기 실행되는 작업의 순서를 표현함
* 표현된 내용이 실제 DOM으로 랜더링 되어 동작함
* 인터렉션 표현은 일종의 task runner 역할을 함

## Quick Start

다음 코드는 버튼을 클릭하면 이미지가 나타나는 동작을 하는 app입니다.

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
<!--mode attriibute을 설정하면 콘솔창에 로그가 표시됩니다.-->
<template id="taskml" mode="dev media component">

    <!--id가 없는 task는 로드(파싱) 완료 후 자동 실행됩니다.-->
    <task src="초기화면"></task>

    <!---------------------------
    인터렉션 요소
    --------------------------->

    <task id="초기화면">
        <!--hidden 요소 미리 감추기-->
        <hide selector=".img"></hide>
        <!--app 보이기-->
        <show selector="#app" from="{opacity: 0}" to="{duration: 1}"></show>
    </task>

    <task id="이미지 보이기">
        <show selector=".img"></show>
    </task>

    <!---------------------------
    HTML DOM 요소
    --------------------------->

    <img class="img">

    <!--클릭하면 "이미지 보이기" task가 실행됨-->
    <div class="button" task:click="이미지 보이기"></div>

</template>

<!--템를릿이 랜더링되는 곳-->
<!--<div id="app"></div>-->
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

#### 서버 없는 (CORS 회피) 로컬 실행 환경

* `chrome.bat` 파일 실행 (chrome 브라우저 실행됨)
  ```bash
  # chrome.bat
  "C:\Program Files\Google\Chrome\Application\chrome.exe" \
  --disable-web-security --allow-file-access-from-files   \
  --user-data-dir=%LOCALAPPDATA%\Google\chromeTemp
  ```
* 실행된 크롬에서 `index.html` 파일을 열면 CORS 에러 없이 작업할 수 있음

## 랜더링 과정

### 1. template 파싱

template 랜더링이 호출되면 내부적으로 다음 순서에 따라 화면을 랜더링 합니다.

> * taskml에서 "on"으로 시작되는 attribute은 모두 이벤트 핸들러를 위한 attribute으로 간주합니다.
> * 파싱되는 과정에서 핸들러는 등록되고 DOM atrtibute에서는 삭제될 수도 있습니다.  
> * 0.2.0 버전부터 `preload`, `include` task 기능으로 외부 taskml 파일을 불러올 수 있습니다.

#### template 파싱 규칙

* DOM 및 inline script 태그가 순서대로 생성되고 실행 됩니다. (top-down)
* 도중에 `preload` task 구문을 만나면 해당 페이지 내용을 로드 & 파싱 완료 후 계속 진행합니다.
* 로드 과정에서 파싱된 순서대로 task 오버라이딩이 처리됩니다. (top-down)
* 모듈 script는 원래대로 DOM 생성이 완료된 후 실행됩니다.
* 외부 JS 파일을 로드하는 script 태그의 async, defer attribute 설정에 따른 실행 순서는 최대한 유지됩니다.

### 2. template 랜더링 시작

템플릿 내용은 최초 한번만 랜더링 됩니다.
> * task 컴포넌트, DOM 컴포넌트 태그는 `<template>` 태그 내에서만 사용할 수 있습니다.
> * 따라서 생성된 DOM에 `task:click` 같은 attribute을 동적으로 생성해 넣어도 동작하지 않습니다.

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





















































