# Task 내장 객체 (ver 0.1.3)

미리 구현된 task 객체를 `<task>` 태그에 Child 노드로 추가할 수 있습니다.  
task 객체는 기능별로 task 인터페이스를 구현한 객체입니다.

> `<task>` 태그 안에서 사용할 수 있습니다.

#### 흐름 제어

[`<task>`](#task-태그),
[`<break>`](#break-태그),
[`<break-release>`](#break-release-태그),
[`<cancel>`](#cancel-태그),
[`<exit>`](#exit-태그)

#### Dom 상태 변경

[`<addClass>`](#addclass-태그), 
[`<removeClass>`](#removeclass-태그),
[`<toggleClass>`](#toggleclass-태그),
[`<addAttr>`](#addattr-태그), 
[`<removeAttr>`](#removeattr-태그),
[`<addStyle>`](#addstyle-태그),
[`<removeStyle>`](#removestyle-태그)

- shorthand [`<disable>`](#disable-태그), [`<enable>`](#enable-태그)

#### 연산

[`<blank>`](#blank-태그),
[`<js>`](#js-태그-script-태그), ([`<script>`](#js-태그-script-태그))

- shorthand (예정) `<let>`, `<compare>`, `<increase>`, `<decrease>`

#### 사운드

[`<sound>`](#sound-태그)

- shorthand (예정) `<sound-play>`, `<sound-stop>`, `<sound-pause>`

#### 에니메이션

[`<tween>`](#tween-태그)

- shorthand [`<hide>`](#hide-태그), [`<show>`](#show-태그)

#### 뷰어 기능 호출

[`<pageGo>`](#pagego-태그)
[`<pagePrev>`](#pageprev-태그)
[`<pageNext>`](#pagenext-태그)
[`<pageButton>`](#pagebutton-태그)
[`<watchStudyTime>`](#watchstudytime-태그)

--------------------------------------------------------------

## 흐름 제어 (control)

### `<task>` 태그

`<task>`에 대한 자세한 내용은 다음 링크를 참고하세요

* [`<task>` 태그](./task%20태그)

```html

<task id="task 아이디"
         [sync="series (default) | parallel" ]
         [src="" ]>

    <!--child task 아이템 태그 (=task)-->

</task>
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

### `<break>` 태그

`<break>` task 실행 위치에서 task 진행을 멈춥니다  
`timer, if` 등의 attribute과 함께 사용하여 break 지점을 해제하고 다시 task를 진행시킬 수 있습니다.

```html

<task>
    <break id="break 아이디"></break>
    <task>
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

### `<break-release>` 태그

위에서 설정된 break를 해제하는 task 입니다.

```html

<task>
    <break-release id="break 아이디"></break>
</task>
```

`id="break 아이디"`

* 지정된 `id`는 break task에서 설정된 아이디 입니다.
* 해당 아이디의 break 지점을 해제합니다.

```html

<task>
    ...
    <break-release id="break 아이디"></break>
        ...
</task>

<task id="release break">
    <break-release id="break id"></break-release>
</task>

<!--
// "release break" task 호출로 break를 해지
... task:click="release break"
-->
```

### `<cancel>` 태그

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
<task id="재귀" oncancel="alert('취소')">
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
</task>
```

이때 `if-break` 대신 `if` attr을 사용하면 1번 실행 후 task가 종료됩니다.  
(조건식이 false 이므로 cancel task가 실행되지 않고 다음 task로 넘어가기 때문임)

### `<exit>` 태그

* `<cancel>` task와 같이 task를 종료합니다. 다만 자신이 속한 `<task>`만 종료합니다.
* `cancel` 이벤트가 발생하지 않고 `end` 이벤트가 발생합니다.

```html

<exit></exit>
```

중첩된 task 구문에서 `<cancel>` task와 차이가 확실해 집니다.

```html

<!--자동 실행됨-->
<task onend="alert('종료')" oncancel="alert('취소')">
    <blank timer="1000"></blank>
    <task src="exit 중첩"></task>
    <blank timer="1000" onstart="alert('exit 실행')"></blank>
</task>

<!--exit는 자신의 task 만 빠져나감-->
<task id="exit 중첩">
    <blank timer="1000"></blank>

    <!--exit를 호출함-->
    <exit if-break="$js.value" else="exit 중첩"></exit>

    <blank timer="1000" onstart="alert('도달하지 않는 task')"></blank>
</task>

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

### `<addClass>` 태그

selector 참조되는 dom 요소에 class 속성을 설정합니다.  
여러 class를 한번에 지정할때에는 콤마 구분자로 구분하여 설정합니다.

```html

<addClass selector="" classes="className1, className2, ..."></addClass>
```

### `<removeClass>` 태그

selector 참조되는 dom 요소에 class 속성을 제거합니다.  
여러 class를 한번에 지정할때에는 콤마 구분자로 구분하여 설정합니다.

```html

<removeClass selector="" classes="className1, className2, ..."></removeClass>
```

### `<toggleClass>` 태그

selector 참조되는 dom 요소에 class 속성을 설정 또는 제거합니다.  
여러 class를 한번에 지정할때에는 콤마 구분자로 구분하여 설정합니다.
```html

<toggleClass selector="" classes="className1, className2, ..."></toggleClass>
```

### `<addAttr>` 태그

selector 참조되는 dom 요소에 attribute 속성을 설정합니다.

```html

<addAttr selector="" name="" value=""></addAttr>
```

### `<removeAttr>` 태그

selector 참조되는 dom 요소에 attribute 속성을 제거합니다.

```html

<removeAttr selector="" name=""></removeAttr>
```

### `<addStyle>` 태그

selector 참조되는 dom 요소에 style 속성을 설정합니다.
style 속성 이름은 carmalCase 표기법으로 작성합니다.

```html

<addStyle selector="" styles="{...}"></addStyle>
```

### `<removeStyle>` 태그

selector 참조되는 dom 요소에 style 속성을 제거합니다.  
여러 style 속성을 한번에 삭제할때에는 콤마 구분자로 구분하여 설정합니다.

```html

<removeStyle selector="" styles="style 이름1, style 이름2, ..."></removeStyle>
```

### `<disable>` 태그

selector 참조되는 dom 요소를 비활성 상태로 표시합니다.  
투명도와 마우스 동작을 비활성화 합니다.

```html

<disable selector=""></disable>
```

### `<enable>` 태그

selector 참조되는 dom 요소를 활성 상태로 표시합니다.  
(`disable` 상태를 해제합니다.)

```html

<enable selector=""></enable>
```

## 연산 (operation)

### `<blank>` 태그

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

### `<js>` 태그 (`<script>` 태그)

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

<!-- `$clear();` 호출로 $JS 객체는 빈 객체({})가 됨 -->
```

위에서 본것처럼 `$js` 객체는 모든 task에서 공용하는 글로벌 객체입니다.

* `$js` 모든 task 노드에서 공통으로 사용
* `$clear()` 호출후에는 `$js` 객체 초기화됨

간단한 함수 호출하기
```html
<js run="funcName($next)"></js>
또는 (아래 script 태그는 task 태그임)
<script run="funcName($next)"></script>

<!-- 
순서와 상관없이 다음 변수를 매개변수로 사용할 수 있습니다. 
$args, $next, $clear, $cancel
(아래 script 태그는 HTML 태그임)
-->
<script>
  function funcName($next){
    console.log('run !!');
    $next();
  }
</script>
```

#### `<script>` 태그
`<js>` 태그 대신 `<script>` 태그를 사용할 수도 있습니다. 둘은 완벽하게 같은 동작을 합니다.

```html
<script>
    // JS Code...
</script>

<script run="func($next)"></script>
```

`<script>` 태그를 사용하는 이유는 `<js>` 태그 기능을 보다 편리하게 사용하기 위함입니다.
* `<js>` 태그의 CDATA 구문이 너무 불편하고 IDE에서는 주석으로 표시되어 코드 가독성이 떨어집니다.
* `<script>` 태그를 사용하면 IDE의 코드 힌트 기능이 지원됩니다.

`<script>` 태그는 HTML `<script>` 태그와 전혀 다릅니다.
* HTML `<script>` 태그의 attribute 속성을 및 기능이 모두 동작하지 않습니다.
* task 노드 안에 작성되었으면 모두 HTML 태그가 아닌것으로 간주하면 됩니다.
* `<script>` 태그는 `<js>` 태그의 이름만 바뀐 태그입니다.

## 사운드 (sound)

audio 재생을 쉽게 제어하기 위한 task 입니다.

### `<sound>` 태그

`id` 별로 HTML `<audio>` dom을 생성, 사용한 후 파기하는 기능을 제공합니다.  
HTML `<audio>` dom을 직접 제어하지 않고 `Media` proxy 객체가 제공하는 api를 통해 제어 합니다.

```html

<sound [id="sound 아이디" ]
       [target="sound 아이디" ]
       [set="{속성 설정}" ]
       [run="실행 메서드 호출" ]
       [wait="이벤트 이름" ]
       [destroy="all" ]>
</sound>
```

`id="media 아이디"`

* `<sound>` task를 통해 생성된 media 객체의 아이디 입니다. 그냥 sound 객체의 아이디라고 생각해도 다르지 않습니다.

`target="media 아이디"`

* 이미 생성된 media 객체를 아이디로 참조합니다. task 객체를 `src` attr에서 아이디로 참조하는것과 같습니다.
* `target`에 media 아이디가 지정되면 해당 media 객체를 대상으로 기능(task)을 적용 합니다.

> `id`로 audio 인스턴스를 생성, 이후 `target="id"` 로 인스턴스 참조.  
> `id`, `target` 둘중 하나만 있어도 되지만 생성을 위해 최소 한번은 미리 `id`가 설정되어 있어야 합니다.

`set="{속성 설정}"`

* media 객체에 속성을 설정합니다.
* set attribute에 설정 할 수 있는 속성 값은 다음과 같습니다.
    - src : 'audio 소스의 경로'
    - controls : `true | false`  비디오의 재생, 볼륨 등 제어기들을 표시
    - muted : `true | false` 음소거
    - loop : `true | false` 반복 재생
    - autoplay : `true | false` 자동 재생

#### `autoplay` 속성값

`autoplay` 속성은 페이지가 로드될때는 일반적으로 브라우저에서 허용되지 않습니다.  
이 속성은 사용자의 클릭과 같이 인터렉션이 명확할때 동작합니다.

```html
<!--페이지 로드와 함께 자동 실행되는 task-->
<task>
    <sound id="soundID1"
           set="{ src: './sound1.mp3', autoplay: true }"></sound>
</task>
<!--autoplay 속성은 동작하지 않습니다.-->
```

사용자 클릭 동작이 있으므로 다음 `autoplay` 속성은 동작합니다.

```html

<task id="사운드 자동 재생">
    <sound id="soundID1" set="{ src: './sound1.mp3', autoplay: true }"></sound>
</task>

<!--play()를 호출하지 않아도 재생됩니다.-->
<button task:click="사운드 자동 재생()">자동 재생</button>
```

`run="실행 메서드 호출"`

* media 객체에 메서드를 호출합니다.
* media 객체에서 호출 가능한 api 입니다

자세한 내용은 [미디어 API](./미디어API)를 참고하세요
다음과 같이 사용합니다.

```html

<task id="사운드 자동 재생">
    <sound id="soundID1" set="{ src: './sound1.mp3' }"
           run="play()"></sound>
</task>

<!--autoplay 속성을 설정하지 않았지만 play() 호출로 자동 재생됩니다.-->
<button onclick="사운드 자동 재생()">자동 재생</button>
```

`wait="이벤트 이름"`

* `<sound>` task의 완료(`end` 이벤트) 시점을 결정하는 이벤트 이름을 설정합니다.
* `wait="ended"` 이면 재생이 모두 완료되었을때 sound task가 완료되었다고 판단합니다.
* 여러 이벤트를 설정하려면 콤마로 구분해서 설정합니다. (`wait="ended, error"`)

```html

<task id="사운드 재생">
    <sound id="soundID1" set="{ src: './sound1.mp3' }"></sound>
    <!--"사운드 재생" task는 재생이 완료(ended 이벤트) 됬을때 종료됩니다.-->
    <sound target="soundID1" wait="ended" run="play()"></sound>
</task>
```

위 예제에서 `wait` attribute을 설정하지 않으면 "soundID1"이 play 된 후 바로 "사운드 재생" task가 종료됩니다.

#### 재생 후 사운드 삭제

#### destroy="all", destroy=""

`destroy` atribute을 사용하여 생성된 audio 인스턴스를 초기화 또는 삭제할 수 있습니다.

```html

<task id="사운드 재생">
    <sound id="soundID1" set="{ src: './sound1.mp3' }"></sound>
    <sound target="soundID1" wait="ended" run="play()"></sound>
    <!--
    재생 완료 후 audio src 값이 초기화 됩니다.
    destroy="all" 값을 전달하면 audio dom 인스턴스까지 모두 삭제됩니다.
    -->
    <sound target="soundID1" destroy=""></sound>
</task>
```

task는 1회성 인스턴스이므로 실행 후 등록되었던 이벤트가 자동으로 해제됩니다.   
미디어의 경우 생성된 인스턴스를 계속 사용해야 하는 경우가 있습니다. 
예를 들면 디바이스에서 사운드 재생은 사용자 액션이 반드시 선행되어야 해당 audio 태그의 실행이 허용됩니다. 
일단 허용된 audio 객체는 다른 source를 설정해도 자동 실행이 가능해 집니다. 
audio 객체를 삭제(`destroy`)하면 다시 사용자 액션이 필요해집니다. 따라서 생성된 인스턴스를 계속 재사용할 수 있어야 합니다.

#### destroy="no"

`destroy` atribute 값을 `no`로 설정하여 생성된 audio 인스턴스의 이벤트를 해지않고 계속 유지할 수 있습니다.
```html
<sound id="na" set="{src: './test/asset/sound1.mp3'}"
       onplay="alert('성우음성')"
       destroy="no">
```
* destroy="no" 설정이 없으면 alert는 처음 한번만 실행됨 (task 실행 후 이벤트가 destroy 됨)
* destroy="no" 설정이 있으면 play 이벤트 계속 실행됨
* destroy="no" 설정 후 필요할때 destroy="all" 또는 destroy="" 설정하는 방법으로 이벤트 해지

#### 이벤트 누적 주의
다음 코드는 `사운드 재생` task를 실행할 때마다 이벤트가 누적되어 점점 alert 횟수가 증가합니다.

```html
<task id="사운드 재생">
    <sound id="soundID1" set="{ src: './sound1.mp3' }"
           onplay="alert('성우음성')" destroy="no"></sound>
    <sound target="soundID1" wait="ended" run="play()"></sound>
    <!--<sound target="soundID1" destroy=""></sound>-->
</task>
```

#### Media 이벤트

```html

<sound id="soundID1" task:[event]="" om[event]=""></sound>
```

Media 객체에서 발송되는 이벤트는 [미디어 API](./미디어API)를 참고하세요  
모두 `<sound>` task에서 사용 가능합니다.

#### JS에서 사용할 수 있는 Media 기능들

`$sound` 글로벌 객체를 사용하면 `<sound>` task의 Media 객체를 직접 제어할 수 있습니다.

```html

<task>
    <sound id="soundID1"></sound>
</task>
```

```javascript
// sound task의 아이디 값으로 media 객체를 참조합니다.
const media = $sound["soundID1"];

// get, set 메서드
const src = media.get('src')
media.set('src', '경로 설정');

// 이벤트 등록과 해지
media.on('loadstart', onLoadstart);
media.off('loadstart', onLoadstart);
```

## 에니메이션 (tween)

### `<tween>` 태그

CSS Transition 대신 사용할 수 있는 트위닝 task 입니다.

```html

<tween selector=""
       [set="{}" ]
       [from="{}" ]
       [to="{}">]

</tween>
```

`set="{}"`

* 트위닝 없이 즉시 값을 적용합니다. (duration = 0)

`from="{}"`

* 시작 값을 설정합니다. 시작 값에서 현재 값으로 트위닝 됩니다.

`to="{}"`

* 종료 값을 설정합니다. 현재 값에서 종료 값으로 트위닝 됩니다.

`set`, `from`, `to` attribute 중 하나 또는 셋 모두 설정할 수 있습니다.  
이때는 `set` 값이 먼저 설정됩니다.  
`from`, `to` 값이 함께 지정되어 있으면 설정된 시작 값과 종료 값으로 트위닝 됩니다.  
이때 트위닝 속성값은 `to` attribute 에 설정합니다.  
자세한 내용은 [GSAP 라이브러리](https://gsap.com/resources/get-started/)를 참고하세요

### 설정값

다음은 값 설정 예시입니다,

```html

<tween selector=""
       <!--
       to="{
            rotation: 27, x: 100,
            duration: 1

            // 단위
            x: 200, // 기본값 px 단위
            x: " +=200" // 상대 증분 치로 지정
            x: '40vw', // 다른 단위는 문자열로 전달
            x: () => window.innerWidth / 2, // 함수 사용 가능함
            
            rotation: 360 // 기본값 degrees
            rotation: "1.25rad" // 다른 단위는 문자열 (radians 단위)
            
            // 특수 설정 속성값
            // https://gsap.com/resources/get-started/#special-properties
            // https://gsap.com/docs/v3/GSAP/Tween/
            // duration, delay,
            // repeat, yoyo, stagger, ease, onComplete
       }"
       -->
</tween>
```

복잡한 애니메이션은 `<js>` task에서 직접 구현할 수 있습니다.

```html

<js><!--<![ CDATA [
        if(!this.tween){
            this.tween = gsap.to('.box',{
              duration: 2,
              x: 500,
              xPercent: -100,
              rotation: 360,
              ease: "none",
              paused: true,
              // onComplete: () => $next()
            })
        }
        $next();
        //]]>--></js>

<js><!--<![ CDATA [
            if(this.tween){
                this.tween.revert();
                delete this.tween;
            }
            $clear();
            $next();
            //]]>--></js>
```

### `<hide>` 태그

`opacity` 속성을 0으로 만듭니다.  
트위닝이 끝나면 `display: 'none'`으로 설정됩니다.  
`set`, `from`, `to` attribute에 함께 트위닝될 속성을 지정할 수 있습니다.

```html

<hide selector="" set="" from="" to=""></hide>
```

### `<show>` 태그

`display` 속성을 복원하고 `opacity` 속성을 1으로 만듭니다.
`set`, `from`, `to` attribute에 함께 트위닝될 속성을 지정할 수 있습니다.

```html

<show selector="" set="" from="" to=""></show>
```

## 뷰어 기능 호출

### `<pageGo>` 태그
(뷰어 API) 페이지 이동을 호출 합니다. (`$containerAPI.subject.go(index: number);`)
```html
<pageGo index="페이지 index 번호"></pageGo>
```

### `<pagePrev>` 태그
(뷰어 API) 이전 페이지 이동을 호출 합니다. (`$containerAPI.subject.goPrev();`)
```html
<pagePrev></pagePrev>
```
### `<pageNext>` 태그
(뷰어 API) 다음 페이지 이동을 호출 합니다. (`$containerAPI.subject.goNext();`)
```html
<pageNext></pageNext>
```

### `<pageButton>` 태그
(뷰어 API) 다음 페이지 이동 버튼을 노출 합니다. (`$containerAPI.showNext();`)
```html
<!--페이지 이동 버튼 보이기 요청-->
<pageButton value="next"></pageNext>
```

### `<watchStudyTime>` 태그

(뷰어 API) 뷰어에 학습 진도 체크 시작을 알립니다. (`$containerAPI.watchStudyTime();`)
```html
<!--video attr이 지정되지 않으면 HTML 모드 페이지-->
<watchStudyTime video="video selector"></watchStudyTime>
```






















