# taskml 요약

## 가장 단순한 사용 예

```html
<!-- 1) Task 정의 -->
<task id="알림">
    <script>
        alert('Hello TaskML');
        $next(); // 다음 Task 아이템으로 진행
    </script>
</task>

<!-- 2) 버튼에서 task:click으로 호출 -->
<button task:click="알림">알림</button>
```

#### 설명:

`<task id="알림">`  (or `<as-task>` (v0.1.x))
- id가 있으면 전역 Task 등록됨.
- id는 중복되면 안 됨.

task 내부 `<script>` (or `<js>` (v0.1.x))
- HTML의 script 태그와는 전혀 상관 없음
- JS 실행 후, 비동기/동기 작업이 끝났을 때 `$next()`를 호출해서 다음 Task 아이템으로 넘어감.

`<button task:click="알림">`
- `task:click="알림"` 이라는 attribute를 붙이면, 클릭 시 "알림" Task를 실행하도록 이벤트 핸들러가 자동으로 붙습니다.
- 이벤트 attribute 값은 내부에서 파싱되어 `runByEvent`로 Task를 실행합니다.

## Task의 구조와 동작 규칙

#### Task 정의 규칙

TaskML에서 “Task”는 크게 다음 규칙을 가집니다:

1. 모든 <task>는 전역으로 관리
    - 위치(본문, 템플릿, 컴포넌트 내부 등)에 상관 없이 한 번 파싱되어 공용 Task 맵에 등록.

2. id 규칙
    - Task에 id가 있으면 그 이름으로 등록됨.
    - id가 없으면 내부적으로 임시 id를 생성해서 사용하기도 하고(중첩 task), 
    - 일부는 “자동 실행(`firstrun`)” 목록에 들어갑니다.

3. src 속성으로 Task 참조
    - `<task id="B" src="A">` ⇒ B라는 새로운 Task가 A를 참조하는 체인으로 등록됩니다.
    - src가 있는 Task 노드는 Task 정의를 참조하는 노드로 취급되고, 자신 아래의 Task 아이템은 무시됩니다.

4. 중첩 Task
    - `<task>` 안에 또 다른 `<task>`가 들어갈 수 있음.

중첩된 Task는 자동 실행 목록에서는 제외되고, 참조 형태로만 사용됩니다.

## 아이디 없는 Task의 자동 실행 (`firstrun`)

- App이 처음 로드될 때, 최상위 depth(=깊이 1)에 있는, id 없는 `<task>` 들을 모아 한 번 자동 실행합니다.
- 이 목록을 sync 옵션(기본 `series`)에 따라 순차/병렬 실행합니다.
- 초기 설정 작업(초기 상태 세팅, 초기 데이터 로드 등)에 쓰기 좋습니다.

## Task 실행 방식

### 1. `<task>`로 Task 실행

`<task>`는 "Task 컨테이너 + Task 호출자" 역할을 합니다:

```html
<!-- 1) 실제 Task 정의 -->
<task id="팝업열기">
    <script>
        document.querySelector('#popup').classList.add('open');
        $next();
    </script>
</task>

<!-- 2) 다른 Task 안에서 다시 호출 -->
<task id="버튼클릭플로우">
    <task src="팝업열기"></task>
    <script>
        console.log('팝업 열림 후 추가 작업');
        $next();
    </script>
</task>
```

- `<task>`는 내부 list를 순서대로 실행하며, 
- 각 TaskItem은 `sync="series | parallel"` 규칙에 따라 처리됩니다. (기본값 `series`)

### 2. 이벤트 attribute로 Task 실행

Task 아이템은 3가지 이벤트 방식을 지원합니다:
```html
<!--다음 "클릭" task를 호출하는 방법-->
<task id="클릭"> ... </task>
```

일반 js 코드를 호출하는 방법
```html
<!--
일반 on 이벤트: 그대로 JS 코드로 실행
-->
<div onclick="console.log('clicked')"></div>
<div onclick="$task['클릭']()"></div>
```

task ID를 호출하는 방법:
```html
<!--
Task 이벤트: 클릭 시 Task 실행.
-->
<task task:click="클릭"></task>
```

```html
<!--
Task 진행 이벤트: 
Task 아이템에는 자체적으로 start, end, complete 이벤트가 있고,
다음과 같이 "on-", "task:-" 두가지 형태로 핸들러를 연결할 수 있습니다.
-->
<task onstart="$task['클릭']()" task:start="클릭" 
      onend="" task:end="" 
      oncomplete="" task:complete=""></task>
```

## Task 매개변수 `$args` 사용

Task를 호출할 때 인자를 넘기면, 각 Task 아이템에서 `$args`로 접근할 수 있습니다.

### 1. JS 안에서 `$args` 사용

```html
<task id="로그">
    <script>
        console.log('전달된 값:', $args[0]);
        $next();
    </script>
</task>
<task task:click="로그('로그 메세지 전달')"></task>

<!--클릭시 출력: '로그 메세지 전달'-->
```
- `$args`는 배열처럼 동작하며, Task 실행 시 전달된 파라미터가 담겨 있습니다.

### 2. attribute 안에서 `$args` 사용

TaskML은 attribute 문자열을 함수 코드로 감싸서 평가하면서 `$args`를 주입합니다.

```html
<!-- if 조건식에서 -->
<task id="조건테스트"
      if="($args[0] === 'then')"
      then="thenTask"
      else="elseTask">
</task>
```
- attribute 값은 내부적으로 유효한 js인지 먼저 평가 후 $args를 attribute에 반영합니다.
- attribute type에 따라 내부적으로 처리:
    - 'string' : 문자열 안의 `$args[...]`를 `${ $args[...] }`로 바꿔서 literal 형태로 평가.
    - 'code' : if 조건식처럼 코드 자체를 평가.
    - 그 외 : 숫자/객체 등 값으로 평가.

## 조건 및 제어용 태그/속성

### 1. if / then / else 속성

`<task>`에 if, then, else 속성을 붙이면 조건 분기를 할 수 있습니다:

```html
<task id="if 테스트"
         if="($args[0] === 'then')"
         then="ifThenTask"
         else="ifElseTask">
</task>
```
- `if`가 true이면 `then`에 지정된 Task 실행 후 현재 Task 계속 진행.
- false이면 `else` Task 실행 또는 아무것도 안 하고 넘어감.
- 조건이 false인 Task는 skip 처리되어 `start/complete` 이벤트가 발생하지 않을 수 있습니다.

### 2. if-break / Break / BreakRelease

긴 루프나 반복 애니메이션을 잠시 멈췄다가 다시 이어갈 때 사용합니다.
- `if-break` 속성 :  true (진행), false (멈춤).
- `<break id="...">` : 해당 지점에서 Task 흐름을 멈춤.
- `<break-release id="...">` : 나중에 이 Task를 실행하면 지정한 `break`를 해제하고 계속 진행.

예시:
```html
<task>
  ...
  <break id="my-break"></break>
  ...
</task>

<!-- 버튼 Task -->
<task id="release break">
    <break-release id="my-break"></break-release>
</task>
```

### 3. <cancel> / <exit>

- `<cancel>` : Task를 취소하고, 상위 Task의 `end`, `complete` 이벤트도 발생하지 않습니다. 
- 대신 cancel 이벤트 발생.
- `<exit>` : 현재 Task만 정상 종료하고 빠져나갑니다 (부모 Task는 계속).

둘 다 `TimerInterface` 기반으로 구현되어 있고, 내부적으로 reject(MSG_CANCEL) / reject(MSG_EXIT)를 사용해서 흐름을 제어합니다.


## 외부 Task 파일 로드: `<task preload>` / `<include>`

### 1. `<task preload="...">` : 파싱 전에 미리 로드

```html
<task preload="./test/include/video.task.html"
      selector="#page"
      shadowroot="open">
</task>
```

- `preload`: Task 파싱 전에 외부 `.task.html` 파일을 읽어와서 템플릿/Task/DOM을 미리 준비합니다.
- `selector`: include 된 DOM을 어디에 붙일지 결정하는 부모 요소의 selector. (없으면 기본은 App 루트 요소)
- `shadowroot`: "open" | "closed" 를 지정하면 해당 요소 아래에 Shadow Root로 DOM 생성. 기본은 open. (false 이면 Shadow Root 사용 안함)

preload는 별도의 provider로 파싱되지만, `$task`와 `$firstrun`은 전역과 공유해서 외부 Task도 전역 Task처럼 사용할 수 있게 합니다.

### 2. `<include src="...">` : 런타임에 가져오기

```html
<task id="파일 불러오기">
  <include src="외부.task.html" selector="#page"></include>
</task>
```
- `<include>`는 Task 실행 시점에 외부 파일을 불러와 DOM/Task/템플릿을 붙입니다.
- Include Task 아이템은 `this.include()`를 `await` 한 후 `timeout(true)`를 호출해서 흐름을 넘깁니다.

### 3. 전체 실행 순서 (요약)

라이브러리 내부 로직상 전체 흐름은 대략 다음 순서로 실행됩니다:

1. Define 영역 파싱
2. Preload Task 파일 로드 & DOM Attach
3. Root 문서 파싱 & DOM Attach
4. Preload 및 모듈 스크립트 실행
5. `domCreated` / `DOMContentLoaded` / `appCreated` 이벤트 디스패치
6. 각 provider에 대해 `firstrun` Task 자동 실행 (define > preload > root 순서)

## 디버깅 & 로그

- debug 모드가 켜져 있으면 Task 실행 로그가 꽤 상세하게 찍힙니다.
- TaskItem 레벨에서도 `[TaskItem 완료]` 같은 로그가 출력됩니다.
- 개발 단계에서는 debug 모드를 켜고, 어떤 Task가 실제로 어떻게 실행·스킵되는지 확인하는 걸 추천합니다.

```html
<template id="taskml" mode="dev">
    ...
</template>
```
