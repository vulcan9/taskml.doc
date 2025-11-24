
# task 오버라이딩 (namespace)

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

## global namespace

외부 파일에 있더라도 `<define>` 태그로 감싸여져 있지 않으면 global namespace에 속합니다.

#### external.html
```html
<!-- 다음 재생 task는 global (ns)-->
<task id="재생">
    <script>console.log('global:재생'); $next();</script>
</task>
```

`external.html` 파일을 로드해서 사용할때
```html
<!--본문-->
<template id="taskml">
    <task preload="${$inject.dirname}/external.html"></task>
    <input type="button" value="재생" task:click="재생">
</template>
<!--출력: global:재생-->
```

task 오버라이딩하는 경우
```html
<!--본문-->
<template id="taskml">
    <task preload="${$inject.dirname}/external.html"></task>
    
    <!--override를 명시한 후 같은 id를 부여하여 재정의-->
    <task override id="재생">
        <script>console.log('global:재생 (재정의)'); $next();</script>
    </task>

    <!--출력: global:재생 (재정의)-->
    <input type="button" value="재생" task:click="재생">
</template>
```

재정의 되었지만 `external.html`의 "재생" task를 호출하고 싶은 경우
#### external.html 수정
```html
<!-- 다음 재생 task는 video (ns)-->
<define ns="video">
    <task id="재생">
        <script>console.log('video:재생'); $next();</script>
    </task>
</define>
```

```html
<!--본문-->
<template id="taskml">
    <task preload="${$inject.dirname}/external.html"></task>
    
    <!--override를 명시한 후 같은 id를 부여하여 재정의-->
    <task override id="재생">
        <script>console.log('global:재생 (재정의)'); $next();</script>
    </task>

    <!--출력: global:재생 (재정의)-->
    <input type="button" value="재생" task:click="재생">
    
    <!--출력: video:재생-->
    <input type="button" value="재생" task:click="video:재생">
</template>
```

namespace가 지정된 "재생" task를 재정의하고 싶은 경우

```html
<!--본문-->
<template id="taskml">
    <task preload="${$inject.dirname}/external.html"></task>
    
    <!--override를 명시한 후 같은 id를 부여하여 재정의-->
    <task override id="재생">
        <script>console.log('global:재생 (재정의)'); $next();</script>
    </task>

    <!--출력: 재생 (재정의)-->
    <input type="button" value="재생" task:click="재생">

    <task override id="video:재생">
        <script>console.log('video:재생 (재정의)'); $next();</script>
    </task>

    <!--출력: video:재생 (재정의)-->
    <input type="button" value="재생" task:click="video:재생">
</template>
```
