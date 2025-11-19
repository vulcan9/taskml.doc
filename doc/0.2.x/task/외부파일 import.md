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

<!--
-->
```
두 구문은 실행되는 시점만 다를 뿐 로드 방식과 동작은 거의 같습니다.  

### selector

* selector는 DOM 요소가 없으면 필요 없음.
* DOM 요소의 parent CSS selector 임.
* selector 기본값은 app element 임.

> `<task preload="">` 구문을 `<task><include src=""></task>` 구문대신 사용하면 안됨   
> parent를 찾는 시점이 다르므로 주의해야 함

### shadowroot
(include 되는 DOM 요소가 있을때)
- shadowroot가 선언되어 있으면 shadow root 아래에 DOM이 생성됨
- shadowroot="open | closed". (기본값 open)
- `shadowrootmode` 이름을 차용한 것이지 template 의 `shadowrootmode` attr과는 무관함
- https://developer.chrome.com/docs/css-ui/declarative-shadow-dom?hl=ko#parser-only

## preload VS include

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

### script

```html
<script>
    console.log('[스크립트 실행]: /test/unit/script/script.html');
    console.log('[$inject]:', $inject);
</script>

<script type="module">
    console.log('[모듈 스크립트 실행]: /test/unit/script/script.html');
    console.log('[$inject]:', $inject);
</script>

```

### template

### DOM

### task




오버라이딩

제약사항

지원 기능



## 실행 순서

DOM, script, template















