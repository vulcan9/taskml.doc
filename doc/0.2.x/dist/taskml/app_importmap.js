// 작성자: pdi1066. 2024-01-10 0010

/******************************************************
 * 배포 라이브러리 사용 설정 :
 * <script data-dev="%DEV%" src="./app_importmap.js"></script>
 *
 * // 생성 결과
 * <link rel="stylesheet" href="../dist/taskml/index-0.2.1.css">
 * <script async src="https://unpkg.com/es-module-shims@1.3.0/dist/es-module-shims.js"></script>
 * <script type="importmap">{"imports":{"/taskml":"../dist/taskml/index-0.2.1.js"}}</script>
 *
 * 개발 모드 설정 :
 *      vite.config.js resolve.alias에 경로 정의됨
 *      resolve: { alias: { "./taskml.js": fileURLToPath(new URL('./index.js', import.meta.url)), } }
 ******************************************************/

// <script type="importmap"> 설정해줌
// https://velog.io/@superlipbalm/everything-you-need-to-know-about-javascript-import-maps
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap
// let name = import.meta.env?.DEV ? 'taskml_dev' : 'taskml';
// modules = await import(/* @vite-ignore */ `./${name}.js`);
// console.log('# modules: ', modules);
// modules.createApp();
// window.$taskml.modules = modules;

(()=>{
    const JS = './index-0.2.1.js';
    const CSS = './index-0.2.1.css';

    // 개발 모드에서는 HTML 환경 변수 대체됨 (import.meta.env)
    // ('%DEV%' => 'true');
    // 개발 환경에서는 vite.config.js 에서 alias 설정 적용되므로 설정 건너뜀
    const isDev = document.currentScript.dataset.dev;
    if(isDev !== '%DEV%') return;

    //------------------------
    // JS
    //------------------------

    // production 모드
    const importMap = {
        imports: {
            '/taskml': JS,
        },
    };
    const script = document.createElement('script');
    script.type = 'importmap';
    script.textContent = JSON.stringify(importMap);
    // document.head.append(script);
    document.currentScript.after(script);

    //------------------------
    // CSS
    //------------------------

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CSS;
    document.currentScript.after(link);
    document.currentScript.remove();
})();
