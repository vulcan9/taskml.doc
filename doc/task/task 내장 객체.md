# Task 내장 객체

미리 구현된 task 객체를 `<as-task>` 태그에 Child 노드로 추가할 수 있습니다.  
task 객체는 기능별로 task 인터페이스를 구현한 객체입니다.

> `<as-task>` 태그 안에서 사용할 수 있습니다.

#### 흐름 제어

`<as-task>`, `<break>`, `<break-release>`, `<cancel>`

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

* `<as-task>`, `<break>`, `<break-release>`, `<cancel>`

### `<as-task>`

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

### `<break-release>`

### `<cancel>`

## Dom 상태 변경 (dom)

* `<addClass>`, `<removeClass>`, `<addAttr>`, `<removeAttr>`, `<addStyle>`, `<RemoveStyle>`  
* shorthand `<disable>`, `<enable>`

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

* `<blank>`, `<js>`
* shorthand (준비중) `<let>`, `<compare>`, `<increase>`, `<decrease>`

### `<blank>`

### `<js>`

## 사운드 (sound)

* `<sound>`  
* shorthand (준비중) `<sound-play>`, `<sound-stop>`, `<sound-pause>`

### `<sound>`

## 에니메이션 (tween)

* `<tween>`  
* shorthand (준비중) `<move>` `<resize>` `<scale>` `<rotate>` `<fade>`

### `<tween>`

+ tween
    - interface: task 인터페이스
    - animation 라이브러리 사용
    - 예) 학습자가 3초간 동작이 없는 경우 힌트 실행

- shorthand `<hide>`, `<show>`

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

























