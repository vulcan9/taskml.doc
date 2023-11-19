# Media API

### get/set 메서드 목록

get, set 메서드와 getter, setter 메서드 모두 사용할 수 있습니다.

```javascript
// 예) src 속성은 다음과 같이 사용 가능합니다.

// get, set 메서드 이용
media.get('src');
media.set('src', '경로 설정');

// 개별 getter/setter 함수 이용
src();
src(value);
```

## 속성

get/set

    - defaultPlaybackRate    : 기본 재생 속도
    - playbackRate           : 현재 재생 속도
    - volume                 : 미디어의 볼륨
    - currentTime            : 현재 재생중인 시간

    - src
    - height
    - width
    - controls
    - loop
    - autoplay
    - preload

get Only

    - duration()
    - buffered()
    - paused()

## 메서드

    - isPaused : 일시 정지 상태인지 여부
    - load() : 로드를 시작합니다.
    - play() : 미디어를 재생합니다.
    - stop() : 미디어 재생을 멈춥니다.
    - togglePlay() : 미디어 재생 toggle
    - pause() : 미디어를 일시 정지합니다.
    - dispose() : 미디어 기능 모두 제거합니다.

풀스크린 관련 함수

    - isFullscreen()
    - toggleFullScreen()

기타
    
    - remainTime() : 남은 재생 시간
    - formatTime(seconds, duration) : 123456 (number) --> 0:12 (string)
    - parseTime(timeText) :  0:12 (string) --> 123456 (number)


## Media 이벤트

```html
loadstart        : 브라우져가 미디어를 찾기 시작할 때 발생
progress        : 브라우져가 미디어 데이터를 가져오는 중에 발생
suspend        : 브라우져가 현재 데이터를 전부다 다운하지 않았는데 미디어 데이터를 가져오는 것이 멈췄을 때 발생, 데이터 다운로드가 중지됨(에러 아님)
stalled        : 데이터 다운로드가 느려짐
abort            : 브라우져가 에러가 아닌 상황에서 미디어 데이터를 가져오는 것을 멈췄을 때 발생, 데이터 다운로드가 중지됨(에러 발생)
error            : 미디어 데이터를 가져오다가 에러가 발생했을 때 발생
emptied        : 미디어의 networkState가 NETWORK_EMPTY상태로 들어가게 되었을 때 발생 (치명적인 오류로 멈추거나, 이미 리소스 선택 알고리즘이 실행중이었는데 load() 함수가 호출되었을 때), 이전의 데이터 비움

play            : 재생되었을 때, play() 함수가 리턴하고나서, autoplay로 인해 재생이 시작되었을 때 호출
pause            : 미디어가 일시정지 되었을 때 발생 (pause()함수가 리턴 되고나서 발생)
loadedmetadata    : 브라우져가 미디어의 길이와 넓이, 높이의 메타정보를 가져왔을 때 발생
loadeddata        : 브라우져가 현재 재생위치에서 미디어 정보를 뿌릴 수 있는 상태로 준비되면 발생
waiting        : 다음 프레임이 로드되지 않아서 재생이 멈추었을 때 발생, 브라우져는 곧 프레임이 가능해질 것이라고 예상하고 있음
playing        : 재생이 시작되었을 때 발생
canplay        : 브라우져가 미디어 데이터의 재생이 가능해질 때 발생, 하지만 지금 재생을 시작하면 이후 버퍼링 속도가 느려서 다시 멈추지 않고 재생이 불가할것이라고 측정 함
canplaythrough    : 브라우저가 현재 재생을 시작하면, 버퍼링 속도와 재생 속도를 고려했을 때 끝까지 멈추지 않고 재생 가능할 것이라고 측정 함
seeking        : seek 동작이 길게 유지되어서 브라우져에서 이벤트 발생이 될정도가 되었을 때 발생
seeked            : seeking이 끝나면 발생
timeupdate        : 현재 재생위치가 바뀌었을 때 발생
ended            : 미디어의 끝에 도달해서 재생이 멈추었을 때 발생
ratechange        : defaultPlaybackRate나 playbackRate의 속성이 변경되었을 때 발생
durationchange  : duration 속성이 바뀌었을 때 발생
volumechange    : volume 속성이 변하거나 muted 속성이 변했을 때 발생
```
