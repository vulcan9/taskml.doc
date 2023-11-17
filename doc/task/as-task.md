# **<as-task>** 컴포넌트

`<as-task>` 태그는 task 아이템 중에서도 가장 중요한 역헐을 하는 컴포넌트 입니다.

* 내부에 task 아이템들을 작성하여 작업을 그룹화합니다.
* `<as-task>` 태그 내부에 중첩해서 사용 가능합니다.
* `<as-task id="">` 구문으로 task를 등록하고 참조 할 수 있습니다.
* `<as-task sync="">` 구문으로 작업 진행(`series`, `parellel`) 방식을 결정합니다.
* `<as-task src="">` 구문으로 다른 task를 참조(import) 가능합니다.
* 아이디가 없는 task는 DOM이 로드된 후 자동으로 실행됩니다.

task를 아이디로 등록해서 사용해도 재사용 하는 것은 아닙니다.  
task는 호출할때마다 정의를 참조하여 새로운 인스턴스를 생성합니다.

```html
<!--task 정의-->
<as-task id="task 아이디"
         [sync="series (default) | parallel" ]
         [src="" ]>

    <!--child task 아이템 태그 (=task)-->
    <blank timer="1000"></blank>

</as-task>
```

### task 중첩, 참조

```html

<as-task>
    <blank timer="1000"></blank>

    <!--중첩: task 내부에서 새로운 익명 task 정의-->
    <as-task sync="parallel">
        <blank timer="1000"></blank>
        ...
    </as-task>

    <!--참조: task4을 참조하는 task3 아이디를 등록하고 task4를 실행-->
    <as-task id="task3" src="task4">
        <!--참조 task 내부 내용은 무시됩니다.-->
    </as-task>

</as-task>

<as-task id="task4">
    <blank timer="1000"></blank>
</as-task>
```

### task 작성 위치

`<template>` 태그 안에서 어디든지 작성 가능합니다.

```html

<template>
    <as-task></as-task>
    <!--Dom 태그 사이-->
    <div>
        <as-task></as-task>
    </div>

    <!--텍스트 사이-->
    <p>
        텍스트
        <as-task></as-task>
        텍스트
    </p>
</template>
```

### task 아이디

task에 지정되는 아이디는 유일해야 합니다.

> 아이디에 한글 및 띄어쓰기 등을 사용할 수 있습니다.
> * 아이디에 괄호를 사용할 경우 호출시 오동작을 일으킬 수 있습니다.
> * 괄호는 task 실행 연산자로 인식이 됩니다.


## 자동 실행되는 task

다음 조건이 만족되면 DOM 생성이 완료된 후 `<as-task>` 내용이 자동으로 실행됩니다.

* `<as-task>` 태그에 아이디가 없는 익명 task
* `<as-task>` 태그 내에 중첩되지 않은 task

`<template>` 태그 내용중 익명 task들을 모아 자동 실행합니다.  
순서는 top ~ down으로 작성된 순서대로 실행됩니다. (`sync="series"`)

다음과 같이 화면 초기설정을 할 수 있습니다.

```html
<!--처음 자동 실행됨-->
<as-task src="초기화면"></as-task>

<as-task id="초기화면">
    <!--화면에서 미리 감추기-->
    <hide selector=".button" to="{duration: 0}"></hide>
    <hide selector=".answer"></hide>

    <!--app 보이기-->
    <show selector="#app" from="{opacity: 0}" to="{duration: 1}"></show>
</as-task>
```


