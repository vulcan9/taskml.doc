# 외부 파일에 `<define>`이 있는 경우

`<define>`은 `작은 앱/컴포넌트`를 한 덩어리로 격리하는 용도입니다.

## define 안과 밖의 리소스 범위

preload된 파일에 다음과 같이 있을 때:

```html
<define ns="video">
    <task id="클릭">...</task>
</define>
```

- define 안에서 호출: `$task['클릭']` 또는 `$task['video:클릭']`
- 바깥(`global`)에서는 그냥 `$task['video:클릭']`로 보는 게 명확함

똑같은 파일에서, `<define>` 바깥에 다음 코드가 있다면

````html
<task id="클릭">...</task>
````

- 이 Task는 `global`로 취급
- 어디서든 `$task['클릭']`으로 접근 가능
- `<define>` 안에서 전역 Task를 부르고 싶으면 `$task['global:클릭']`처럼 사용
- [namespace 사용 방법](../tag/use_namespace) 참고

요약하면:

- `<define>` 밖의 `<task>` : 전역 Task
- `<define>` 안의 `<task>` : define 전용 Task (ns로 구분)

## preload + define 조합에서 중요한 점

preload 시, 해당 외부 파일 안의 `<define>`은 root보다 먼저 파싱됩니다.
- 커스텀 엘리먼트를 define로 정의해 놓은 경우,
- root DOM을 attach할 때 이미 정의가 끝나 있어서 바로 `<my-component>` 같은 사용자 엘리먼트를 쓸 수 있게 됩니다.

define 안에 있는 Task/템플릿/스크립트 등은 `외부 페이지와 격리된 미니 앱`으로 동작합니다.
- 외부에서 직접 DOM을 건드리는 게 아니라, 그 엘리먼트를 통해 간접 제어하는 형태가 자연스럽습니다.

> - `<define>` 안과 밖의 Task/템플릿 범위는 다르다.
> - preload된 파일의 `<define>`은 root보다 먼저 준비되므로, 
> 커스텀 컴포넌트 정의용으로 쓰기에 좋다.

### task 오버라이딩

같은 id의 Task가 있을 경우, override 규칙을 명시해야 합니다.

- 전역 Task 덮어쓰기: `<task override id="클릭">...</task>`
- 특정 ns 덮어쓰기: `<task override id="video:클릭">...</task>`