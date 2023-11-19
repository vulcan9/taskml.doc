# Task 내장 객체

미리 구현된 task 객체를 `<as-task>` 태그에 Child 노드로 추가할 수 있습니다.  
task 객체는 기능별로 task 인터페이스를 구현한 객체입니다.

> `<as-task>` 태그 안에서 사용할 수 있습니다.

#### 흐름 제어

`<as-task>`, `<break>`, `<break-release>`, `<cancel>`, `<exit>`

#### Dom 상태 변경

`<addClass>`, `<removeClass>`, `<addAttr>`, `<removeAttr>`, `<addStyle>`, `<removeStyle>`

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

class, attribute, style 추가/제거하는 기본 기능을 제공합니다.

- 기본적으로 즉시 실행 후 종료됩니다.
- 때문에 start, end 이벤트가 바로 (연달아) 발생됩니다.

### transition 사용

- selector의 transition 설정에 따라 실제 종료 시점은 달라질 수 있습니다.
- transition 종료 여부는 task에서 판단할 수없으므로 `timer` attribute을 설정하여 종료 시점을 지정하면 좋습니다

Dom 상태 변경과 관련된 대부분의 기능은 `tween` task에서도 똑같이 설정 가능합니다.
> 같은 DOM 요소에 `tween` task와 함께 사용하게 될 경우 `transition` 속성을 제외시켜야 합니다  
> 속성값 연산에 서로 간섭을 일으켜 성능이 현저히 떨어집니다.

### `<addClass>`

selector 참조되는 dom 요소에 class 속성을 설정합니다.  
여러 class를 한번에 지정할때에는 콤마 구분자로 구분하여 설정합니다.

```html

<addClass selector="" class="className1, className2, ..."></addClass>
```

### `<removeClass>`

selector 참조되는 dom 요소에 class 속성을 제거합니다.  
여러 class를 한번에 지정할때에는 콤마 구분자로 구분하여 설정합니다.

```html

<removeClass selector="" class="className1, className2, ..."></removeClass>
```

### `<addAttr>`

selector 참조되는 dom 요소에 attribute 속성을 설정합니다.

```html

<addAttr selector="" name="" value=""></addAttr>
```

### `<removeAttr>`

selector 참조되는 dom 요소에 attribute 속성을 제거합니다.

```html

<removeAttr selector="" name=""></removeAttr>
```

### `<addStyle>`

selector 참조되는 dom 요소에 style 속성을 설정합니다.
style 속성 이름은 carmalCase 표기법으로 작성합니다.

```html

<addStyle selector="" style="{...}"></addStyle>
```

### `<removeStyle>`

selector 참조되는 dom 요소에 style 속성을 제거합니다.  
여러 style 속성을 한번에 삭제할때에는 콤마 구분자로 구분하여 설정합니다.

```html

<removeStyle selector="" style="style 이름1, style 이름2, ..."></removeStyle>
```

### `<disable>`

selector 참조되는 dom 요소를 비활성 상태로 표시합니다.  
투명도와 마우스 동작을 비활성화 합니다.

```html

<disable selector=""></disable>
```

### `<enable>`

selector 참조되는 dom 요소를 활성 상태로 표시합니다.  
(`disable` 상태를 해제합니다.)

```html

<enable selector=""></enable>
```

## 연산 (operation)

### `<blank>`

가끔은 attribute 기능만 사용해야할 때도 있습니다.  
이때 아무 동작도 하지 않는 `<blank>` task르 이용합니다.  
아무런 동작도 하지 않지만 task 생명주기 인터페이스에 따라 이벤트를 발생시켜 줍니다.

```html

<blank></blank>
```

task 관련 attribute과 함께 사용할 수 있습니다.

```html
<!--1초 지연시킵니다.-->
<blank timer="1000"></blank>

<!--실행 분기를 나눕니다.-->
<blank if="조건식"
       then="true일때 task 실행"
       else="false일때 task 실행"
       task:end="task 실행"></blank>
```

### `<js>`

새로 정의된 task를 만들 수 있도록 JS 코드가 실행되는 context를 제공합니다.  
`<js>` task 코드 블럭은 문자열 인식을 위해 CDATA 블럭안에 작성합니다.

```html

<js><!--<![CDATA[
    // JS Code...
//]]>--></js>
```

`<js>` 태그에 작성된 코드는 task 인터페이스 안에서 동작하게 됩니다.  
이 인터페이스를 유지하기 위해 `<js>` 코드 블럭에는 몇가지 미리 정의된 객체가 제공됩니다.

* `$cancel` : (함수) `<cancel>` task를 호출한 것과 같습니다.
* `$exit` : (함수) `<exit>` task를 호출한 것과 같습니다.
* `$next` : (함수) 다음 task를 호출한 것과 같습니다.
* `$clear` : (함수) `$js` context 데이터를 모두 삭제합니다.
* `$args` : (배열) task 호출할때 전달된 매개변수 객체 입니다.

```html

<js><!--<![CDATA[
    // some code...
    // 다음 task로 넘어감
    $next();
//]]>--></js>
```

> `<js>` 코드 블럭에서는 명시적으로 종료 함수를 호출해야 다음 task가 실행됩니다.  
> 따라서 `$next();` 또는 `cancel();`, `$exit();` 함수를 호출하기 전까지는 break 상태가 됩니다.

다음은 비동기로 JS 코드를 실행한 후 다음 task를 호출하는 코드입니다.

```html

<js><!--<![CDATA[
    this.foo = new Date();
    setTimeout(()=>{
        this.bar = 'parallel인 경우 출력 안됨';
        $next();
    }, 1000);
//]]>--></js>
```

이렇게 하면 글로벌 객체 `$js`에 `foo`, `bar` 값이 저장됩니다.  
`<js>`의 실행 context는 `$js` 객체입니다.

이후에 실행되는 task에서는 이 값을 참조할 수 있습니다.

```html
<!--출력 : 'parallel인 경우 출력 안됨'-->
<blank onstart="console.log($js.bar)"></blank>

<!--다시 $clear를 실행하면 $JS 객체는 초기화 됩니다.-->

<js><!--<![CDATA[
    $clear(); $next();
//]]>--></js>

<!-- $JS 객체는 빈 객체({})가 됨 -->
```

위에서 본것처럼 `$js` 객체는 모든 task에서 공용하는 글로벌 객체입니다.

* `$js` 모든 task 노드에서 공통으로 사용
* `$clear()` 호출후에는 `$js` 객체 초기화됨

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

























