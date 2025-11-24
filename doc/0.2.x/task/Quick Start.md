# Quick Start

### Taskml 목적

미리 정의된 Tag와 최소한의 Javascript 만으로 인터렉션을 구현(표현)을 할 수 있는 방법을 제공한다.

* ~~화면 레이아웃을 쉽게 구성~~
    - ~~CSS에서 레이아웃 (위치, 크기) 작성 부분을 분리~~
    - ~~DOM attr에서 직접 위치 설정~~
    - ~~DOM attr에서 직접 레이아웃 설정~~

> 0.2.0 버전부터 화면을 구성하는 SolidJS DOM 컴포넌트는 지원하지 않습니다.  
> 0.1.x 버전의 SolidJS 컴포넌트 대신 `template`과 `customElements.define` 메서드를 사용하는 웹 표준 custom element 구성 방법을 사용합니다.

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

# taskml 사용 방법

### 1. taskml 라이브러리 로드

```html
<!-- "/taskml" alias를 설정하고 모듈을 로드합니다.-->
<link rel="stylesheet" href="./dist/taskml/index-0.2.x.css">
<script type="importmap">{"imports":{"/taskml":"./dist/taskml/index-0.2.x.js"}}</script>
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

taskML의 랜더링 과정이 궁금하면 다음 문서를 참고하세요
- [문서 로드와 실행 순서](../include/문서%20로드와%20실행%20순서)

## App Sample

다음 코드는 버튼을 클릭하면 이미지가 나타나는 동작을 하는 app입니다.  
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

> IDE의 live preview 등의 기능으로 서버를 통해 브라우저에서 열어 확인하세요

#### 서버 없는 (CORS 회피) 로컬 실행 환경

* `chrome.bat` 파일 실행 (chrome 브라우저 실행됨)
  ```bash
  # chrome.bat
  "C:\Program Files\Google\Chrome\Application\chrome.exe" \
  --disable-web-security --allow-file-access-from-files   \
  --user-data-dir=%LOCALAPPDATA%\Google\chromeTemp
  ```
* 실행된 크롬에서 `index.html` 파일을 열면 CORS 에러 없이 작업할 수 있음




















































