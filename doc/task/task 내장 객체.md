# Task 내장 객체

미리 구현된 task 객체를 `<as-task>` 태그에 Child 노드로 추가할 수 있습니다.  
task 객체는 기능별로 task 인터페이스를 구현한 객체입니다.

#### 흐름 제어

`<break>`, `<break-release>`, `<cancel>`

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

`<break>`, `<break-release>`, `<cancel>`

## Dom 상태 변경 (dom)

`<addClass>`, `<removeClass>`, `<addAttr>`, `<removeAttr>`, `<addStyle>`, `<RemoveStyle>`

- shorthand `<disable>`, `<enable>`

- class, attribute, style 추가/제거
- 기본적으로 즉시 실행됨
- 때문에 start, end 이벤트가 바로 (연달아) 발생되나,
- selector의 transition 설정에 따라 실제 종료 시점은 달라질 수 있음

```html
<!--class-->
<add-class></add-class>
<remove-class></remove-class>
<!--attribute-->
<add-attr></add-attr>
<remove-attr></remove-attr>
<!--style-->
<add-style></add-style>
<remove-style></remove-style>
```

```html
<!--shorthand-->
<enable></enable>
<disable></disable>
<show></show>
<hide></hide>
<x></x>
<y></y>
<w></w>
<h></h>
```

## 연산 (operation)

`<blank>`, `<js>`

- shorthand (준비중) `<let>`, `<compare>`, `<increase>`, `<decrease>`

간단한 수준의 변수, 연산 기능을 가짐

```html

<let name="" value=""></let>
<compare></compare>
<increase></increase>
<decrease></decrease>
```

```html
<!--shorthand-->
<step-set></step-set>   <!--<let name="step" value="1"></let>-->
<step-prev></step-prev> <!--<decrease name="step" value="1"></decrease>-->
<step-next></step-next> <!--<increase name="step" value="1"></increase>-->
<step-go></step-go>     <!--<let name="step" value="arg[0]"></let>-->
```

내장 API의 결과에따라 적절한 task:event attribute 호출할수 있음

```html

<compare value1="answer" value2="arg[0]"
         task:true="do-yes-task" task:false="do-no-task"></compare>
```

## 사운드 (sound)

`<sound>`

- shorthand (준비중) `<sound-play>`, `<sound-stop>`, `<sound-pause>`

```html
<!--audio-->
<sound src="" task:pause=""></sound>
```

```html
<!--shorthand-->
<play></play>
<stop></stop>
<pause></pause>
```

## 에니메이션 (tween)

`<tween>`

+ tween
  - interface: task 인터페이스
  - animation 라이브러리 사용
  - 예) 학습자가 3초간 동작이 없는 경우 힌트 실행

- shorthand `<hide>`, `<show>`

- transition을 표현

```html
<!--transition-->
<tween selector=""
       from to delay duration></tween>
```

```html
<!--shorthand-->
<tween-to></tween-to>
<tween-from></tween-from>
<move></move>
<resize></resize>
<scale></scale>
<rotate></rotate>
<fade></fade>
```

## 페이지 이동 (viewer)

```html
<!--뷰어 페이지 이동-->
<page-prev></page-prev>
<page-next></page-next>
<page-go></page-go>
```

























