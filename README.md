# taskml

### 목적

미리 정의된 Tag와 최소한의 Javascript 만으로 인터렉션을 구현(표현)을 할 수 있는 방법을 제공한다.

* 화면 레이아웃을 쉽게 구성
    - CSS에서 레이아웃 (위치, 크기) 작성 부분을 분리
    - DOM attr에서 직접 위치 설정
    - DOM attr에서 직접 레이아웃 설정

* 디자인, 인터렉션 표현
    - `selector`에 종속되지 않는 컴포넌트 구성 요소
    - 디자인을 위한 `selector`는 작업자가 지정할 수 있도록 함
    - 템플릿에서 인터렉션 표현 방식을 제공

* 비동기 작업 흐름 제어
    - CSS에서 Animation (transition) 작업을 분리
    - 제어 로직은 재사용 가능하고 상태 파악(가독성)이 쉬워야함

### 특징

* HTML 방식으로 컨텐츠 내용과 비동기 실행되는 작업의 순서를 표현함
* 표현된 내용이 실제 DOM으로 랜더링 되어 동작함
* 인터렉션 표현은 일종의 task runner 역할을 함

## DEMO

* [Sample](https://vulcan9.github.io/taskml.doc/demo/sample.html)
* [사용 설명서](https://vulcan9.github.io/taskml.doc/)

---------------------

## Quick Start

다음 코드는 버튼을 클릭하면 이미지가 나타나는 동작을 하는 app입니다.

라이브러리 로드

```html

<script type="module" crossorigin src="index-0.1.0.js"></script>
<link rel="stylesheet" href="index-0.1.0.css">
```

템플릿 작성

```html
<!--document body-->

<template mode="dev media component">

    <!--로드될때 호출됨-->
    <as-task src="초기화면"></as-task>

    <!---------------------------
    인터렉션 요소
    --------------------------->

    <as-task id="초기화면">
        <!--hidden 요소 미리 감추기-->
        <hide selector=".img"></hide>
        <!--app 보이기-->
        <show selector="#app" from="{opacity: 0}" to="{duration: 1}"></show>
    </as-task>

    <as-task id="이미지 보이기">
        <show selector=".img"></show>
    </as-task>

    <!---------------------------
    HTML DOM 요소
    --------------------------->

    <img class="img">

    <!--클릭하면 "이미지 보이기 task가 실행됨"-->
    <div class="button" task:click="이미지 보이기"></div>

</template>

<!--템를릿이 랜더링되는 곳-->
<div id="app"></div>
```

### HTML 실행

#### 서버 없는 (CORS 회피) 로컬 실행 환경

* `chrome.bat` 파일 실행 (chrome 브라우저 실행됨)
  ```bash
  # chrome.bat
  "C:\Program Files\Google\Chrome\Application\chrome.exe" \
  --disable-web-security --allow-file-access-from-files   \
  --user-data-dir=%LOCALAPPDATA%\Google\chromeTemp
  ```
* 실행된 크롬에서 `index.html` 파일을 열면 CORS 에러 없이 작업할 수 있음

### 동작 방식

위에서 실행한 코드는 일반적인 HTML 문서와 두가지 다른점이 있습니다.

* 인터렉션에 의한 동작이 DOM에서 분리된 점
* 제작할때 Javascript가 사용되지 않고 동작이 구현된 점

taskml이 랜더링되기 까지

* HTML 페이지가 로드되면 template 태그에 작성된 taskml 구문을 파싱합니다.
* 화면을 구성하는 DOM Element를 생성하고 task에 작성된 인터렉션 내용을 연결합니다.
* 생성된 DOM Element를 랜더링합니다. template 내용은 소멸됩니다.
* 파싱과 랜더링은 처음 한번만 진행되고 이후에는 pure HTML 문서와 같습니다.

---------------------

## taskml 구성 요소

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

- [task 컴포넌트](https://vulcan9.github.io/taskml.doc/doc/task%20컴포넌트)
- [`<as-task>` 태그](https://vulcan9.github.io/taskml.doc/doc/task/as-task%20태그)
- [task 아이템 태그](https://vulcan9.github.io/taskml.doc/doc/task/task%20내장%20객체) (작성중)

### DOM 컴포넌트 (visible)

화면에 보여지는 요소입니다.    
UI를 빠르게 구성할 수 있도록 HTML 태그에 몇가지 기능이 추가된 DOM 래퍼 객체입니다.

- [DOM 컴포넌트](https://vulcan9.github.io/taskml.doc/doc/DOM%20컴포넌트)
- [컨테이너 태그](https://vulcan9.github.io/taskml.doc/doc/component/컨테이너%20요소)
- [컴포넌트 태그](https://vulcan9.github.io/taskml.doc/doc/component/컴포넌트%20요소)

### 글로벌 객체

`taskml`만으로 부족한 기능이 있다면 Javascript에서 템플릿에 정의된 `task` 객체에 접근할 수 있도록 글로벌 객체를 제공합니다.  
다음 글로벌 객체를 이용하여 기능을 필요한 기능을 확장할수 있습니다.

좀더 자세한 내용은 다음 링크를 참고하세요
- [글로벌 객체](https://vulcan9.github.io/taskml.doc/doc/task/글로벌%20객체)




















































