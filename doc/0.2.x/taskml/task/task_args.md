# 매개변수 전달 ($args)

task를 호출할때 매개변수를 포함하여 호출할 수 있습니다.  
다음은 매개변수로 전달된 내용을 alert으로 띠우는 예제입니다.

```html
<task id="시작" onstart="alert($args[0])"></task>

<!--버튼을 클릭하면 '사운드' alert이 뜹니다-->
<button task:click="시작('사운드')">시작</button>
```

전달된 매개변수는 task 내부 아이템에도 그대로 사용할 수 있습니다

```html
<task id="시작">
    <blank onstart="alert($args[0])"></blank>
</task>

<!--버튼을 클릭하면 '사운드' alert이 뜹니다-->
<button task:click="시작('사운드')">시작</button>
```

task 호출에 사용하면

```html
<task id="시작">
    <!--문자열 조합으로 "사운드 시작" task가 호출됨-->
    <task src="$args[0] 시작"></task>
</task>

<task id="사운드 시작">
    <!--$args가 그대로 전달되어 $args[1] 값을 얻습니다.-->
    <blank onstart="alert($args[1])"></blank>
</task>

<!--버튼을 클릭하면 'sound 경로.mp3' alert이 뜹니다-->
<button task:click="시작('사운드', 'sound 경로.mp3')">시작</button>
```

위에서는 task 아이디를 문자열 조합으로 호출했는데 새로운 매개변수로 호출하고 싶을 수도 있습니다.

```html
<task id="시작">
    <!--문자열 조합으로 "사운드 시작" task가 호출됨-->
    <!--새로운 매개변수로 전달됨-->
    <task src="$args[0] 시작 ($args[1])"></task>
</task>

<task id="사운드 시작">
    <!--새로운 $args가 전달되어 $args[0] 값을 얻습니다.-->
    <blank onstart="alert($args[0])"></blank>
</task>

<!--버튼을 클릭하면 'sound 경로.mp3' alert이 뜹니다-->
<button task:click="시작('사운드', 'sound 경로.mp3')">시작</button>
```

여기에서 주의할 점은 `$args[0] 시작 ($args[1])` 부분에서 새로운 매개변수가 전달된다는 점입니다.    
차이점은 다음과 같습니다.

```html
<!--task 아이디만으로 호출하는 경우-->
<task src="$args[0] 시작"></task>
<!--"사운드 시작" task에 기존 $args 값이 그대로 전달됨-->

<!--task 아이디를 실행 연산자로 호출하는 경우-->
<task src="$args[0] 시작 ()"></task>
<task src="$args[0] 시작 ($args[1])"></task>
<task src="$args[0] 시작 ('문자', 10, {a: 'a'}, ...)"></task>
<task src="$args[0] 시작 (new Date(), ()=>'함수', ...)"></task>
<!--"사운드 시작" task에 새로운 $args 값이 전달됨-->
```

`$args` 매개변수 객체는 전달된 매개변수 이외에 특별한 데이터를 가집니다.

## $args.event

이벤트를 참조합니다. 이 값으로 이벤트를 발생시킨 DOM 객체를 추적할 수 있습니다.
```html
<task id="클릭">
  <addStyle selector="$args.event.target" selector-is-dom styles="{}"></addStyle>
</task>

<div task:click="클릭"></div>
<!--
$args.event는 클릭 이벤트 객체를,
$args.event.target은 클릭한 div 객체를 참조합니다.
-->
```

### `$args.event[dataset attribute 이름]`

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


