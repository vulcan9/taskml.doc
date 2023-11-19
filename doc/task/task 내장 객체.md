# Task 내장 객체

미리 구현된 task 객체를 `<as-task>` 태그에 Child 노드로 추가할 수 있습니다.  
task 객체는 기능별로 task 인터페이스를 구현한 객체입니다.

> `<as-task>` 태그 안에서 사용할 수 있습니다.

#### 흐름 제어

`<as-task>`, `<break>`, `<break-release>`, `<cancel>`, `<exit>`

#### Dom 상태 변경

`<addClass>`, `<removeClass>`, `<addAttr>`, `<removeAttr>`, `<addStyle>`, `<RemoveStyle>`

- shorthand `<disable>`, `<enable>`

#### 연산

`<blank>`, `<js>`

- shorthand (준비중) `<let>`, `<compare>`, `<increase>`, `<decrease>`

#### 사운드

`<sound>`

- shorthand (준비중) `<sound-play>`, `<sound-stop>`, `<sound-pause>`

#### 에니메이션

`<tween>`

- shorthand `<hide>`, `<show>`

#### 페이지 이동

(준비중) `<page>`

- shorthand (준비중) `<page-prev>`, `<page-next>`

--------------------------------------------------------------

## 흐름 제어 (control)

### `<as-task>`

`<as-task>`에 대한 자세한 내용은 다음 링크를 참고하세요

* [`<as-task>` 태그](./as-task%20태그)

```html

<as-task id="task 아이디"
         [sync="series (default) | parallel" ]
         [src="" ]>

    <!--child task 아이템 태그 (=task)-->

</as-task>
```

`id="task 아이디"`

* task 목록에 등록되는 고유 아이디입니다.
* 한글, 띄어쓰기등은 허용되나 괄호는 허용되지 않습니다.

`sync="series (default) | parallel"`

* series (기본값)
    - 내부 task 목록을 첫번째 목록부터 하나씩 실행합니다.
    - `end` 이벤트가 발생하면 다음 task를 실행합니다.
    - 목록의 마지막 task의 `end` 이벤트가 발생되는 시점이 부모 task가 완료(`end`)되는 시점입니다.

* parallel
    - 내부 task 목록을 첫번째 목록부터 하나씩 실행합니다.
    - `end` 이벤트가 발생하기를 기다리지 않고 바로 다음 task를 실행합니다.
    - 동시에 실행되는 것처럼 보입니다.
    - 내부 task 중에서 가장 마지막에 `end` 이벤트가 발생되는 시점이 부모 task가 완료(`end`)되는 시점입니다.

`src="task 아이디"`
이미 정의된 task를 해당 위치에 import 시키는 역할을 합니다.  
import한 task가 다른 task를 참조(src)하는 경우 원본을 찾아 import 합니다.

### `<break>`

`<break>` task 실행 위치에서 task 진행을 멈춥니다  
`timer, if` 등의 attribute과 함께 사용하여 break 지점을 해제하고 다시 task를 진행시킬 수 있습니다.

```html

<as-task>
    <break id="break 아이디"></break>
    <as-task>
```

`id="break 아이디"`

* 지정된 `id`는 break 상태를 해지할때 사용됩니다.

다음음 break를 사용하는 다양한 방법입니다.

```html
<!--1초뒤 break가 해제되고 task가 다시 진행됩니다.-->
<break id="break 아이디" timer="1000"></break>

<!--if 조건이 true 일때만 break 가 동작합니다.-->
<break id="break 아이디" if="$args[0]"></break>
```

JS에서도 해제할 수 있습니다.

```javascript
// onclick="$break.release('break 아이디');"
$break.release('break 아이디');
```

### `<break-release>`

위에서 설정된 break를 해제하는 task 입니다.

```html

<as-task>
    <break-release id="break 아이디"></break>
</as-task>
```

`id="break 아이디"`

* 지정된 `id`는 break task에서 설정된 아이디 입니다.
* 해당 아이디의 break 지점을 해제합니다.

```html

<as-task>
    ...
    <break-release id="break 아이디"></break>
        ...
</as-task>

<as-task id="release break">
    <break-release id="break id"></break-release>
</as-task>

<!--
// "release break" task 호출로 break를 해지
... task:click="release break"
-->
```

### `<cancel>`

`<cancel>` task가 호출되면 이후 task는 실행하지 않고 모든 task를 취소합니다.

* 중첩된 task 안에서 호출되면 부모 task 까지 전파되어 이후 작업을 취소합니다.
* 이때 부모 task의 `end`, `complete`이벤트도 발생하지 않고 대신 `cancel` 이벤트가 발생합니다.

```html

<cancel></cancel>
```

* `if` attribute과 사용할때 조건이 true 이면 즉시 작업이 취소됩니다.
* `if-break` attribute과 함께 사용하면 조건식이 true가 될때까지 기다린 후 취소 작업을 진행시킬 수 있습니다.

```html
<!--4번 실행한 뒤 취소됩니다.-->
<as-task id="재귀" oncancel="alert('취소')">
    <js><!--<![ CDATA [
            if(!this.counter) this.counter = 0;
            this.counter += 10;
            $next();
            //]]>--></js>
    <cancel if-break="$js.counter === 40" else="재귀"></cancel>

    <!--
    조건이 true이면 cancel이 진행되고, false 이면 멈추기 (break) 때문에 
    다음 blank task는 항상 실행되지 않습니다.
    -->
    <blank onstart="alert('도달하지 않는 task')"></blank>
</as-task>
```

이때 `if-break` 대신 `if` attr을 사용하면 1번 실행 후 task가 종료됩니다.  
(조건식이 false 이므로 cancel task가 실행되지 않고 다음 task로 넘어가기 때문임)

### `<exit>`

* `<cancel>` task와 같이 task를 종료합니다. 다만 자신이 속한 `<as-task>`만 종료합니다.
* `cancel` 이벤트가 발생하지 않고 `end` 이벤트가 발생합니다.

```html

<exit></exit>
```

중첩된 task 구문에서 `<cancel>` task와 차이가 확실해 집니다.

```html

<!--자동 실행됨-->
<as-task onend="alert('종료')" oncancel="alert('취소')">
    <blank timer="1000"></blank>
    <as-task src="exit 중첩"></as-task>
    <blank timer="1000" onstart="alert('exit 실행')"></blank>
</as-task>

<!--exit는 자신의 task 만 빠져나감-->
<as-task id="exit 중첩">
    <blank timer="1000"></blank>

    <!--exit를 호출함-->
    <exit if-break="$js.value" else="exit 중첩"></exit>

    <blank timer="1000" onstart="alert('도달하지 않는 task')"></blank>
</as-task>

<!--
버튼을 클릭하면 $js.value 값이 true가 되어 exit task가 실행됩니다.
이때 자신의 task 영역만 빠져나가므로 "exit 실행" alert 창이 뜨고 이어서 "종료" 창이 뜨게됩니다.
-->
<button task:click="$js.value=true; $task['exit 중첩']()">"exit 중첩" task만 종료됨</button>
```

`<exit>` task 대신 `<cancel>` task를 실행한다면 "취소" alert 창만 뜹니다.

## Dom 상태 변경 (dom)

class, attribute, style 추가/제거

- 기본적으로 즉시 실행됨
- 때문에 start, end 이벤트가 바로 (연달아) 발생되나,
- selector의 transition 설정에 따라 실제 종료 시점은 달라질 수 있음

### `<addClass>`

### `<removeClass>`

### `<addAttr>`

### `<removeAttr>`

### `<addStyle>`

### `<RemoveStyle>`

### `<disable>`

### `<enable>`

## 연산 (operation)

[//]: # (* `<blank>`, `<js>`)

[//]: # (* shorthand &#40;준비중&#41; `<let>`, `<compare>`, `<increase>`, `<decrease>`)

### `<blank>`

### `<js>`

## 사운드 (sound)

[//]: # (* `<sound>`  )

[//]: # (* shorthand &#40;준비중&#41; `<sound-play>`, `<sound-stop>`, `<sound-pause>`)

### `<sound>`

## 에니메이션 (tween)

[//]: # (* `<tween>`  )

[//]: # (* shorthand &#40;준비중&#41; `<move>` `<resize>` `<scale>` `<rotate>` `<fade>`)

### `<tween>`

<!--https://gsap.com/resources/get-started-->

+ tween
    - interface: task 인터페이스
    - animation 라이브러리 사용
    - 예) 학습자가 3초간 동작이 없는 경우 힌트 실행

[//]: # (- shorthand `<hide>`, `<show>`)

```html

<tween selector=""
       from to delay duration></tween>
```

## 페이지 이동 (viewer)

```html
<!--뷰어 페이지 이동-->
<page-prev></page-prev>
<page-next></page-next>
<page-go></page-go>
```

























