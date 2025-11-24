# define 태그

`<define>` 태그는 내부의 `<task>`, `<template>`, `<script>`, `<style>`를 독립된 네임스페이스로 묶어서 전역과 충돌하지 않게 쓰고, 재사용하기 쉽게 만드는 용도입니다.  
`<define>` 태그 안의 정보는 namespace 데이터로 저장되고 본문에 attach 되지는 않습니다.

```html
<define>
  <!--내부에 최상위 자식으로 다음 요소들만 사용 가능합니다.-->
  <!--DOM 요소는 무시됩니다.-->
  
  <link rel="stylesheet"> <!--(스타일 시트만)-->
  <style></style>
  <task></task>
  <template></template>
  <script> // HTML Script 태그임 </script>
</define>
```

> `<scope>` 태그는 `<define>` 태그 내부에 사용할 수 없습니다.

외부 문서는 로드될때 자동으로 전역(global) 공간에 본문과 함께 관리됩니다.  
taskML 본문과 로드 가능한 외부 문서들은 많은 task 정의와 데이터를 담고 있습니다.    

이런 요소들이 모두 전역(Global) 공간에서 관리된다면 이름 충돌에 의해 서로 재정의되는 문제는 불가피할 것입니다.  
문서 내에서 각각의 namespace 공간을 설정하게되면 복잡도는 한결 낮아집니다.

- `global` namespace는 생략할 수 있습니다.
- `<define>` 태그 밖에 정의된 `<task id="아이디">` 형식의 표기는 모두 (생략된) `global` namespace 입니다.
- `<define>` 태그 안에 정의된 `<task id="아이디">` 형식의 표기는 모두 설정된 namespace에 속한 task 입니다.
- `<define>` 태그에 `ns` 값이 없으면 임의의 문자열로 자동 설정됩니다.
- 특정 namespace를 지정하려면 `<task id="namespace:아이디">` 형식으로 표기합니다.
- 특정 namespace를 지정하여 호출하려면 `namespace:아이디` 표기를 사용합니다.  
  - `<task src="namespace:아이디">`
  - `"task:click="namespace:아이디"`
  - `$task['namespace:아이디']()`

예를 들면 사용자 컴포넌트 그룹이 있다고 가정하면,

비디오 컴포넌트
 - 화면 컴포넌트
 - 컨트롤러 컴포넌트
 - 자막 컴포넌트

비디오 컴폰너트가 3개의 컴포넌트로 구성되어 있을때 서로 의존관계가 없는 각자의 독립된 context에서 기능을 구현하는 방법은 각각의 컴포넌트를 `<define>` 태그로 감싸는 것입니다.
`<define>` 태그로 감싼 내용을 각각의 파일로 분리해 놓으면 관리가 더욱 쉬워질 것입니다.

```html
<define ns="video">
    <!-- 
    독립적인 공간 (task / template / script / style) 
    -->
</define>

<define ns="display"> ... </define>
<define ns="subtitle"> ... </define>
```

`<define>` 태그 안에서는 최상위로 다음 태그들만 허용됩니다.
- `<task>`
- `<template>`
- `<script>`
- `<style>`
- `<link rel="stylesheet">`

`<define ns="video">` 처럼 쓰면, 그 안의 리소스들이 `video` 라는 별도의 NS에 등록됩니다.  
(그리고 새로운 NS 안에 독립된 $task, $dom, $firstrun 등이 존재합니다.)  
즉, 한 HTML 안에 "작은 TaskML 앱"을 하나 더 넣는 느낌입니다.

# namespace 사용 방법

namespace 범주에 속하지 않는 task는 `global` namespace에 포함됩니다.  
`global` namespace는 생략할 수 있습니다.

```html
<task id="재생">
    <script>console.error('재생 (global)'); $next();</script>
</task>
<input type="button" value="클릭" task:click="재생">
<!--또는-->
<input type="button" value="클릭" task:click="global:재생">
```

task 아이디 앞에 namespace 이름을 붙여주면 namespace 안의 task 목록을 검색합니다.

```html
<define ns="video">
    <task id="재생">
        <script>console.error('재생 (video)'); $next();</script>
    </task>
</define>
<input type="button" value="클릭" task:click="video:재생">
```
이렇게 하면 `재생` 아이디를 가진 두개의 task가 서로 충돌하지 않습니다.


## 활용 방법

### 외부 HTML(preload) 안에 컴포넌트/위젯 정의할 때

```html
<define ns="video">
  <template id="view"> ... </template>
  <style> ... </style>
  <task id="재생"> ... </task>
  <script> ... </script>
</define>
```
그리고 본문에서는

```html
<task preload="./video.html"></task>
```
이렇게 하면 퀴즈 컴포넌트용 task/template/style 이 한 덩어리로 묶여서 관리되고, 전역 task들과 이름이 겹쳐도 NS로 구분할 수 있습니다.

### 여러 문서에서 같은 id 의 task 를 써야 할 때

각 HTML에 `<task id="클릭">` 이 있어도 `<define ns="a">`, `<define ns="b">` 로 나눠 등록하면,  
`a:클릭`, `b:클릭` 처럼 이름 충돌 없이 사용 가능

### 전역과 구분되는 `로컬 컨텍스트` 만들때

```html
<define ns="video">
  <template id="view"> ... </template>
  <style> ... </style>
  <task id="재생"> ... </task>

  <!-- <define> 내부 (ns="video") -->
  <script>
    // ns 내부에서는 자신의 ns (video)를 생략 가능합니다.
    // 우선 자기 NS (video:재생)를 찾음
    
    $task['재생'](); // === $task['video:재생']
    
    // 전역 task를 호출하려면 명시적으로 global을 붙여줍니다.
    $task['global:재생']();
  </script>
</define>

<!-- <define> 외부 (ns="global") -->
<script>
  // 전역 공간에서에서는 자신의 ns (global)를 생략 가능합니다.
  // 우선 자기 NS (global:재생)를 찾음
  $task['재생'](); // === $task['global:재생']()
  
  // video ns의  task를 호출하려면 명시적으로 video을 붙여줍니다.
  $task['video:재생']();
</script>
```






