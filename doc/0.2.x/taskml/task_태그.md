# `<task>` 태그

`<task>` 태그는 task 아이템 중에서도 가장 중요한 역헐을 하는 컴포넌트 입니다.

* 내부에 task 아이템들을 작성하여 작업을 그룹화합니다.
* `<task>` 태그 내부에 중첩해서 사용 가능합니다.
* `<task id="">` 구문으로 task를 등록하고 참조 할 수 있습니다.
* `<task sync="">` 구문으로 작업 진행(`series`, `parellel`) 방식을 결정합니다.
* `<task src="">` 구문으로 다른 task를 참조(import) 가능합니다.
* 아이디가 없는 task는 DOM이 로드된 후 자동으로 실행됩니다.

> task를 아이디로 등록해서 사용해도 재사용 하는 것은 아닙니다.  
> task는 호출할때마다 정의를 참조하여 새로운 실행 인스턴스를 생성합니다.

```html
<!--task 정의-->
<task id="task 아이디"
         [sync="series (default) | parallel" ]
         [src="" ]>

    <!--child task 아이템 태그 (=task)-->
    <blank timer="1000"></blank>

</task>
```

### task 작성 위치

`<template>` 태그 안에서 어디든지 작성 가능합니다.

```html
<template>
    <task></task>
    <!--Dom 태그 사이-->
    <div>
        <task></task>
    </div>

    <!--텍스트 사이-->
    <p>
        텍스트
        <task></task>
        텍스트
    </p>
</template>
```

### task 아이디

task에 지정되는 아이디는 유일해야 합니다.

> 아이디에 한글 및 띄어쓰기 등을 사용할 수 있습니다.
> * 아이디에 괄호를 사용할 경우 호출시 오동작을 일으킬 수 있습니다.
> * 괄호는 task 실행 연산자로 인식이 됩니다.

### 자동 실행되는 task

다음 조건이 만족되면 DOM 생성이 완료된 후 `<task>` 내용이 자동으로 실행됩니다.

* `<task>` 태그에 아이디가 없는 익명 task
* `<task>` 태그 내에 중첩되지 않은 task

`<template>` 태그 내용중 익명 task들을 모아 자동 실행합니다.  
순서는 top ~ down으로 작성된 순서대로 실행됩니다. (`sync="series"` 기본값)

다음과 같이 화면 초기설정을 할 수 있습니다.

```html
<!--처음 자동 실행됨-->
<task src="초기화면"></task>

<task id="초기화면">
    <!--화면에서 미리 감추기-->
    <hide selector=".button" to="{duration: 0}"></hide>
    <hide selector=".answer"></hide>

    <!--app 보이기-->
    <show selector="#app" from="{opacity: 0}" to="{duration: 1}"></show>
</task>
```

## task 중첩, 참조

```html
<!--아이디가 없는 익명 task-->
<task>
    <blank timer="1000"></blank>

    <!--중첩: task 내부에서 새로운 익명 task 정의-->
    <task sync="parallel">
        <blank timer="1000"></blank>
        ...
    </task>

    <!--참조: task4을 참조하는 task3 아이디를 등록하고 task4를 실행-->
    <task id="task3" src="task4">
        <!--참조 task 내부 내용은 무시됩니다.-->
    </task>

</task>

<task id="task4">
    <blank timer="1000"></blank>
</task>
```

위에서 중첩된 task "task3"은 부모 task가 실행될때 등록되는 것이 아니라 템플릿이 파싱될때 처음에 한번 등록됩니다.  
따라서 정의된 task 아이디 목록은 글로벌 변수 `$task`에서 확인할 수있습니다.

```html
<!--
a task가 실행될때 b, c task가 등록되는것이 아니라 처음에 파싱되어 등록됨
-->
<task id="a">
    <task id="b"></task>
    <task id="c"></task>
</task>

<!--b, c task도 외부에서 호출 가능함-->
<task>
    <task src="c">
        <task src="b"></task>
    </task>
</task>
```

src가 지정된 경우 하위 노드는 무시됩니다.

```html
<task src="a">
    <!--src가 지정된 경우 하위 노드는 무시됨-->
    <blank timer="1000"></blank>
</task>

<!--하위 노드도 실행시키고 싶다면 task로 감싸면 됨-->
<task>
    <task src="a"></task>
    <blank timer="1000"></blank>
</task>

```

정의되지 않은 task 아이디를 참조하려는 경우 task를 찾지 못하므로 하위 노드를 그대로 실행합니다.

```html
<!--
결국 task a 가 실행됨
task:complete 작업도 실행됨
-->
<task src="(unknown task id)" task:complete="endTask">
    <task>
        <task src="a"></task>
    </task>
</task>
```

### 옵션 덮어쓰기 (Merge)

참조하는 task 노드의 attribute 설정이 우선 적용됩니다.  
원본 task의 attribute 내용은 사라지지 않고 참조(src attr이 있는)하는 task의 attribute과 merge 됩니다.

아래 task "a"는 자신의 attribute 설정대로 실행됩니다.

```html
<!-- 
sync="parallel" task:start="startTask" task:end="endTask"
-->
<task src="a"></task>
<task id="a" sync="parallel" task:start="startTask" task:end="endTask">
    ...
</task>
```

아래 task "a"는 참조 노드의 attribute으로 merge됩니다.  
(참조 `src="a"` 노드의 attribute으로 덮어쓰기 됩니다.)

```html
<!--
task a의 설정이 덮어쓰기됨
 sync="(default)" task:start="" task:end=""
-->
<task src="a" sync="" task:start="" task:end=""></task>
<task id="a" sync="parallel" task:start="startTask" task:end="endTask">
    ...
</task>
```

여러 차례에 걸쳐 참조가 이루어 지는 경우 중간 참조 과정에 있는 task의 옵션(attribute)은 무시되고 원본 task의 옵션하고만 merge 됩니다.

```html
<!--
task a를 거쳐 task b가 실행됨
이때 중간 참조 과정에 있는 task a의 옵션은 무시되고 (옵션을 누적 merge하지 않고 건너뜀)
실행 원본인 task b의 설정에 덮어쓰기됨 
-->
<task id="a" src="b" sync="series" task:start="startTask_a" task:end="endTask_a"></task>
<task id="b" sync="parallel" task:start="startTask_b" task:end="endTask_b">
    ...
</task>

<!--(예시 1)
최종 적용되는 옵션 : 실행 원본인 task b의 설정에 덮어쓰기됨
sync="(default)" task:start="" task:end=""
-->
<task src="a" sync="" task:start="" task:end=""></task>

<!--(예시 2)
최종 적용되는 옵션 : 실행 원본인 task b의 설정이 적용됨
sync="parallel" task:start="startTask_b" task:end="endTask_b"
-->
<task src="a"></task>
```

### 재귀 호출

task 호출 구문을 통해 자신의 task 아이디를 다시 호출하여 재귀하는 task를 만들 수 있습니다.

```html
<task id="재귀">
    <js><!--<![ CDATA [
            if(!this.counter) this.counter = 0;
            this.counter += 10;
            $next();
            //]]>--></js>
    <cancel if-break="$js.counter === 4" else="재귀"></cancel>
</task>
```

#### 무한 루프 주의

다음 구문은 무한루프로 동작합니다.  
task가 점점 복잡해지면 발생할 수도 있습니다.

```html
<task src="a"></task>

<task id="a" task:complete="b"></task>
<task id="b" task:complete="a"></task>
```

의도적으로 루프를 생성한 경우 조건문으로 루프를 종료할 수 있습니다.

```html
<task src="a"></task>

<task id="a" task:complete="a" oncancel="console.log('작업 중지됨')">
    <js><!--<![ CDATA [
        // 클릭된 글자 개수 체크
        if(!this.counter) this.counter = 0;
        this.counter += 1;
        $next();
    //]]>--></js>
    <cancel if="$js.counter === 4"></cancel>
</task>
```

위에서 `<js>` task 코드는 총 4번 실행됩니다.


