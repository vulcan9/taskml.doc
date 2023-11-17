














## 컴포넌트 DOM 구성 표현

HTML Select 태그 형식과 같이 구성요소를 분리

```html
<!--select 태그 (컴포넌트의 조합)-->
<select onclick="call_function();">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
</select>
```

같은 방식으로 컴포넌트 내부 구성요소를 직접 작성할 수 있게함

* 컴포넌트 구성요소(DOM)를 작업자가 직접 작성
* JS, CSS에서 asset 경로 분리됨

```html
<!--일반 컴포넌트-->
<is-group>
    <is-audio src=""></is-audio>
    <is-video src=""></is-video>
    <is-image src=""></is-image>
    <is-text>텍스트</is-text>
</is-group>

<!--퀴즈 컴포넌트: 드래그-->
<quiz-drag>
    <!--drag N개-->
    <drag drag-value="a"></drag>
    <drag drag-value="b"></drag>

    <!--drop N개-->
    <drop drop-value="a, b"></drop>
</quiz-drag>
```

## 컴포넌트 종류

* 공통 요소
    - task 인터페이스 구현
    - `task:event` 구문
    - `x, y, w, h, r, b` Attribute (시멘틱 요소는 제외)
    - child로 task 노드 가질 수 있음 (파싱 후 사라짐)

### 시멘틱 요소

* 공통: `display: none`

```html
<!--Hidden-->
<as-task></as-task> : 없음
```

### 컨테이너 요소

* 공통: `position: relative`

```html
<!--
div: 좌표 layout 구성할 때
-->
<is-group></is-group> : div

<!--
반응형 layout 구성할 때 (display: flex)
(예) drop 영역에서 자동 정렬
-->
<is-layout></is-layout> : div
```

### 컴포넌트 구성 요소

* 공통: `position: relative`

```html
<!--HTML 태그를 래핑 함-->
<is-audio src=""></is-audio> : audio
<is-video src=""></is-video> : video
<is-image src=""></is-image> : img
<is-text>텍스트</is-text> : div
```

### 퀴즈 컴포넌트

* 퀴즈 유형별로 개발

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


