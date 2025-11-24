# $inject 객체

`$inject`는 TaskML 런타임이 `<script>` HTML태그 코드가 실행되는 순간에만 자동으로 주입해 주는 `실행 컨텍스트 객체` 입니다.  
(taskML 내장 객체 `<task><script></task>` 아님. HTML 태그임)

현재 실행 중인 `<script>` 가
- 어떤 TaskML 리소스(파일/`<define>` 네임스페이스)에 속해 있는지
- 어떤 `<scope>` 안에 들어 있는지
- 어떤 DOM(root/shadowRoot)을 기준으로 봐야 하는지

를 한번에 알려주는 헬퍼 객체입니다.

> 내가 지금 어디에서 실행되고 있는지를 알려주는, 스크립트 전용 컨텍스트

## 언제, 어디에서 $inject를 쓸 수 있나?

### 지원 위치
`$inject`는 TaskML이 파싱해서 실행하는 `<script>` HTML 태그 안에서 사용할 수 있습니다.

```html
<script>
  console.log($inject.scriptElement);      // 현재 실행 중인 <script> 엘리먼트
  console.log($inject.getRootNode());      // document 또는 shadowRoot
</script>
```

- 일반 `<script>` (type 미지정)
- `type="module"` 스크립트도 TaskML이 감싸서 실행해 줄 때는 동일하게 `$inject` 주입

> ⚠️ 주의  
> HTML 페이지 최상단에서 직접 `<script>` 를 작성하고,  
> TaskML이 관여하지 않는 순수 스크립트는 `$inject`를 사용할 수 없습니다.

### 라이프사이클

- 스크립트 한 블록이 실행되는 동안에만, `window.$inject` 가 일시적으로 등록됩니다.
- 실행이 끝나면 자동으로 `delete window.$inject;`이 수행됩니다.

그래서 이렇게 쓰면 안 되고,
```html
<script>
  console.log($inject.scriptElement);  // ✅ 여기서는 사용 가능

  setTimeout(() => {
    console.log($inject.scriptElement); // ❌ 이 시점에는 이미 사라져 있을 수 있음
  }, 1000);
</script>
```

비동기 코드에서는 반드시 로컬 변수에 보관해서 써야 합니다.
```html
<script>
  const inject = $inject;   // ✅ 미리 캡처

  setTimeout(() => {
    console.log(inject.scriptElement);  // ✅ 안전하게 사용 가능
  }, 1000);
</script>
```

## $inject의 역할과 목적

현재 스크립트 위치 정보를 제공

- 어떤 TaskML 파일/`<define>` 네임스페이스 안인지 (`ns`, `dirname`)
- include 된 문서인지, 본문(root HTML)인지 (`isRootHTML`)
- 어떤 `<scope>` 안에서 실행 중인지 (`tid_scope`, `scopeElement`)

안전한 DOM 접근 헬퍼 제공

- `getRootNode()` : document or shadowRoot
- `scriptElement`, `parentElement`
- `scopeElement`
- `querySelectorAll`, `querySelector` : TaskML owner 기준 필터링

Task 호출 헬퍼 제공

- `$task['taskID'](...)` 처럼 현재 네임스페이스 기준으로 task를 호출

템플릿 검색 헬퍼 제공

- `template(selector, global?)`로 등록된 `<template>` 들을 찾아오는 기능

# 주요 API 정리

## 위치/환경 정보

`tid_scope` : string | undefined
- 현재 스크립트가 속한 `<scope>` 요소의 (임의로 지정된) ID 입니다.
- `<scope>` 안에서 실행 중일 때만 값이 설정됩니다
```js
if ($inject.tid_scope) {
    console.log('scope 안에서 실행 중입니다:', $inject.tid_scope);
}
```

`ns` : string
- 현재 스크립트가 속한 네임스페이스(alias) 입니다.
- `<define ns="quiz">` 안의 스크립트라면 "quiz" 와 같은 값이 됩니다.
- 전역(define 밖)이라면 기본 owner에 해당하는 네임스페이스가 들어갑니다.
```js
console.log('현재 네임스페이스:', $inject.ns);
```

`dirname` : string
- 현재 리소스의 기준 디렉터리 경로입니다.
- TaskML이 사용하는 내부 경로에서 parseOption.resolve() 결과를 돌려줍니다.
```js
console.log('현재 스크립트 기준 디렉터리:', $inject.dirname);
// 상대 경로 계산이나 동적 import 경로 결정 등에 활용 가능
```

`isRootHTML` : boolean
- 이 스크립트가 본문 HTML(root) 에서 실행되는지,
- 아니면 include된 외부 리소스에서 실행되는지를 구분합니다.
```js
if ($inject.isRootHTML) {
    console.log('본문 HTML에서 실행 중');
} else {
    console.log('include/preload된 리소스 내에서 실행 중');
}
```

## Task 접근

`$task` : Record<string, Function>
- 현재 네임스페이스(alias)에 연결된 $task 테이블입니다.

```js
// Global 또는 현재 define NS 기준으로 task 호출
$inject.$task['호출']('타이머');
```

- `<define ns="video">` 안에서 부르면 video 네임스페이스에서 호출을 찾습니다.
- 전역에서 부르면 global task 테이블에서 찾습니다.

> 글로벌 task 호출: 그냥 `$task['호출']()` 도 됩니다.  
> 특정 define 내부 task를 강제로 쓰고 싶다면: `$inject.$task['호출']()` 처럼,  
> 현재 네임스페이스 기준으로 쓰는 패턴이 더 명시적입니다.

## DOM 관련 헬퍼

`getRootNode()` : Node
- `scriptElement.getRootNode()`를 그대로 감싼 함수입니다.
- 결과는 보통 두 가지입니다.
  - document (일반 DOM)
  - ShadowRoot (shadowroot 옵션 사용 시)

```js
const root = $inject.getRootNode();
console.log(root instanceof ShadowRoot ? 'shadow root' : 'document');
```

`scriptElement` : HTMLScriptElement | HTMLElement
- 현재 코드를 가진 요소입니다.
  - `<script>` 태그 안에서 실행되는 경우 그 `<script>` 엘리먼트
  - ~~(향후 확장 시) 인라인 이벤트 핸들러 등에서 쓰일 경우 해당 엘리먼트~~

```js
console.log('현재 스크립트 요소:', $inject.scriptElement);
```

`parentElement` : HTMLElement | null
- `scriptElement.parentElement` 를 그대로 돌려줍니다.
```js
const parent = $inject.parentElement;
if (parent) console.log('스크립트 부모:', parent);
```

`scopeElement` : HTMLElement | null
- 현재 스크립트가 속한 `<scope>` 요소를 찾아줍니다.
- `<scope>` 밖에서 실행하면 null 이 반환됩니다.
```js
const scope = $inject.scopeElement;
if (scope) {
    // 이 scope 안에서만 DOM 찾기
    const items = scope.querySelectorAll('.item');
}
```

> ⚠️ 주의  
> - `$inject.querySelectorAll()`은 scope 기준이 아니라 “owner(문서/리소스)” 기준 필터링입니다.
> - scope 범위로 제한해서 찾고 싶으면, `scopeElement.querySelectorAll()`를 직접 사용해 주세요.

## DOM 탐색 헬퍼

`querySelectorAll(selector: string, ns?: string)` : Element[]
- 내부적으로 `this.getRootNode().querySelectorAll(selector)`를 호출한 뒤,
- TaskML이 관리하는 owner(ns) 정보에 따라 결과를 필터링합니다.
- 같은 리소스/네임스페이스에 속한 요소만 남도록 필터링

```js
// 현재 TaskML 리소스 범위 안에서만 .quiz-box 찾기
const boxes = $inject.querySelectorAll('.quiz-box');
```

전역(document 전체)에서 찾고 싶을 때는 이걸 쓰지 말고,
```js
document.querySelectorAll('.quiz-box');
```
를 사용하시는 게 더 명확합니다.

`querySelector(selector: string)` : Element | null
- `querySelectorAll(selector)[0]`을 편하게 가져오는 헬퍼입니다.
```js
const firstBox = $inject.querySelector('.quiz-box');
```

## 템플릿 검색

`template(selector: string, global = false)` : HTMLTemplateElement[]

TaskML이 관리하는 <template> 리소스를 찾는 헬퍼입니다.
- `global === false` (기본값)
  - 현재 리소스(혹은 `<define>`)에서만 템플릿을 찾습니다.
  - 내부적으로 `getResourceElement(this.#option)` 아래에서 selector 로 검색합니다.
- `global === true`
  - 문서 전체(document) 를 대상으로 selector 로 검색합니다.
  - TaskML 외부 템플릿까지 함께 찾아야 할 때 사용합니다.

```js
// 현재 리소스(혹은 define) 내 템플릿 찾기
const [tmpl] = $inject.template('template#quiz-view');

// 전체 문서에서 템플릿 찾기
const allTemplates = $inject.template('template[data-taskml]', true);
```

> 이 메서드는 템플릿 엘리먼트만 돌려주고,  
> 실제 DOM으로 렌더링하는 것은 별도의 빌더(예: buildTemplate)가 담당합니다.

# 사용 예시

예시 1. 현재 스크립트 위치 정보 로그
```html
<script>
    console.log('ns:', $inject.ns);
    console.log('isRootHTML:', $inject.isRootHTML);
    console.log('dirname:', $inject.dirname);
    console.log('scriptElement:', $inject.scriptElement);
    console.log('rootNode:', $inject.getRootNode());
</script>
```

예시 2. <scope> 안에서 자기 영역만 조작하기
```html
<scope>
    <div class="quiz-box">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
    </div>

    <script>
        const scope = $inject.scopeElement;     // 이 scope 블록
        const items = scope.querySelectorAll('.item');

        items.forEach((item, i) => {
            item.textContent = `선택지 ${i + 1}`;
        });
    </script>
</scope>
```

예시 3. define 네임스페이스 안에서 task 호출하기
```html
<define ns="quiz">
    <task id="정답체크">
        <script>
            console.log('정답 체크!');
            $next();
        </script>
    </task>

    <script>
        // 같은 define(ns="quiz") 안에 있는 task 호출
        $inject.$task['정답체크']();
    </script>
</define>
```

# 주의할 점 정리

일시적인 객체입니다.

- `$inject`는 스크립트 평가 시점에만 window에 등록됩니다.
- 실행이 끝나면 `delete window.$inject;` 로 제거됩니다.
- 비동기 코드에서는 반드시 로컬 변수에 담아서 사용하세요.

전역 스크립트에서는 사용할 수 없습니다.
- TaskML이 파싱·실행하지 않는 순수 HTML `<script>`에서는 `$inject`가 정의되어 있지 않습니다.

DOM 검색 범위에 주의하세요.
- `$inject.querySelectorAll()`은 TaskML 리소스(owner/ns) 기준 필터링을 합니다.
- 페이지 전체를 검색해야 한다면 `document.querySelector(All)` 를 사용하세요.
- scope 제한 검색은 `scopeElement.querySelector(All)` 로 직접 처리하는 것이 더 확실합니다.

내부 구현(`Injection` 클래스, `$provider.$inject` 등)을 직접 건드리지 마세요.
- `$inject`는 런타임이 관리하는 객체입니다.
- 새로운 `Injection` 인스턴스를 직접 생성하거나, `$taskml.$inject` 맵을 직접 조작하는 것은 권장되지 않습니다.




























