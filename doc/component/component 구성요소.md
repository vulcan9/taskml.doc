
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
