// 작성자: pdi1066. 2024-02-28 0028

(() => {
    const BASE = new URL(window.location);
    // console.log('baseURI: ', document.baseURI);
    // console.log('BASE: ', BASE);

    // /taskml.doc/index.html
    const HTML_PATH = BASE.pathname;
    // var root = html.substring(0, html.lastIndexOf('/'));

    var HREF = BASE.searchParams.get('href');
    const VERSION = (()=>{
        const reg = /\/taskml\.doc\/doc\/([\d.x]+)\/.*/ig;
        return reg.exec(HREF)?.[1]
    })();
    const ROOT_DIR = `/taskml.doc/doc/${VERSION}/index`;

    setColorMode();
    loadMD(HREF);

    let timeID;
    document.addEventListener('md-render', (event) => {
console.error('md-render');
        if (timeID) clearTimeout(timeID);
        timeID = setTimeout(() => {
console.error('setPages');
            setPages();
        });
    }, {once: true});

    function setColorMode(){
        let colorMode = window.localStorage.getItem('colorMode');
        if(!colorMode){
            colorMode = 'dark';
            window.localStorage.setItem('colorMode', colorMode);
        }
        if(colorMode === 'dark'){
            document.body.classList.add('dark');
        }else{
            document.body.classList.remove('dark');
        }
    }

    //--------------------------------------
    // 새 (.md) 페이지 적용
    //--------------------------------------
    
    function loadMD(href) {
        console.log('show: ', href);
        if (href){
            if(/^https?:\/\/.+/.test(href)){
                window.location.assign(href);
                return;
            }

            // HTML 파일
            if(/.+\.html?([?#].?)?$/.test(href)){
                console.log('assign: ', href);
                // replace: 이전 페이지가 history에 추가되지 않음
                // window.location.replace(href);
                window.location.assign(href);
                return;
            }
        }

        if (!href) href = 'README';
        if(!/.+\.md$/.test(href.toLowerCase())) href += '.md';

        var block = document.querySelector('md-block');
        block.setAttribute('src', href);
    }

    function setPages(){
        // 링크 경로 수정
        Array.from(document.links)
            .filter(link => {
                // const pathname = link.getAttribute('href');
                // if(pathname.startsWith('#')) return false;
                return (link.origin === BASE.origin);
            })
            .forEach(link => {
                linkURL(link);
            });
        timeID = null;

        // 코드 하이라이트 적용
        hljs.highlightAll();
        // <script src="https://tistory1.daumcdn.net/tistory/3048153/skin/images/highlightjs-line-numbers.min.js?_version_=1658662281"></script>
        hljs.initLineNumbersOnLoad();

        // hash 스크롤
        hashScrolll();
        // 버튼 기능
        setButtons();
    }

    ////////////////////////////////////////
    // 페이지 기능
    ////////////////////////////////////////

    window.addEventListener('hashchange', (event) => {
        // event.preventDefault();
        // var old_url = event.oldURL;
        // var new_url = event.newURL;
        // console.error('old_url: ', decodeURI(old_url));
        // console.error('new_url: ', decodeURI(new_url));
        // console.error('hash: ', window.location.hash);
        // return false;
        hashScrolll();
    });

    function hashScrolll(){
        var selector;
        var hash = window.location.hash;
        if (hash) {
            selector = document.querySelector(decodeURI(hash));
        }else{
            selector = document.querySelector('.markdown-body');
            // const scroller = document.querySelector('.markdown-body-container');
            // scroller.scrollTop = 0;
        }
        selector?.scrollIntoView({behavior: 'smooth'});

        // selector ? selector.scrollIntoView({behavior: 'smooth'}) : dom.scrollTop = 0;
        // var search = window.location.search;
        // window.location.assign(HTML_PATH + search);
    }

    //--------------------------------------
    // 상대 경로를 절대 경로로 수정
    //--------------------------------------

    function linkURL(link) {
        let pathname = link.getAttribute('href');
        // console.log('pathname: ', pathname);
        // console.log('---> link: ', decodeURI(link.href));
        // console.log('html: ', html);
        // console.log('baseURI: ', document.baseURI);

        let url, hash = '';
        if (pathname.includes('#')) {
            if (pathname.startsWith('#')) {
                const hashMark = pathname.indexOf('#');
                hash = pathname.substring(hashMark);
                pathname = pathname.substring(0, hashMark);
                // console.log('pathname: ', pathname);
                url = HREF;
            } else {
                url = (new URL(document.baseURI + pathname)).pathname;
            }
        } else {
            url = (new URL(document.baseURI + pathname)).pathname;
        }

        var search = (link.search ? '&' : '?') + "href=" + url;
        // var search =  "href=" + url;
        console.log('search: ', decodeURI(url));

        Object.assign(link, {
            href: HTML_PATH,
            search: search,
            hash: hash,
            rel: "noreferrer"
        })
    }

    //--------------------------------------
    // 버튼 기능
    //--------------------------------------

    function setButtons(){
        var btn = document.querySelectorAll('.btns');
        btn.forEach((el)=>{
            el.style.display = 'flex';
        });

        setVersionButton();
        setHomeButton();
        setPrevButton();
        setNextButton();

        setDarkButton();
        setTopButton();
    }

    function setVersionButton(){
        var btn = document.querySelector('.versionButton');
        if(VERSION){
            btn.innerHTML = 'Taskml ' + VERSION;
        }else{
            btn.style.display = 'none';
        }

        btn.addEventListener('click', () => {
            var search = "?href=" + ROOT_DIR;
            window.location.assign(HTML_PATH + search);
        });
    }

    // darkButton
    // onclick="document.body.classList.toggle('dark')"
    function setDarkButton(){
        var btn = document.querySelector('.darkButton');
        btn.addEventListener('click', () => {
            document.body.classList.toggle('dark');

            // localStorage에 저장
            const colorMode = document.body.classList.contains('dark') ? 'dark' : 'light';
            window.localStorage.setItem('colorMode', colorMode);
            btn.innerHTML = ((colorMode === 'dark') ? 'light' : 'dark').toUpperCase();
        });

        let colorMode = window.localStorage.getItem('colorMode');
        btn.innerHTML = ((colorMode === 'dark') ? 'light' : 'dark').toUpperCase();
    }

    // topButton
    // onclick="document.body.scrollIntoView({ behavior: 'smooth' })"
    function setTopButton(){
        var dom = document.querySelector('.markdown-body-container');

        var btn = document.querySelector('.topButton');
        btn.addEventListener('click', () => {
            // document.body.scrollIntoView({behavior: 'smooth'});
            window.location.hash = '';
            hashScrolll();
        });

        const display = btn.style.display;
        btn.style.display = 'none';

        dom.addEventListener('scroll', function () {
            // if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            if (dom.scrollTop > 20) {
                btn.style.display = display;
            } else {
                btn.style.display = 'none';
            }
        });
    }

    function setHomeButton(){
        var btn = document.querySelector('.homeButton');
        btn.addEventListener('click', () => {
            window.location.assign(HTML_PATH);
        });
    }

    function setPrevButton(){
        var btn = document.querySelector('.prevButton');
        btn.addEventListener('click', () => {
            history.go(-1);
        });
    }
    function setNextButton(){
        var btn = document.querySelector('.nextButton');
        btn.addEventListener('click', () => {
            history.go(1);
        });
    }
})();

/*
- https://readme.so/
- https://md-block.verou.me/
- https://cdnjs.com/libraries/github-markdown-css
- https://prismjs.com/
출처: https://doggyfootstep.tistory.com/7 [iOS'DoggyFootstep:티스토리]
*/

// baseURI 설정
(() => {
    var url = new URL(window.location);
    var href = url.searchParams.get('href')
    href = href ? href.substring(0, href.lastIndexOf('/') + 1) : './';

    console.log('baseURI: ', href);
    const base = document.createElement('base');
    base.setAttribute('href', href);
    // document.currentScript.after(base);
    document.head.append(base);
})();