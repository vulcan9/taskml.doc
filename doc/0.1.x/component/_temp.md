
## 실제 컴포넌트 & task 합성

```html
<!--container-->
<is-page x="" y="" w="" h=""
         style class>

    <!--////////////////////////////////
    // Task 정의
    ////////////////////////////////-->

    <!--sequence 로직을 표현 (hidden node)-->
    <as-task sync="parallel">
        <!--name이 없으면 load와 함께 실행-->
        <hide target=".popup"></hide>
        <disable selector="#quiz"></disable>

        <as-task sync="series">
            <!--나래이션-->
            <sound src=""></sound>
            <enable selector="#quiz"></enable>
        </as-task>
    </as-task>

    <as-task id="quizComplete">
        <!--종료 화면 띄우기 animation-->
        <show target=".popup"></show>
    </as-task>

    <!--////////////////////////////////
    // 화면 구성
    ////////////////////////////////-->

    <!--퀴즈 컴포넌트: 드래그-->
    <quiz-drag id="quiz" task:end="quizComplete()">
        <!--drag N개-->
        <drag drag-value="a"></drag>
        <drag drag-value="b"></drag>

        <!--drop N개-->
        <drop drop-value="a, b"></drop>

        <!--작업자가 추가된 요소-->
        <div>설명 박스</div>
    </quiz-drag>

    <!--기타 요소-->
    <is-group>
        <as-task>
            <!--name이 없으면처음 로드될때 실행-->
        </as-task>
        <as-task id="prevPage">
            <page-prev></page-prev>
        </as-task>

        <is-audio src=""></is-audio>
        <is-video src=""></is-video>
        <is-image src="" task:click="prevPage()"></is-image>
        <is-text>이전 버튼</is-text>
    </is-group>

    <!--퀴즈 종료 팝업-->
    <is-group class="popup"
                  task:show="open()"
                  task:hide="close()">

        <!--팝업이 뜰때: animation + 나래이션-->
        <as-task id="open" sync="parallel">
            <tween></tween>
            <sound></sound>
        </as-task>
        <!--팝업 아니오: 팝업  닫기-->
        <as-task id="close">
            <hide target=".popup"></hide>
        </as-task>
        <!--팝업 예: 다음 페이지로 이동-->
        <as-task id="exit">
            <page-next></page-next>
        </as-task>

        <is-button task:click="close()">아니오</is-button>
        <is-button task:click="exit()">예</is-button>
    </is-group>

</is-page>
```


# 보류중인 task



## 연산 (operation)
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
