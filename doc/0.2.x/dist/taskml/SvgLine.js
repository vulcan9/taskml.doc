// 작성자: pdi1066. 2024-02-20 0020

/*
사용 방법 : lit_01_04_0402_n1_02.html 참고
<div class="dndBox"
     data-dnd-group="page1" data-drag-value="o1" data-drop-value="o1"
     ondrag="drawing(event)" task:fail="오답" task:success="정답"
     data-offset-x="" data-offset-y=""></div>
* */

// svg 사용 라인 그리기
window.$ischool = (function ($ischool = {}) {

    const SVG_NS = 'http://www.w3.org/2000/svg';
    // const USER_ANSWER_LINE = 'user-answer-line';
    // const ANSWER_LINE = 'answer-line';
    // const SVG_SELECTOR = 'draw-line';

    class SvgLine {
        #svg;
        set svg(value){ this.#svg = value; }

        #currentLine;
        #scale = 1;
        // global 좌표에서 svg 위치
        #svgOffset;

        // 선 그리기 (드래그)
        drawing(info) {
            if(!this.#svg) return;
            this.#scale = info.position.scale;

            // 선 그리기
            this.createLine();
            const start = this.getStartPoint(info);
            const end = this.getEndPoint(info);
            this.drawLine(start, end);
        }

        createLine() {
            let line = this.#currentLine;
            if (!line) {
                line = document.createElementNS(SVG_NS, 'line');
                line.classList.add('drawing');
                this.#svg.append(line);
                this.#currentLine = line;
            }
            
            // global 좌표에서 svg 위치
            if (!this.#svgOffset) {
                const rect = this.#svg.getBoundingClientRect();
                this.#svgOffset = {
                    x: -rect.left,
                    y: -rect.top
                };
            }
        }

        finish(removeLine = false) {
            // 라인 지우기
            if(removeLine) this.#currentLine?.remove();

            // this.#svg = null;
            this.#currentLine = null;
            this.#svgOffset = null;
            this.#scale = 1;
        }

        drawLine(start, end) {
            let line = this.#currentLine;
            line.setAttribute('x1', start.x);
            line.setAttribute('y1', start.y);
            line.setAttribute('x2', end.x);
            line.setAttribute('y2', end.y);
        }

        // 드래그가 종료되어 마지막 위치에서 목적지까지 위치 보정 해줌
        // 라인 최종 위치 그리기
        drawingEnd(info) {
            // 선긋기 무효
            const dropArea = info.drop;
            if (!dropArea) return;

            // 라인 최종 위치 찾기
            let dropPoint = this.getDropPoint(info);
            const to = {
                attr: {x2: dropPoint.x, y2: dropPoint.y}
            }

            let line = this.#currentLine;
            gsap.set(line, to);
        }

        // 선긋기 종료
        // animation 중에는 드래그 다시 시작되면 안됨
        fixedDraw(info, done, animation = true) {
            // console.error('info: ', info);

            // 선긋기 무효
            // const dragArea = info.drag;
            const dropArea = info.drop;
            if (!dropArea) {
                this.finish(true);
                done();
                return;
            }

            let line = this.#currentLine;
            // drag end 위치에서 drop 박스 위치로 이동
            // drawingEnd에서 이미 제자리 찾음
            // from = { attr: { x2: end.x, y2: end.y } }
            // to = { attr: {x2: dropPoint.x, y2: dropPoint.y} };
            if (info.success){
                line.classList.remove('drawing');
                this.finish(false);
                return done();
            }

            // 오답인 경우 제자리로 돌아가기
            const start = this.getStartPoint(info);
            // const end = this.getEndPoint(info);
            // let dropPoint = this.getDropPoint(info);

            // 드래그 시작 위치로 되돌아감
            // const from = { attr: {x2: dropPoint.x, y2: dropPoint.y} }
            const to = {attr: {x2: start.x, y2: start.y}}
            to.duration = 0.2;
            to.onComplete = () => {
                this.finish(true);
                done();
            }
            animation ? gsap.to(line, to) : gsap.set(line, to);

            // animation 중에는 드래그 다시 시작되면 안됨
        }

        //----------------------------
        // 좌표 얻기
        //----------------------------

        // point: info.position.start
        // point: info.position.end
        // point: info.position.start
        // point: info.position.dropOrigin
        toGlobal(point, posShift = {x: 0, y: 0}) {
            const x = point.global.x + this.#svgOffset.x + posShift.x;
            const y = point.global.y + this.#svgOffset.y + posShift.y;
            return {
                x: Math.ceil(x / this.#scale),
                y: Math.ceil(y / this.#scale)
            }
        }

        // const pos = info.position;
        // const dragArea = info.drag;
        // const dropArea = info.drop;

        getStartPoint(info) {
            // Drag 영역 좌 상단 기준점 이동
            const dragArea = info.drag;
            const dragOffset = {
                x: (parseInt(dragArea?.dataset.offsetX) || 0) * this.#scale,
                y: (parseInt(dragArea?.dataset.offsetY) || 0) * this.#scale
            }

            const pos = info.position;
            return this.toGlobal(pos.start, dragOffset);
        }

        // 마우스 위치와 라인 끝점 사이 오차 적용
        getEndPoint(info) {
            // 마우스 위치 offset 적용시켜줌 (=== pos.shift)
            const pos = info.position;
            // const shift = pos.shift;

            const event = this.getTouchObj(info.event);
            const mouseShift = {
                x: event.clientX - pos.end.global.x,
                y: event.clientY - pos.end.global.y
            }
            return this.toGlobal(pos.end, mouseShift);
        }

        getDropPoint(info) {
            // Drop 영역 좌 상단 기준점 이동
            const dropArea = info.drop;
            const dropOffset = {
                x: (parseInt(dropArea?.dataset.offsetX) || 0) * this.#scale,
                y: (parseInt(dropArea?.dataset.offsetY) || 0) * this.#scale
            }

            const pos = info.position;
            return this.toGlobal(pos.dropOrigin, dropOffset);
        }

        // 디바이스에서 터치 이벤트 객체 찾기
        getTouchObj(event){
            return ('changedTouches' in event) ? event.changedTouches[0] : event;
        }
    }

    $ischool.svgLine = new SvgLine();
    return $ischool;
})(window.$ischool);