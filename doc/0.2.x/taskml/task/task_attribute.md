# task Attribute 인터페이스

`<task>` 및 대부분의 task 아이템 태그에서 구현된 기능입니다.

## task interface

task 아이템의 이벤트를 등록할 수 있습니다.

```html
<!--task 이벤트 등록-->
<task onstart="JS 호출"
      onend="JS 호출"
      oncomplete="JS 호출"
      onerror="JS 호출"></task>

<task task:start="task 호출"
      task:end="task 호출"
      task:complete="task 호출"
      task:error="task 호출"></task>
```

개별 아이템에서 발생시키는 이벤트도 캐치할 수 있습니다.

```html
<!--이벤트 등록-->
<sound target="id" wait="ended"
       set="{속성 설정}" run="play()"
       onPlay="" task:play=""></sound>
```

## selector interface

DOM Element 대상이 필요한 task에서 사용됩니다.  
`selector=""` attribute 값은 표준 CSS Selector 표현과 같습니다.

- 콤마 구분자를 사용하여 여러 DOM 요소를 한꺼번에 참조할 수 있습니다.

```html
<addStyle selector="CSS Select 표현" styles="{}"></addStyle>
```

selector 값으로 이벤트를 발생시킨 DOM 객체를 참조할 수도 있습니다.
```html
<!-- selector-is-dom attribute을 함께 사용해야 합니다. -->
<addStyle selector="$args.event.target" selector-is-dom styles="{}"></addStyle>
```

## condition interface

조건식 결과에 따라 실행할 task를 결정할 수 있습니다

* if 판별식 false 인 경우 `else` task가 실행되고 본 task는 무시됩니다.
* if 판별식 true 인 경우 `then` task 실행 후 본 task가 진행됩니다.

```html
<task id="if 조건 테스트"
      if="($args[0] === 'then')"
      then="조건이 true일때 실행할 task 아이디"
      else="조건이 false일때 실행할 task 아이디">

    <task src="if then" if="($args[0] === 'then')"></task>
    <task src="if else" if="($args[0] === 'else')"></task>
    <sound if="($args[0] === 'else')"></sound>

</task>
```

비슷한 기능을 가진 `if-break` attribute이 있습니다.  
`if` attr을 사용하면 조건문 판별 후 바로 다음 task가 실행되는 반면,  
`if-break` attr은 조건문을 판별한 후 false 이면 task를 멈춥니다 (break).  
이후 break가 해제될때 판별식을 다시 검사합니다.

```html
<!--
4번 회전한 뒤 종료합니다.
if attr을 사용하면 1번 회전 후 task가 종료됩니다.
(조건식이 false 이므로 cancel task가 실행되지 않고 다음 task로 넘어가기 때문임)
-->
<task id="재귀">
    <script>
        if(!this.counter) this.counter = 0;
        this.counter += 10;
        $next();
    </script>
    <cancel if-break="$js.counter === 40" else="재귀"></cancel>
</task>
```

```html
<!--id를 함께 지정하면 break 해제 ID로 사용할 수 있습니다.-->
<task id="if-break 테스트">
    <cancel if-break="$js.value" id="if-break 멈춤"></cancel>
</task>

<!--버튼을 클릭하면 cancel task는 실행되지 않고 멈춤니다.-->
<button onclick="$js.value=false; $task['if-break 테스트']()">task 멈춤</button>

<!--breake를 해지했지만 판별식 결과가 false 이므로 다시 멈춥니다.-->
<button onclick="$break.release('if-break 멈춤')">task 다시 멈춤</button>

<!--판별식 결과가 true가 되었으므로 cancel이 실행되고 task가 종료됩니다.-->
<button onclick="$js.value=true; $task['if-break 테스트']()">cancel 실행됨</button>
```

## timer & delay interface

* `timer="0"` : (밀리세컨즈) task를 일정 시간 후 강제로 종료합니다  
  task 아이템에 적용되면 해당 task 종료 시간과 `timer="시간(ms)"` 설정 시간 중 더 짧은 시간에 종료합니다
    - task 기능이 중지되는 것이 아니라 다음 task를 진행하기 위해 종료(`end`) 이벤트를 발생시킵니다.
    - `<blank>` task에 사용하면 timer 시간 동안 delay 효과가 있음

* `delay="0"` : (밀리세컨즈) task를 일정 시간 후 시작합니다.

```html
<task id="시작" onend="console.log('종료')">
    <blank timer="1000"></blank>
</task>
<!--1초 후 "종료" 로그가 출력됩니다.-->

<task id="시작" onend="console.log('종료')">
    <sound id="sound1"
           set="{src:'/sound1.mp3'}"
           run="play()" wait="ended"
           timer="1000"></sound>
</task>
<!--
sound가 3초 길이라면 1초 후 종료 처리되고 0.5초 길이이면 0.5초에 sound task가 종료됨
-->

<task id="시작" onstart="console.log('재생')">
  <sound id="sound1"
         set="{src:'/sound1.mp3'}"
         run="play()" wait="ended"
         delay="1000"></sound>
</task>
<!--1초 후 재생됨 (start 이벤트 발생)-->
```
