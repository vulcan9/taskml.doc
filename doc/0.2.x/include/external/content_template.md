# 외부 파일에 `<template>`이 있는 경우

## 템플릿 파싱 시점과 범위

preload에서는 템플릿이 가장 먼저 처리됩니다.  
include 파서가 extern.task.html을 읽으면

    1. `<define>` 안의 템플릿
    2. 최상위 `<template>`
    3. 나머지 DOM

순서로 분리해서 파싱합니다.

그래서 본문(root) 쪽에서 템플릿을 안전하게 바로 쓸 수 있습니다.

```html
<!-- extern.task.html -->
<template id="item-tpl">
    <li>${data.label}</li>
</template>

<!-- 본문 -->
<ul template="#item-tpl" template-data="listData"></ul>
```

이런 식으로, 템플릿 정의가 외부 파일에 있어도 preload 덕분에 미리 등록되어서 
root 파싱 단계에서 바로 참조 가능해집니다.

## `<define>` 안에 있는 템플릿

`<define>` 내부의 `<template>`은 그 define 전용으로 취급됩니다.

이때 TaskML이 해주는 것:
- `<define>` 블록 안의 `<style>`, `<link rel="stylesheet">`를 찾아서 내부의 모든 `<template>`에 적용해 줍니다.
- 그리고 원래 `<style>`, `<link>`는 삭제합니다.

결과적으로:
- define 내부 템플릿은 자기 define 안에서만 쓰는 `스코프된 템플릿` 느낌이고,
- define 밖 템플릿은 전역에서 접근 가능한 템플릿입니다.

> preload된 외부 파일의 `<template>`은   
> - `<define>` 바깥에 있으면 전역 템플릿  
> - `<define>` 안에 있으면 해당 define 전용 템플릿
> 
> 으로 취급됩니다.  
> root 문서에서 전역 템플릿을 사용하려면 반드시 `<define>` 바깥에 정의하세요.















