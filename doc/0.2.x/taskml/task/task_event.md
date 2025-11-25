## task 구성 요소의 이벤트

task 아이템은 공통된 생명 주기를 가집니다.  
이때 발생하는 이벤트를 이용하여 task 실행의 흐름을 제어합니다.

주된 이벤트는 다음과 같습니다.

```html
<!--task에서 발생되는 이벤트-->
<task onstart="alert('start')"
         onstartafter="alert('startAfter')"
         onrun="alert('run')"
         onendBefore="alert('endBefore')"
         onend="alert('end')"
         oncomplete="alert('complete')"
         oncancel="alert('cancel')"
         onerror="alert('error')"></task>
```

### `cancel` 이벤트 vs `error` 이벤트

* `cancel` 이벤트
    - `<cancel>` task에 의해 의도적으로 작업이 중지되었을 때에만 호출됩니다.

* `error` 이벤트
    - 의도하지 않은 에러 발생으로 작업이 중단된 경우 발생합니다.

두 이벤트가 발생하면 이후 task는 중지됩니다.

### `end` 이벤트 vs `complete` 이벤트

* `end` 이벤트
    - 해당 task가 종료되는 시점으로 간주됩니다.
    - `series`로 task가 진행되는 경우 `end` 이벤트 이후에 다음 task가 진행됩니다.

* `complete` 이벤트
    - task 요소에 등록된 이벤트에 의해 다른 task가 실행중이면 이 task까지 모두 종료되었을때 발생합니다.
    - task 종료 시점이 `end` 이벤트를 따르므로 `complete` 이벤트에 의해 실행되는 task는 호출한 task의 이벤트 주기에 영향을 주지 않습니다.
      ```html
      <task id="시작" 
          task:start="외부 실행 1" 
          task:end="외부 실행 2"
          task:complete="외부 실행 3">
          <task id="내부 실행">...</task>
      </task>
      <task task:start="외부 실행 1">...</task>
      <task task:start="외부 실행 2">...</task>
      <task task:start="외부 실행 3">...</task>
      <!--
      "시작" task의 end 시점은 
      "내부 실행", "외부 실행 1" task가 모두 종료(end)된 시점임
      
      "시작" task의 complete 시점은 
      "내부 실행", 및 "외부 실행 1" , "외부 실행 2" task가 모두 종료(end)된 시점임
      
      "외부 실행 3" task는 "시작" task의 이벤트 주기에 영향을 주지 않음
      -->  
      ``` 

## 이벤트 실행 순서

같은 이벤트가 등록된 경우 실행순서는 다음과 같습니다.

```html
<!--
1. 태그에서 정의된 이벤트 on[event]="" attribute 내용이 실행됩니다.
2. 태그에서 정의된 이벤트 task:[event]="" attribute 내용이 실행됩니다.
-->
<task onstart="alert('start')"
         task:start="task 아이디"></task>
```

## task 이벤트 구문

위에서 이벤트를 두가지 방법으로 등록하고 있습니다.  
차이점은 다음과 같습니다

- `on[event]=""` 구문은 JS 코드를 호출합니다.
- `task:[event]=""` 구문은 task 실행을 호출합니다.

```html
<!--on[event]="" 구문은 JS context에서 실행되는 코드 입니다.-->
<task onstart="alert('start')"></task>

<!--task:[event]="" 구문은 "task 아이디"에 해당하sms task를 실행시킵니다.-->
<task task:start="task 아이디"></task>
```










