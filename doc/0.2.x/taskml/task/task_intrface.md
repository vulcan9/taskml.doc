# task 인터페이스

`<task>` 태그는 `task` 인터페이스를 구현한 객체입니다.  
모든 task 아이템([내장 객체](./task_내장_객체)) 태그는 `task` 인터페이스를 구현합니다.  
모든 task 아이템([내장 객체](./task_내장_객체)) 태그는 화면에 보이지 않는 hidden 요소입니다.

역할에 따라 두가지로 구분할 수 있습니다.

* `<task>` 태그
    - 인터렉션에 의해 수행할 일련을 동작을 내부에 정의합니다.
    - 다른 `task 아이템`들을 그룹화합니다.
    - 내부에 `task 아이템`들의 실행 흐름(series, parallel)을 결정합니다.
    - `<task>` 태그도 하나의 `task 아이템`으로 사용될수 있숩니다. (중첩)

* `<task>` 태그 이외의 아이템 태그
    - 실제 기능이 구현된 태그입니다.
    - task 인터페이스를 구현합니다.
    - `<task>` 태그 내부에 기술됩니다.

기본 구조는 다음과 같습니다.

```html
<!--보이기를 실행하는 task 정의-->
<task id="task 아이디" sync="series">
    <show selector="Dom CSS 선택자"></show>
</task>
```

### task 호출(실행) 가능한 곳

정의된 task는 인터렉션에의해 호출됩니다.

* `on[event]` attribute (`$task` 전역 변수로 호출)
* `task:[event]` attribute (task 아이디 만으로 호출)
* `<task>` 내부 `src` attribute : (중첩된) task 내에서 import된 것처럼 실행됨
* JS 코드에서 직접 호출 (`$task` 전역 변수로 호출)

```html
<!--$task 전역 객체를 통해 호출-->
<button onclick="$task['task 아이디']()"></button>

<!--task 아이디로 바로 호출-->
<button task:click="task 아이디"></button>

<!--task 참조로 호출 (import)-->
<task src="task 아이디"></task>

<!--JS 코드에서 호출-->
<script>
    $task["task 아이디"]?.();
</script>
```






