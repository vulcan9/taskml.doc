// 작성자: pdi1066. 2024-02-28 0028

(() => {
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

            // hash 스크롤
            var hash = window.location.hash;
            if (hash) {
                var selector = document.querySelector(decodeURI(hash));
                selector?.scrollIntoView({behavior: 'smooth'});
            }

            setButtons();
        });


    }, {once: true});

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
                url = (new URL(document.baseURI + '/' + pathname)).pathname;
            }
        } else {
            url = (new URL(document.baseURI + '/' + pathname)).pathname;
        }

        var search = (link.search ? '&' : '?') + "href=" + url;
        // var search =  "href=" + url;
        // console.log('search: ', url);

        Object.assign(link, {
            href: html,
            search: search,
            hash: hash,
            rel: "noreferrer"
        })
    }

    function loadMD(href) {
        // console.log('show: ', href);
        if (href && /.+\.html?$/.test(href)) return;
        if (!href) href = 'README';
        href += '.md';

        var block = document.querySelector('md-block');
        block.setAttribute('src', href);
    }

    function setButtons(){
        setDarkButton();
        setTopButton();
    }

    // darkButton
    // onclick="document.body.classList.toggle('dark')"
    function setDarkButton(){
        var btn = document.querySelector('.darkButton');
        btn.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            btn.innerHTML = document.body.classList.contains('dark') ? 'LIGHT' : 'DARK';
        });
        btn.innerHTML = document.body.classList.contains('dark') ? 'LIGHT' : 'DARK';
    }

    // topButton
    // onclick="document.body.scrollIntoView({ behavior: 'smooth' })"
    function setTopButton(){
        var btn = document.querySelector('.topButton');
        btn.addEventListener('click', () => {
            document.body.scrollIntoView({behavior: 'smooth'});
        });
        btn.innerHTML = 'TOP';

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
})();

/*
- https://readme.so/
- https://md-block.verou.me/
- https://cdnjs.com/libraries/github-markdown-css
- https://prismjs.com/
출처: https://doggyfootstep.tistory.com/7 [iOS'DoggyFootstep:티스토리]
*/
