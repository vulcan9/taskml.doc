
### 기능 확장

* size, position attribute
* task 객체 파싱
* task:event attribute
* task 메서드 호출
    - arguments 전달 가능 (arg 배열 변수로 참조)


* 컨테이너 요소
    - position: relative
    - <is-parent> : div
      + 좌표 layout 구성
    - <is-layout> : div
      + 반응형 layout 구성 (display: flex)
      + (drop 영역에서 자동 정렬)

* 구성 요소
    - position: relative
    - <is-audio src></is-audio> : audio
    - <is-video src></is-video> : video
    - <is-image src></is-image> : img
    - <is-text>텍스트</is-text> : div

Skeletons
```html
<!--container-->
<is-page x="" y="" w="" h="" 
         task="task 아이디 1"
         style class>
  
    <!--DOM 요소-->
    <is-parent>
        <is-audio src></is-audio>
        <is-video src></is-video>
        <is-image src></is-image>
        <is-text>텍스트</is-text>
    </is-parent>
    
</is-page>
```


## 컴포넌트 구성요소 구현

#### 구성 요소 형식 (<as-drag>)

컴포넌트로 캡슐화 하면 디자인 수정에 제약이 생김
- CSS에서 해당 구성 요소에대해 재정의
- child를 기술할 수 없음
- <as-drag> : 태그 형식으로 기술 가능
- 기술할 구문 가독성이 좋음

#### 컨테이너 요소 형식 (<div as-drag>)

컴포넌트 구성요소를 노출시키는 경우
- CSS 디자인 free
- div 컨테이너임
- child를 기술할 수 있음 (child context는 container임)
- <div as-drag> : 기존 div에 attribute 추가하는 것으로 기능 추가됨
- 기술할 구문이 장황해짐 

























