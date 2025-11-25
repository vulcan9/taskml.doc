# 외부 파일 root에 HTML(DOM) 태그가 있는 경우

대부분의 HTML 태그를 사용할 수 있습니다.  
기술된 HTML 태그는 preloadd 또는 include 노드에 설정된 selector (parent) Element에  attach 됩니다.

## HTML 태그

CSS 내용은 본문에 attach 될때 기존 본문에 정의된 스타일을 덮어쓰기 합니다.  
이를 방지하려면 `shadowroot` 설정을 사용하세요.

```html
<link rel="stylesheet" href="CSS 로드">
<style> ... </style>
```

대부분의 HTML 태그를 attach 시킬 수 있습니다.
```html
<div>DOM 태그</div>
```

## DOM attach 시점

[문서 로드와 실행 순서](../rules/문서_로드와_실행_순서) 내용처럼, preload 시점에는 DOM은 아직 화면에 안 붙습니다.
- 먼저 root 문서의 DOM이 만들어지고
- 그 다음에 selector로 지정한 요소(또는 shadowRoot)에
외부 파일의 `<div>`, `<section>`, `<script>`, `<link>`, ... 등이 붙습니다.

그래서 외부 스크립트에서 root DOM을 참조하는 건,
- root 쪽이 먼저 attach되어 있기 때문에 안전합니다.

반대로, root 쪽에서 외부 DOM을 바로 찾으려 하면,
- 아직 attach 전이라 못 찾을 수 있어요.
- 이 경우엔 `domCreated` / `appCreated` 같은 이벤트 이후에 접근하는 것이 좋습니다.

## style, link 태그

일반 preload 외부 파일의 `<link rel="stylesheet">`, `<style>`은 그 DOM이 붙을 때 같이 parent에 들어갑니다.  

단, `<define>` 안에 있는 `<style>`, `<link>`는 조금 다르게 처리되므로 따로 설명합니다.
- [style 적용 규칙](../rules/rules_style)

실무 가이드로는:

- 전역 스타일은 가능하면 root HTML의 <head>에서 관리하고,
- 외부 파일 안의 `<style>`/`<link>`는 `그 영역 전용 스타일`로 설정하고 쓰는것이 좋습니다.

## script 태그

외부 문서의 root에 작성되는 script 태그는 HTML 태그입니다.  
task 내부에 작성하는 script 노드와 구별하세요

```html
<!--외부 JS-->
<script src="..."></script>
<!--인라인 JS-->
<script>
    console.log('[스크립트 실행]: /test/unit/script.html');
    console.log('[$inject]:', $inject);
</script>

<!--외부 JS 모듈 -->
<script type="module" src="..."></script>
<!--인라인 JS 모듈 -->
<script type="module">
    console.log('[모듈 스크립트 실행]: /test/unit/script.html');
    console.log('[$inject]:', $inject);
</script>

<!--비교-->
<task>
    <script>
        // 여기의 script 노드는 task의 내장 객체 입니다. (예전의 <js> 태그임)
        // 따라서 종료 하려면 $next()를 꼭 호출해 줘야함
        $next();
    </script>
</task>
```

외부 파일 안의 `<script>`는 DOM이 실제로 append될 때 실행됩니다.

- TaskML은 DOM attach 후 내부적으로 non-module script (`<script>`)들을 우선 실행하고,
- module script (`<script type="module">`) 로드는 따로 관리합니다.
- `firstrun` task는 모든 script 로딩이 끝난 뒤에 실행되도록 조정되어 있습니다.
- script가 끝나기 전에 firstrun이 먼저 실행되는 상황은 막아둔 셈입니다.

> preload된 외부 파일의 `<script>`는 DOM이 붙을 때 실행되며,  
> 그 script들이 모두 실행된 이후에 해당 파일의 `firstrun` task가 실행됩니다.

### `<script type="moddule">`
다음은 모듈 스크립트의 일반적인 특징입니다. taskML에서도 그대로 적용됩니다.

- 모듈은 로컬 파일에서 동작하지 않고, HTTP 또는 HTTPS 프로토콜을 통해서만 동작합니다.
- 모듈은 항상 엄격 모드(`use strict`)로 실행됩니다.
- 모듈은 자신만의 스코프가 있습니다.
- 모듈은 최초 호출 시 단 한 번만 실행됩니다
- `import.meta` 객체는 현재 모듈에 대한 정보를 제공해줍니다.
- 모듈 최상위 레벨의 `this`는 `undefined`입니다
- 모듈 스크립트는 항상 지연 실행됩니다.  
  외부 스크립트, 인라인 스크립트와 관계없이 마치 `defer` 속성을 붙인 것처럼 실행됩니다
- 모듈을 여러 위치에서 가져오더라도 모듈 본문은 한 번만 평가됩니다.
- 참고  
  https://ko.javascript.info/modules-intro  
  https://ko.javascript.info/modules-dynamic-imports  
  https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules

### The ES6 Module System 실행 순서
- defer, async 속성은 외부 스크립트에만 사용됨
- module은 항상 defer=true, "use strict" 처럼 동작함
- https://ponyfoo.com/articles/es6-modules-in-depth
- https://jakearchibald.com/2017/es-modules-in-browsers/


