# 사용자 컴포넌트 만들기

- [웹 컴포넌트](https://developer.mozilla.org/ko/docs/Web/API/Web_components/Using_custom_elements)
- [customElements](https://developer.mozilla.org/ko/docs/Web/API/Window/customElements)
- [web-components-examples](https://github.com/mdn/web-components-examples/)

## 웹 컴포넌트 만들기

`CustomElement` 클래스를 상속하고 `customElements`에 등록하면 HTML 표준 웹 컴포넌트가 생성됩니다.
- `CustomElement` 클래스는 `HTMLElement`를 상속합니다.
- 따라서 웹 컴포넌트의 모든 기능을 그대로 사용할 수 있습니다.

taskML에서 컴포넌트를 작성하는 방법입니다.

```html
<div id="app" template="#taskml"></div>

<template id="taskml">

    <script type="module">
        import {CustomElement} from "/taskml";

        console.log('현재 파일 경로: ', `${$inject.dirname}`);

        // <custom-tag> 컴포넌트 로직
        class CustomTag extends CustomElement {
            // $inject 정보 전달 (필수 오버라이딩)
            // $inject 값은 파일마다 값이 다르므로 직접 오버라이딩 해줘야 합니다.
            getInject() {
              return $inject;
            }
        }

        // 컴포넌트 등록
        // 글자 가운데 "-" 를 하나 이상 포함해야 한다
        customElements.define('user-component', CustomTag);
    </script>

</template>
```
따라서, `CustomElement` 클래스를 상속하여 컴포넌트의 기능을 더 확장할 수 있습니다.

[사용자 컴포넌트 네이밍 규칙 (표준)](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define#valid_custom_element_names)
- ASCII 소문자(az)로 시작합니다.
- 하이픈이 포함되어 있습니다
- ASCII 대문자를 포함하지 않습니다
- 다음 특정 문자를 포함하면 컴포넌트 이름으로 사용할 수 없습니다.
  - "annotation-xml"
  - "color-profile"
  - "font-face"
  - "font-face-src"
  - "font-face-uri"
  - "font-face-format"
  - "font-face-name"
  - "missing-glyph"

## 웹 컴포넌트 사용하기

```html
<div id="app" template="#taskml"></div>
<template id="taskml">

    ...

    <!--taskML 내부에서 사용-->
    <user-component></user-component>
</template>

<!--웹 표준 컴포넌트이므로 taskML 바깥에서도 사용 가능합니다.-->
<user-component>
    <slot></slot>
</user-component>
```

# `CustomElement` 클래스

`CustomElement`는 `HTMLElement`를 상속받아 만든 TaskML 전용 베이스 컴포넌트 클래스입니다.

- HTML의 `<template>` 과 `template-data`를 바탕으로
- `render()` 안에서 템플릿을 해석하고
- 필요한 경우 Shadow DOM까지 생성해 준 뒤
- 내부에 TaskML 문법을 다시 파싱해서 실제 DOM으로 붙입니다.

사용자는 이 클래스를 상속받아 자신만의 컴포넌트를 만들고,
`defaultTemplate()`, `defaultTemplateData()`, `getInject()` 등을 오버라이드 하면서 사용하도록 설계돼 있습니다.

```js
import { CustomElement } from "/taskml";

class MyComponent extends CustomElement {
    // 필요 시 여기서 오버라이드…
}
customElements.define("my-component", MyComponent);
```

## 사용자가 오버라이드할 수 있는 부분

### $inject 전달 (필수)

```js
class MyComponent extends CustomElement {
    getInject() {
        // TaskML의 $inject를 이 메서드에서 넘겨야 함
        // 실제 코드에서는 스코프에 맞게 캡처한 $inject 사용
        return $inject;
    }
}
```
- `render()` 안에서 템플릿 리터럴을 평가할 때 두 번째 인자로 전달되는 `$inject`를 어디서 가져올지 정의하는 메서드입니다.
- 기본 구현은 단순히 "오버라이드 하세요"라는 에러 메시지만 찍도록 되어 있기 때문에, 실제 사용할 컴포넌트에서는 반드시 재정의해야 합니다.

### 기본 템플릿 지정할때

```js
class MyComponent extends CustomElement {
    defaultTemplate() {

        // 1) CSS selector 문자열
        return "#my-template";

        // 2) 직접 <template> 요소 반환도 가능
        // return document.querySelector("#my-template");

        // 3) 함수로 감싸서 지연 평가도 가능
        // return () => document.querySelector("#my-template");
    }
}
```
- template attribute가 없을 때 사용할 기본 템플릿입니다.
- 보통은 selector 문자열만 리턴하게 사용하는 것을 권장합니다.

### 기본 템플릿 데이터 지정할때

```js
class MyComponent extends CustomElement {
    defaultTemplateData() {
        // 템플릿에 적용할 원하는 형식의 데이터를 설정
        return {
            title: "기본 제목",
            items: [],
        };
    }
}
```
- `template-data` attribute가 없을 때 쓸 기본 데이터입니다.
- 여기서 객체를 리턴하면, `getTemplateData()`의 첫 번째 분기에서 그대로 사용됩니다.

### Shadow DOM 사용 여부

````html
<my-component useshadowroot="open"></my-component>
<my-component useshadowroot="closed"></my-component>
<my-component useshadowroot="false"></my-component>
````

내부 동작:
```js
setShadowRootMode(mode) {
    if (mode?.toLowerCase() === "false") return (this.#shadowrootMode = false);
    if (mode === "closed")               return (this.#shadowrootMode = "closed");
    this.#shadowrootMode = "open"; // 기본값
}
```
- open / closed 경우 Shadow DOM을 생성하고 그 안에 렌더링
- "false" 문자열이면 Shadow DOM 없이 기존 엘리먼트 내부에 직접 렌더링

### render 자체를 확장하고 싶다면

일반적으로는 render()를 직접 오버라이드하기보다는,

- defaultTemplate()
- defaultTemplateData()
- getInject()

만으로 대부분의 커스텀 UI를 구성하는 것을 권장합니다.  
그래도 필요하면 이렇게 쓸 수 있습니다:

```js
class MyComponent extends CustomElement {
    async render() {
        // 1) 기본 렌더링 먼저 수행
        await super.render();

        // 2) 이후에 DOM 후처리 (이벤트 바인딩, 추가 조작 등)
        const root = this.shadowRoot ?? this;
        const button = root.querySelector("button");
        if (button) {
            button.addEventListener("click", () => {
                console.log("버튼 클릭!");
            });
        }
    }
}
```
이때 주의할 점:

- `connectedCallback` / `attributeChangedCallback`를 오버라이드할 경우
- `super.connectedCallback()` / `super.attributeChangedCallback()` 를 꼭 호출해서
- `callRender()` 흐름을 유지해야 합니다.

# 간단 사용 예시

```html
<!-- 템플릿 정의 -->
<template id="hello-tpl" data-name="user">
    <div class="hello">
        안녕하세요, ${user.name}님!
    </div>
</template>

<script type="module">
    import { CustomElement } from "/taskml";

    // 실제 컴포넌트
    class HelloUser extends CustomElement {
        defaultTemplate() {
            return "#hello-tpl";
        }

        defaultTemplateData() {
            return { name: "손님" };
        }

        getInject() {
            // TaskML 스코프에 맞는 $inject 반환
            return $inject;
        }
    }

    customElements.define("hello-user", HelloUser);
</script>

<!-- 사용 -->
<hello-user template-data="{ name: '토브소프트' }"></hello-user>
```

이렇게 하면:

- `template` 속성을 따로 지정하지 않아도 `#hello-tpl`을 기본 템플릿으로 사용하고,
- `template-data`에 넘긴 객체를 기반으로 `${user.name}` 을 치환한 뒤,
- TaskML 파서를 거쳐 최종 DOM이 `<hello-user>` 또는 shadowRoot 안에 렌더링됩니다.



