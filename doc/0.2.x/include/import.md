# 외부 파일 Import 기능

`preload`, `include` 두가지 방식으로 외부 HTML 파일을 불러올 수 있습니다.   
외부 HTML에는 template, task, DOM 등을 정의할 수 있습니다.

```html
<!--preload attribute-->
<task preload="${$inject.dirname}/unit/include/preload.html" 
      [selector="#script-include"] 
      [selector-is-dom]
      [shadowroot="open | closed"]></task>

<!--include tag-->
<task id="파일 불러오기">
    <include src="${$inject.dirname}/unit/include/include.html"
             [selector="#include-container"]
             [selector-is-dom]
             [shadowroot="open|closed"]></include>
</task>
```
두 구문은 실행되는 시점만 다를 뿐 로드 방식과 동작은 거의 같습니다.  

> 외부 파일 확장자는 `.html`을 사용합니다.  
> 일반 html 파일과 구별하기 위해 `.task.html`과 같이 사용하면 좋습니다.
> `.html` 확장자를 그대로 사용하는 이유는 IDE에서 Html 관련된 여러 기능을 지원받을 수 있기 때문입니다.

### selector

* selector는 외부 문서에 attach 할 DOM 요소가 있을때 사용함.
* attach 할 DOM 요소의 parent CSS selector 임.
* selector 기본값은 `#app` element 임.

> `<task preload="">` 구문을 `<task><include src=""></task>` 구문대신 사용하면 안됨   
> parent를 찾는 시점이 다르므로 주의해야 함

### shadowroot
(include 되는 DOM 요소가 있을때)
- shadowroot가 선언되어 있으면 shadow root 아래에 DOM이 생성됨
- shadowroot="open | closed". (기본값 open)
- `shadowrootmode` 이름을 차용한 것이지 template 의 `shadowrootmode` attr과는 무관함
- https://developer.chrome.com/docs/css-ui/declarative-shadow-dom?hl=ko#parser-only

## preload VS include

### preload

taskML 본문이 실행되기 전에 외부 파일에 미리 리소스를 정의해서 사용할때 유용합니다.
- 주된 문서 내용: `<template>`, `<task>`, web component 등의 정의
- 필요한 경우 attach 할 Html Dom도 작성 가능

예) 외부에서 quiz 관련 리소스만 미리 등록하고 싶을 때
```html
<task preload="./quiz.html"></task>
<div class="quiz-box" template="#quiz-item" template-data="window.quizData[0]"></div>
```
- `quiz.html` 안의 `<task>`, `<define ns="quiz">`, `<template id="quiz-item">` 등이 미리 등록
- 실제 DOM은 `.quiz-box`가 `template="#quiz-item"`로 빌드될 때 붙습니다

### include

preload와 기능적으로는 같지만 본문 실행 후 task에 의해 로드가 실행됩니다.  
주로 `정의`를 로드하는 것보다는 외부 문서에 작성된 DOM을 삽입하는데 유용합니다.
- 주된 문서 내용: attach 할 Html Dom
- 필요한 경우 `<template>`, `<task>`, web component 등의 정의

예) 외부 HTML 한 덩어리를 그대로 꽂고 싶을 때 (include)
```html
<include src="./page-section.html" selector="#content"></include>
<div id="content"></div>
```
- `page-section.html` 안의 일반 DOM들은 `#content`(또는 shadowRoot)에 그대로 붙고,
- 그 안에 정의된 `<task>`, `<template>`, `<define>` 등은 리소스로 함께 등록됩니다.

### 비교표

<table>
<tr>
<td></td>
<td>preload</td>
<td>include</td>
</tr>

<tr>
<td>형식</td>
<td>task attribute</td>
<td>task 구문</td>
</tr>

<tr>
<td>기능</td>
<td colspan="2">template, task, DOM 정의 가져와서 적용함</td>
</tr>

<tr>
<td>목적</td>
<td>미리 로드하여 내용을 task에서 사용</td>
<td>런타임에 동적으로 로드할때 사용</td>
</tr>

<tr>
<td>로드 실행</td>
<td>
<li>자동 실행되는 (first-run. DOM 생성 전단계) task 이전에 로드됨.</li>
<li>(DOM 파싱 할때 template 등이 미리 준비되어 있어야하기 때문)</li>
</td>
<td>
<li>taskml 파싱이 끝난 후 런탄임에 task 구문으로 실행됨.</li>
<li>task 실행 단계에서 로드되고 task 주기대로 동작함</li>
<li>DOM 생성된 후 실행됨</li>
<li>template을 include로 로드하면 template을 사용하는 task 보다 늦게 로드될수 있으므로 주의가 필요함</li>
</td>
</tr>

<tr>
<td>로드 완료</td>
<td>DOMContentLoaded 이벤트 이전에 로드됨</td>
<td>경우에 따라 다름</td>
</tr>

<tr>
<td>가져온 task 처리</td>
<td colspan="2">가져온 task 정의는 각 namespace에서 관리됨.
<br>(global) task 정의는 가져온 순서대로 같은 task에 의해 오버라이딩 될 수 있음.</td>
</tr>

<tr>
<td>가져온 DOM 처리</td>
<td colspan="2">taskml 파싱 완료 후 `selector`(parent)에 attach</td>
</tr>

<tr>
<td>가져온 script 처리</td>
<td colspan="2">HTML 실행시와 같이 `defer`, `async`, `module`에 따라 정해진 순서로 동적함</td>
</tr>

<tr>
<td>가져온 template</td>
<td colspan="2">HTML 문법에따라 template 사용 가능함</td>
</tr>

</table>

## 외부 HTML에 정의할 수있는 것들

HTML 문서 구조와 달리 `html`, `head`, `body` 태그 없이 바로 작성 가능합니다.

```html
<!--일반 HTML Element-->
<link rel="stylesheet" href="CSS 로드">
<style> ... </style>
<div>DOM 태그</div>

<!--인라인, 모듈 js-->
<script> ... </script>
<script src="..."></script>

<!--단순 task 정의-->
<task> ... </task>
<!--단순 template 정의-->
<template id=""> ... </template>

<!--scope 태그 안의 정보는 본문에 attach 됨-->
<scope id=""> ... </scope>

<!--define 태그 안의 정보는 데이터로 저장되고 본문에서 사라짐-->
<define ns="first-component"></define>

<!--사용자 컴포넌트 사용-->
<first-component useShadowRoot-="false"
                 template-="#a"
                 template-data="interactionList">
    <!--<slot></slot>-->
</first-component>
```

### 오버라이딩

- 여러 외부 문서를 불러오면 의도치 않게 같은 id를 가진 task 정의가 있을 수 있습니다.  
- 로드되는 순서에따라 중복된 task 정의는 덮어쓰기 (오버라이딩) 됩니다.   
- 의도하지 않은 오버라이딩을 피하기 위해 명시적으로 본문의 task 정의에 `override` attribute를 붙여주어야 합니다.
- [Task 오버라이딩](./rules/task_override)


### 로드된는 문서에서 경로 문제

로드되는 외부 파일 내에 모든 상대 경로는 최상위 include 하는 파일 (최초 include 구문이 있는 파일)의 위치를 기준으로 합니다.  
따라서 외부 파일에 상대 경로만으로 경로를 기술하면 본문(로드하는 문서)의 위치에 따라 실제 경로가 다르게 적용되는 문제가 발생합니다.

```html

<!--
본문/
  │── path/
      ├── to/
      │   ├── a.task.html
      │   ├── b.task.html
      ├── image/
      │   ├── bg.ppg
-->
<task preload="./path/to/a.task.html"></task>

<!--a.task.html 파일에서 b.task.html을 다시 로드-->
<task preload="./b.task.html"></task>

<!--
예상은 a.task.html 파일에서 b.task.html 파일을 상대 경로로 잘 찾아갈 것 같으나
a.task.html, b.task.html 파일의 기준 경로는 본문의 위치이므로 파일을 찾을 수 없습니다.
-->
```

이를 방지하기위해 항상 같은 위치를 상대 경로로 설정하려면 `${$inject.dirname}` 구문을 사용합니다.    
위 예에서 의도대로 파일 위치를 설정하려면 다음처럼 설정합니다.

```html
<!--a.task.html 파일-->

<!--${$inject.dirname} : 자기 자신의 문서 위치를 참조합니다.-->
<!--a.task.html 파일에서 b.task.html을 다시 로드-->
<task preload="${$inject.dirname}/b.task.html"></task>

<!--모든 경로에 동일하게 적용됩니다.-->
<style>
    .bg{
        /* 상대경로로 설정하려면 자기 자신의 문서 위치에서 부터 출발 */
        background-image: url("${$inject.dirname}/../image/bg.png");
    }
</style>
```

> 로드하는 문서가 체인처럼 연결된 경우 리소스 경로 추적이 매우 복잡해 집니다.  
> (예: 본문 preload > 로드 문서 preload > ... > 로드 문서 > ...)    
> taskML은 이런 상황까지 정교하게 테스트 되지 않았습니다.  
> 되도록이면 로드 작업은 1 ~ 2 Depth를 넘지 않는걸 권합니다.

```html
<!--외부문서 (b.task.html)-->
<template id="block" data-name="data">
    <task preload="${$inject.dirname}/c.task.html"></task>
    <link rel="stylesheet" href="${$inject.dirname}/unit/css/bg.css">
    <link rel="stylesheet" href="${$inject.dirname}/../css/li.css">
    <img class="size" src="${$inject.dirname}/asset/solid.svg">
    ...
</template>
```
