import {
    $args_inject_argString,
    $args_inject_attr,
    $args_inject_onEvent,
    $args_inject_srcID
} from "../src/task/$argsParser.js";

const map = new Map();
// window.map = map;

window.test = function test(id) {
    console.log('id: ', id);
    if (!map.has(id)) return;
    equal(...map.get(id));
}

window.autorun = () => {
    console.log('map: ', map);
    Array.from(map.keys()).forEach(test);
    // for (const id of map) {
    //     setTimeout(()=>{
    //         test(id);
    //     });
    // }
}

////////////////////////////////////////////////////
//
////////////////////////////////////////////////////

function add(a, b, options, id) {
    if (!testDom) return;
    if (!id) {
        id = toJson(a) + ' = ' + toJson(b);
    }
    if (typeof id === 'object') id = JSON.stringify(id);

    const li = document.createElement("li");
    li.innerHTML = id;
    testDom.appendChild(li);

    const num = testDom.childElementCount;
    map.set(id, [
        a, b, li, num, func, options
    ]);

    function toJson(val) {
        try {
            return JSON.stringify(val);
        } catch (err) {
            return val.toString();
        }
    }
}

let testDom;
let $args, func;
const color = {
    title: 'background-color:yellow',
    success: 'background-color:green; color: white;',
    fail: 'background-color:red; color: white;'
}

Object.prototype.equals = function (x) {
    if (typeof x !== "object") return (this === x);
    // Type을 String으로 변환한다.
    var arr1 = JSON.stringify(this);
    var arr2 = JSON.stringify(x);
    return (arr1 === arr2);
}

function equal(a, b, li, num, func, options = []) {

    console.log(`%c[${num}] # 테스트: `, color.title, a);
    let success = false;
    try {
        const val = func($args, a, ...options);
        // success = (val === b);
        success = val.equals(b);
        if (success) {
            console.log('%c # 성공 ', color.success, val)
        } else {
            console.error('%c # 실패 ', color.fail, val, '!==', b);
        }
    } catch (err) {
        console.error(err);
        success = false;
    }
    if (!success) li.style.color = 'red';
}

//-----------------------------
// UI
//-----------------------------

function createButton() {
    const doms = document.querySelectorAll('[test]');
    doms.forEach((dom) => {
        Array.from(dom.children).forEach((el, index) => {
            el.addEventListener('click', (event) => {
                let id = event.target.textContent;
                test(id);
            });
        });
    });
}

function createGroup(title, visible = true) {
    if (!visible) {
        testDom = null;
        return;
    }
    const div = document.createElement("div");
    div.innerHTML = title;
    document.body.appendChild(div);

    const ol = document.createElement("ol");
    ol.setAttribute('test', '');
    document.body.appendChild(ol);
    testDom = ol;
}

////////////////////////////////////////////////////
// 테스트 추가
////////////////////////////////////////////////////

/*
add('', ()=>{

});
*/

createGroup('task:[이벤트] 노드에서 $args inject', true);
$args = [0, 'str', {a: 2, b: 3, c: [0, 1]}, [0, 1, 2]];
func = $args_inject_argString;

add("$args[0]", [0]);
add("$args[1]", ['str']);
add("$args[2]", [{a: 2, b: 3, c: [0, 1]}]);
add("$args[3]", [[0, 1, 2]]);
add(
    "'break 2:start --> ' + $args[1]",
    ['break 2:start --> str']
);
add(
    "'break 2:start --> ' + $args[2]",
    ['break 2:start --> [object Object]']
);
add(
    "'break 2:start --> ' + $args[3]",
    ['break 2:start --> 0,1,2']
);
add("$args[0], $args[1], $args[2], $args[3]", $args);
add("...$args", $args);


// $args, ${$args} 둘다 사용 가능
createGroup('<as-task src> attribute 구문에 ${$args} 값 적용', true);
func = $args_inject_srcID;

add("task 아이디 ${$args[0]}", "task 아이디 0");
add("task 아이디 ${$args[1]}", "task 아이디 str");
add("task 아이디 ${$args[2]}", "task 아이디 [object Object]");
add("task 아이디 ${$args[3]}", "task 아이디 0,1,2");
add("task 아이디 ${$args}", "task 아이디 0,str,[object Object],0,1,2");

add("task 아이디 $args[0]", "task 아이디 0");
add("task 아이디 $args[1]", "task 아이디 str");
add("task 아이디 $args[2]", "task 아이디 [object Object]");
add("task 아이디 $args[3]", "task 아이디 0,1,2");
add("task 아이디 $args", "task 아이디 0,str,[object Object],0,1,2");

createGroup('onclick 형식 이벤트 attribute 구문에 $args 값 적용', true);
func = $args_inject_onEvent;

add("return $args[0]", $args[0]);
add("return $args[1]", $args[1]);
add("return $args[2]", $args[2]);
add("return $args[3]", $args[3]);

add("return `${$args[0]}`", $args[0].toString());
add("return `${$args[1]}`", $args[1].toString());
add("return `${$args[2]}`", $args[2].toString());
add("return `${$args[3]}`", $args[3].toString());

createGroup('일반 attribute 구문에 $args 값 적용', true);
func = $args_inject_attr;

// $args, ${$args} 둘다 사용 가능 (위 task ID 경우와 같음)
add("break ${$args[0]}", "break 0", ['string']);
add("break $args[0]", "break 0", ['string']);

add("'break' + ${$args[0]}", "'break' + 0", ['string']);
add("'break' + $args[0]", "'break' + 0", ['string']);

add("5 + ${$args[0]}", "5 + 0", ['string']);
add("5 + $args[0]", "5 + 0", ['string']);

add("5 + ${$args[0]}", 5, ['number']);
add("${5 + $args[0]}", 5, ['number']);
add("5 + $args[0]", 5, ['number']);

add($args[2], $args[2], ['object']);
add('{a:2, b:3, c: [0, 1]}', $args[2], ['object']);
add("${$args[2]}", $args[2], ['object']);
add("$args[2]", $args[2], ['object']);

add($args[3], $args[3], ['object']);
add('[0,1,2]', $args[3], ['object']);
add("${$args[3]}", $args[3], ['object']);
add("$args[3]", $args[3], ['object']);

createGroup('일반 attribute 구문에 글로벌 변수 값 적용', true);
window.globaVars = {
    key: '글로벌 변수값'
}
add("break ${globaVars.key}", "break 글로벌 변수값", ['string']);
// add("break $args[0]", "break 0", ['string']);





////////////////////////////////////////////////////
// 실행
////////////////////////////////////////////////////

createButton();
autorun();