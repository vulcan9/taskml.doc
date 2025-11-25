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

## 외부 HTML(preload) 안에 컴포넌트/위젯 정의할 때

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

## 여러 문서에서 같은 id 의 task 를 써야 할 때

각 HTML에 `<task id="클릭">` 이 있어도
- `<define ns="a">`, `<define ns="b">` 로 나눠 등록하면,
- `a:클릭`, `b:클릭` 처럼 이름 충돌 없이 사용 가능

## 전역과 구분되는 `로컬 컨텍스트` 만들때

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
