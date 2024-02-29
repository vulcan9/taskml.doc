// 작성자: pdi1066. 2024-02-28 0028

(() => {
    const ROOT_DIR = '/taskml.doc/';
    var base = new URL(window.location);
    // console.log('baseURI: ', document.baseURI);
    // console.log('base: ', base);

    // /taskml.doc/index.html
    var html = base.pathname;
    // var root = html.substring(0, html.lastIndexOf('/'));

    var href = base.searchParams.get('href');
    loadMD(href);

    let timeID;
    document.addEventListener('md-render', (event) => {
        if (timeID) clearTimeout(timeID);
        timeID = setTimeout(() => {
            setPages();
        });
    }, {once: true});

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

    /*
    window.addEventListener('hashchange', (event) => {
        event.preventDefault();
        var old_url = event.oldURL;
        var new_url = event.newURL;
        console.error(new_url);
        return false;
    });
    */

    function setPages(){
        // 링크 경로 수정
        Array.from(document.links)
            .filter(link => {
                // const pathname = link.getAttribute('href');
                // if(pathname.startsWith('#')) return false;
                return (link.origin === base.origin);
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

    function hashScrolll(){
        var hash = window.location.hash;
        if (hash) {
            var selector = document.querySelector(decodeURI(hash));
            selector?.scrollIntoView({behavior: 'smooth'});
        }
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
                url = href;
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
            href: html,
            search: search,
            hash: hash,
            rel: "noreferrer"
        })
    }

    //--------------------------------------
    // 버튼 기능
    //--------------------------------------

    function setButtons(){
        setDarkButton();
        setTopButton()
        setHomeButton();
        setPrevButton();
        setNextButton();

        var btn = document.querySelectorAll('.btns');
        btn.forEach((el)=>{
            el.style.display = 'flex';
        })
    }

    // darkButton
    // onclick="document.body.classList.toggle('dark')"
    function setDarkButton(){
        var btn = document.querySelector('.darkButton');
        btn.addEventListener('click', () => {
            document.body.classList.toggle('dark');

            const colorMode = document.body.classList.contains('dark') ? 'dark' : 'light';
            window.localStorage.setItem('colorMode', colorMode);
            btn.innerHTML = ((colorMode === 'dark') ? 'light' : 'dark').toUpperCase();
        });

        // localStorage에 저장
        let colorMode = window.localStorage.getItem('colorMode');
        if(!colorMode){
            colorMode = 'dark';
            window.localStorage.setItem('colorMode', colorMode);
        }
        if(colorMode === 'dark') document.body.classList.add('dark');
        btn.innerHTML = ((colorMode === 'dark') ? 'light' : 'dark').toUpperCase();
    }

    // topButton
    // onclick="document.body.scrollIntoView({ behavior: 'smooth' })"
    function setTopButton(){
        var btn = document.querySelector('.topButton');
        btn.addEventListener('click', () => {
            document.body.scrollIntoView({behavior: 'smooth'});
        });

        const display = btn.style.display;
        btn.style.display = 'none';
        window.addEventListener('scroll', function () {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                btn.style.display = display;
            } else {
                btn.style.display = 'none';
            }
        });
    }

    function setHomeButton(){
        var btn = document.querySelector('.homeButton');
        btn.addEventListener('click', () => {
            window.location.assign(html);
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