# DOM 컴포넌트

DOM 컴포넌트는 taskml 에서 그렇게 중요한 부분은 아닙니다.  
DOM 컴포넌트를 사용하지 않더라도 기존 HTMl 태그와 `task:[event]` 이벤트 구문 만으로도 taskml은 충분히 잘 동작 합니다.  
단지 DOM 컴포넌트를 만드는 이유는 UI를 빠르게 구성할 수 있는 몇가지 기능을 추가로 제공하기 위함 입니다.

## DOM 컴포넌트 구성 원칙

HTML Select 태그 형식과 같이 구성요소를 최대한 외부로 노출시켜 줍니다.  
이렇게하면 좀더 직관적으로 컴포넌트를 디자인 할 수 있게 됩니다.

* 컴포넌트 구성요소(DOM)를 작업자가 직접 작성할 수 있음
* JS, CSS에서 asset 경로를 분리시킬 수 있게됨

```html
<!--select 태그 (컴포넌트의 조합)-->
<select onclick="call_function();">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
</select>
```

일반적인 컴포넌트 형식은 구성요소가 모두 노출되는 형태입니다.  
이렇게 구성요소를 모두 노출 시켜주면 기능은 그대로 유지하면서 UI를 쉽게 수정할 수 있습니다.

```html
<!--일반 컴포넌트-->
<is-group>
    <is-audio src=""></is-audio>
    <is-video src=""></is-video>
    <is-image src=""></is-image>
    <is-text>텍스트</is-text>
</is-group>
```

기능은 attribute으로 구현하여 기존 태그에 합성할 수 있도록 합니다.

```html
<!--퀴즈 컴포넌트: 드래그-->
<quiz-drag>
    <!--drag 기능 추가됨-->
    <is-image is-drag="a"></is-image>
    <is-image is-drag="b"></is-image>

    <!--drop 인식 기능 추가됨-->
    <is-div is-drop="a, b"></is-divdrop>
</quiz-drag>
```

## 컴포넌트 종류

DOM 컴포넌트는 두가지로 분류됩니다.

* 컨테이너
    - 다른 컴포넌트를 감싸면서 레이아웃(정렬) 방식을 결정합니다.
    - `<div>` 태그를 래핑한 객체입니다.

* 기본 컴포넌트
    - 특정 기능을 하는 태그를 래핑한 객체입니다.
    - 텍스트(`<div>`), 이미지(`<img>`), 비디오(`<video>`), 오디오(`<audio>`) 등

* 확장 컴포넌트
    - 기본 컴포넌트와 task를 합성여 구성한 컴포넌트
    - 새로운 attribute 으로 기능 추가 (예: drag & drop 기능)

### 공통 Attribute

DOM 컴포넌트는 공통적으로 다음 위치 관련 attribute이 구현되어 있습니다.  
이 속성들은 `<is-group>` 컨테이너 안에서만 동작합니다.

```html

<is-group x="" y="" w="" h="" r="0" b="0">
    <is-div x="" y="" w="" h="" r="0" b="0">text</is-div>
</is-group>
<!--
각 attribute 설정값은 다음 style 속성값을 설정합니다.
'left', 'top', 'width', 'height', 'right', 'bottom'

<is-group>의 style이  "position: relative"로 설정되어 있기 때문에
내부 태그들은 정해진 위치와 사이즈를 가질 수 있습니다.
-->
```

> `task:[event]` attribute 구문은 일반 HTML 태그에서도 사용 가능합니다.
