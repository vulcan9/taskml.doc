# task 컴포넌트

task 아이템(`tag`)은 인터렉션을 구현한 객체입니다.  
모든 task 태그는 task 인터페이스를 구현합니다.  
모든 task 태그는 화면에 보이지 않는 hidden 요소입니다.

역할에 따라 두가지로 구분할 수 있습니다.

* `<as-task>` 태그
    - 인터렉션에 의해 수행할 일련을 동작을 내부에 정의합니다.
    - 다른 `task 아이템`들을 그룹화합니다.
    - 내부에 `task 아이템`들의 실행 흐름(series, parallel)을 결정합니다.
    - `<as-task>` 태그도 하나의 `task 아이템`으로 사용될수 있숩니다. (중첩)

* `<as-task>` 태그 이외의 아이템 태그
    - 실제 기능이 구현된 태그입니다.
    - task 인터페이스를 구현합니다.
    - `<as-task>` 태그 내부에 기술됩니다.

기본 구조는 다음과 같습니다.

```html
<!--보이기를 실행하는 task 정의-->
<as-task id="task 아이디" sync="series">
    <show selector="Dom CSS 선택자"></show>
</as-task>
```

### task 호출(실행) 가능한 곳

정의된 task는 인터렉션에의해 호출됩니다.

* `on[event]` attribute (`$task` 전역 변수로 호출)
* `task:[event]` attribute (task 아이디 만으로 호출)
* `<as-task>` 내부 `src` attribute : (중첩된) task 내에서 import된 것처럼 실행됨
* JS 코드에서 직접 호출 (`$task` 전역 변수로 호출)

```html
<!--$task 전역 객체를 통해 호출-->
<button onclick="$task['task 아이디']()"></button>

<!--task 아이디로 바로 호출-->
<button task:click="task 아이디"></button>

<!--task 참조로 호출 (import)-->
<as-task src="task 아이디"></as-task>

<!--JS 코드에서 호출-->
<script>
    $task["task 아이디"]?.();
</script>
```

## task 구성 요소의 Life cycle

### task 이벤트 주기

task 아이템은 공통된 생명 주기를 가집니다.  
이때 발생하는 이벤트를 이용하여 task 실행의 흐름을 제어합니다.

주된 이벤트는 다음과 같습니다.

```html
<!--task에서 발생되는 이벤트-->
<as-task onstart="alert('start')"
         onstartafter="alert('startAfter')"
         onrun="alert('run')"
         onendBefore="alert('endBefore')"
         onend="alert('end')"
         oncomplete="alert('complete')"
         oncancel="alert('cancel')"
         onerror="alert('error')"></as-task>
```

### `cancel` 이벤트 vs `error` 이벤트

* `cancel` 이벤트
    - `<cancel>` task에 의해 의도적으로 작업이 중지되었을 때에만 호출됩니다.

* `error` 이벤트
    - 의도하지 않은 에러 발생으로 작업이 중단된 경우 발생합니다.

두 이벤트가 발생하면 이후 task는 중지됩니다.

### `end` 이벤트 vs `complete` 이벤트

* `end` 이벤트
    - 해당 task가 종료되는 시점으로 간주됩니다.
    - `series`로 task가 진행되는 경우 `end` 이벤트 이후에 다음 task가 진행됩니다.

* `complete` 이벤트
    - task 요소에 등록된 이벤트에 의해 다른 task가 실행중이면 이 task까지 모두 종료되었을때 발생합니다.
    - task 종료 시점이 `end` 이벤트를 따르므로 `complete` 이벤트에 의해 실행되는 task는 호출한 task의 이벤트 주기에 영향을 주지 않습니다.
      ```html
      <as-task id="시작" 
          task:start="외부 실행 1" 
          task:end="외부 실행 2"
          task:complete="외부 실행 3">
          <as-task id="내부 실행">...</as-task>
      </as-task>
      <as-task task:start="외부 실행 1">...</as-task>
      <as-task task:start="외부 실행 2">...</as-task>
      <as-task task:start="외부 실행 3">...</as-task>
      <!--
      "시작" task의 end 시점은 
      "내부 실행", "외부 실행 1" task가 모두 종료(end)된 시점임
      
      "시작" task의 complete 시점은 
      "내부 실행", 및 "외부 실행 1" , "외부 실행 2" task가 모두 종료(end)된 시점임
      
      "외부 실행 3" task는 "시작" task의 이벤트 주기에 영향을 주지 않음
      -->  
      ``` 

### 이벤트 실행 순서

같은 이벤트가 등록된 경우 실행순서는 다음과 같습니다.

```html
<!--
1. 태그에서 정의된 이벤트 on[event]="" attribute 내용이 실행됩니다.
2. 태그에서 정의된 이벤트 task:[event]="" attribute 내용이 실행됩니다.
-->
<as-task onstart="alert('start')"
         task:start="task 아이디"></as-task>
```

### task 이벤트 구문

위에서 이벤트를 두가지 방법으로 등록하고 있습니다.  
차이점은 다음과 같습니다

- `on[event]=""` 구문은 JS 코드를 호출합니다.
- `task:[event]=""` 구문은 task 실행을 호출합니다.

```html
<!--on[event]="" 구문은 JS context에서 실행되는 코드 입니다.-->
<as-task onstart="alert('start')"></as-task>

<!--task:[event]="" 구문은 "task 아이디"에 해당하sms task를 실행시킵니다.-->
<as-task task:start="task 아이디"></as-task>
```

### 매개변수 전달 ($args)

task를 호출할때 매개변수를 포함하여 호출할 수 있습니다.  
다음은 매개변수로 전달된 내용을 alert으로 띠우는 예제입니다.

```html

<as-task id="시작" onstart="alert($args[0])"></as-task>

<!--버튼을 클릭하면 '사운드' alert이 뜹니다-->
<button task:click="시작('사운드')">시작</button>
```

전달된 매개변수는 task 내부 아이템에도 그대로 사용할 수 있습니다

```html

<as-task id="시작">
    <blank onstart="alert($args[0])"></blank>
</as-task>

<!--버튼을 클릭하면 '사운드' alert이 뜹니다-->
<button task:click="시작('사운드')">시작</button>
```

task 호출에 사용하면

```html

<as-task id="시작">
    <!--문자열 조합으로 "사운드 시작" task가 호출됨-->
    <as-task src="$args[0] 시작"></as-task>
</as-task>

<as-task id="사운드 시작">
    <!--$args가 그대로 전달되어 $args[1] 값을 얻습니다.-->
    <blank onstart="alert($args[1])"></blank>
</as-task>

<!--버튼을 클릭하면 'sound 경로.mp3' alert이 뜹니다-->
<button task:click="시작('사운드', 'sound 경로.mp3')">시작</button>
```

위에서는 task 아이디를 문자열 조합으로 호출했는데 새로운 매개변수로 호출하고 싶을 수도 있습니다.

```html

<as-task id="시작">
    <!--문자열 조합으로 "사운드 시작" task가 호출됨-->
    <!--새로운 매개변수로 전달됨-->
    <as-task src="$args[0] 시작 ($args[1])"></as-task>
</as-task>

<as-task id="사운드 시작">
    <!--새로운 $args가 전달되어 $args[0] 값을 얻습니다.-->
    <blank onstart="alert($args[0])"></blank>
</as-task>

<!--버튼을 클릭하면 'sound 경로.mp3' alert이 뜹니다-->
<button task:click="시작('사운드', 'sound 경로.mp3')">시작</button>
```

여기에서 주의할 점은 `$args[0] 시작 ($args[1])` 부분에서 새로운 매개변수가 전달된다는 점입니다.    
차이점은 다음과 같습니다.

```html
<!--task 아이디만으로 호출하는 경우-->
<as-task src="$args[0] 시작"></as-task>
<!--"사운드 시작" task에 기존 $args 값이 그대로 전달됨-->

<!--task 아이디를 실행 연산자로 호출하는 경우-->
<as-task src="$args[0] 시작 ()"></as-task>
<as-task src="$args[0] 시작 ($args[1])"></as-task>
<as-task src="$args[0] 시작 ('문자', 10, {a: 'a'}, ...)"></as-task>
<as-task src="$args[0] 시작 (new Date(), ()=>'함수', ...)"></as-task>
<!--"사운드 시작" task에 새로운 $args 값이 전달됨-->
```

`$args` 매개변수 객체는 전달된 매개변수 이외에 특별한 데이터를 가집니다.

### `$args.event`

이벤트를 참조합니다. 이 값으로 이벤트를 발생시킨 DOM 객체를 추적할 수 있습니다.
```html
<as-task id="클릭">
  <addStyle selector="$args.event.target" selector-is-dom styles="{}"></addStyle>
</as-task>

<div task:click="클릭"></div>
<!--
$args.event는 클릭 이벤트 객체를,
$args.event.target은 클릭한 div 객체를 참조합니다.
-->
```

### `$args.event[dataset attribute 파싱 배열]`

전달되는 event 객체에 taget Element에 작성된 `data-` dataset attribute 내용을 배열로 파싱해 전달합니다.  
```html
<div task:click="클릭" data-sound-src="a, b, c"></div>
<!--
data-sound-src 이름으로 a, b, c 값이 설정되어있으면 이를 파싱하여 배열로 저장합니다.

$args 매개변수 객쳉서는 다음과 같이 값에 접근할 수 있습니다.
<blank onstart="console.log($args.event.soundSrc)"></blank>
// soundSrc 값은 ['a', 'b', 'c'] 입니다.
-->

<div task:click="클릭" data-sound-src="a"></div>
<!--
하나의 값을 전달 하더라도 배열로 저장됩니다.
// soundSrc 값은 ['a'] 입니다.
-->
```

## task Attribute

`<as-task>` 및 대부분의 task 아이템 태그에서 구현된 기능입니다.

### condition interface

조건식 결과에 따라 실행할 task를 결정할 수 있습니다

* if 판별식 false 인 경우 `else` task가 실행되고 본 task는 무시됩니다.
* if 판별식 true 인 경우 `then` task 실행 후 본 task가 진행됩니다.

```html

<as-task id="if 조건 테스트"
         if="($args[0] === 'then')"
         then="조건이 true일때 실행할 task 아이디"
         else="조건이 false일때 실행할 task 아이디">

    <as-task src="if then" if="($args[0] === 'then')"></as-task>
    <as-task src="if else" if="($args[0] === 'else')"></as-task>
    <sound if="($args[0] === 'else')"></sound>

</as-task>
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
<as-task id="재귀">
    <js><!--<![ CDATA [
            if(!this.counter) this.counter = 0;
            this.counter += 10;
            $next();
            //]]>--></js>
    <cancel if-break="$js.counter === 40" else="재귀"></cancel>
</as-task>
```

```html
<!--id를 함께 지정하면 break 해제 ID로 사용할 수 있습니다.-->
<as-task id="if-break 테스트">
    <cancel if-break="$js.value" id="if-break 멈춤"></cancel>
</as-task>

<!--버튼을 클릭하면 cancel task는 실행되지 않고 멈춤니다.-->
<button onclick="$js.value=false; $task['if-break 테스트']()">task 멈춤</button>

<!--breake를 해지했지만 판별식 결과가 false 이므로 다시 멈춥니다.-->
<button onclick="$break.release('if-break 멈춤')">task 다시 멈춤</button>

<!--판별식 결과가 true가 되었으므로 cancel이 실행되고 task가 종료됩니다.-->
<button onclick="$js.value=true; $task['if-break 테스트']()">cancel 실행됨</button>
```

### timer & delay interface

* `timer="0"` : (밀리세컨즈) task를 일정 시간 후 강제로 종료합니다  
task 아이템에 적용되면 해당 task 종료 시간과 `timer="시간(ms)"` 설정 시간 중 더 짧은 시간에 종료합니다
  - task 기능이 중지되는 것이 아니라 다음 task를 진행하기 위해 종료(`end`) 이벤트를 발생시킵니다.
  - `<blank>` task에 사용하면 timer 시간 동안 delay 효과가 있음

* `delay="0"` : (밀리세컨즈) task를 일정 시간 후 시작합니다.

```html

<as-task id="시작" onend="console.log('종료')">
    <blank timer="1000"></blank>
</as-task>
<!--1초 후 "종료" 로그가 출력됩니다.-->

<as-task id="시작" onend="console.log('종료')">
    <sound id="sound1"
           set="{src:'/sound1.mp3'}"
           run="play()" wait="ended"
           timer="1000"></sound>
</as-task>
<!--
sound가 3초 길이라면 1초 후 종료 처리되고 0.5초 길이이면 0.5초에 sound task가 종료됨
-->

<as-task id="시작" onstart="console.log('재생')">
  <sound id="sound1"
         set="{src:'/sound1.mp3'}"
         run="play()" wait="ended"
         delay="1000"></sound>
</as-task>
<!--1초 후 재생됨 (start 이벤트 발생)-->
```

### selector interface

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



### task interface

task 아이템의 이벤트를 등록할 수 있습니다.

```html
<!--task 이벤트 등록-->
<as-task onstart="JS 호출"
         onend="JS 호출"
         oncomplete="JS 호출"
         onerror="JS 호출"></as-task>

<as-task task:start="task 호출"
         task:end="task 호출"
         task:complete="task 호출"
         task:error="task 호출"></as-task>
```

개별 아이템에서 발생시키는 이벤트도 캐치할 수 있습니다.

```html
<!--이벤트 등록-->
<sound target="id" wait="ended"
       set="{속성 설정}" run="play()"
       onPlay="" task:play=""></sound>
```



