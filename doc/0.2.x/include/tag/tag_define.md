# define 태그

`<define>` 태그는 내부의 `<task>`, `<template>`, `<script>`, `<style>`를 독립된 네임스페이스로 묶어서 전역과 충돌하지 않게 쓰고, 재사용하기 쉽게 만드는 용도입니다.  
`<define>` 태그 안의 정보는 namespace 데이터로 저장되고 본문에 attach 되지는 않습니다.

```html
<define ns="namespace">
    <!--내부에 최상위 자식으로 다음 요소들만 사용 가능합니다.-->
    <!--UI DOM 요소는 무시됩니다.-->

    <link rel="stylesheet"> <!--(스타일 시트만)-->
    <style></style>
    <script> // HTML Script 태그임 (task의 node 아님) </script>
    <task></task>
    <template></template>
</define>
```

`<define>` 태그 안에서는 최상위로 다음 태그들만 허용됩니다.
- `<link rel="stylesheet">`
- `<style>`
- `<script>`
- `<task>`
- `<template>`

> `<scope>` 태그는 `<define>` 태그 내부에 사용할 수 없습니다.

외부 문서는 로드될때 자동으로 전역(global) 공간에 본문과 함께 관리됩니다.  
taskML 본문과 로드 가능한 외부 문서들은 많은 task 정의와 데이터를 담고 있습니다.

이런 요소들이 모두 전역(Global) 공간에서 관리된다면 이름 충돌에 의해 서로 재정의되는 문제는 불가피할 것입니다.  
문서 내에서 각각의 namespace 공간을 설정하게되면 복잡도는 한결 낮아집니다.

## namespace 사용 규칙

모든 task 아이디 표시 형식은 `네임스페이스:아이디` 패턴입니다.
- 자신의 namespace 범주에 속해 있으면 namespace는 생략 가능합니다. (예: 전역 범주에서는 `global` 생략 가능)
- `<define>` 태그는 새로운 namespace 범주를 생성합니다.
- `<define>` 태그에 `ns` 값이 없으면 임의의 문자열로 자동 설정됩니다.
- task 아이디 앞에 namespace가 없으면 자신의 namespace 범위에서 id를 찾은 후 없으면 `global` 범위에서 찾습니다.

namespace가 사용되는 곳은 다음과 같습니다.
- task 정의: `<task id="네임스페이스:아이디">`
- task 호출: `<task src="네임스페이스:아이디">`
- task 호출: `"task:click="네임스페이스:아이디"`
- task 호출: `$task['네임스페이스:아이디']()`

예를 들면,

`<define>` 태그 밖에서
- `<define>` 태그 밖에 정의된 `<task id="아이디">` 형식의 표기는 모두 `global`이 생략된 표기 입니다.
- 전역 공간에서 자신의 namespace는 생략할 수 있습니다. (`global`)

마찬가지로 `<define>` 태그 안에서
- `<define>` 태그 안에 정의된 `<task id="아이디">` 형식의 표기는 모두 자신의 namespace가 생략된 표기 입니다.
- `<define>` 태그 안에서 자신의 namespace는 생략할 수 있습니다.


## 사용 사례

예를 들면 사용자 컴포넌트 그룹이 있다고 가정하면,

비디오 컴포넌트
- 화면 컴포넌트
- 컨트롤러 컴포넌트
- 자막 컴포넌트

비디오 컴폰너트가 3개의 컴포넌트로 구성되어 있을때 서로 의존관계가 없는 각자의 독립된 context에서 기능을 구현하는 방법은 
각각의 컴포넌트를 `<define>` 태그로 감싸는 것입니다.
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

`<define ns="video">` 처럼 쓰면, 그 안의 리소스들이 `video` 라는 별도의 NS에 등록됩니다.  
(그리고 새로운 NS 안에 독립된 $task, $dom, $firstrun 등이 존재합니다.)  
즉, 한 HTML 안에 "작은 TaskML 앱"을 하나 더 넣는 느낌입니다.






















