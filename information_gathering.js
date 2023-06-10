// ==UserScript==
// @name         Intercept All Requests
// @description  Intercept all requests on a website using Tampermonkey
// @version      1
// @match        https://*/*
// @match        http://*/*
// @connect      ywhack.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {

    // 获取所有html注释
    function getHtmlCommentsAll() {
        var comments = [];
        var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_COMMENT);
        while (walker.nextNode()) if (walker.currentNode.data) comments.push(walker.currentNode.data);
        return comments;
    }

    // 获取所有元素属性
    function getElementAttrAll(tagName, attr) {
        var attrValue = [];
        var tag = document.querySelectorAll(tagName);
        tag.forEach(e => {
            if (e[attr]) attrValue.push(e[attr]);
        })
        return attrValue.sort();
    }


    function getInfo() {
        pInfo("HTML 注释")
        pArr(getHtmlCommentsAll());

        pInfo("a href all")
        //console.log(getElementAttrAll('a', 'href'));
        pArr(getElementAttrAll('a', 'href'));

        pInfo("link href all")
        pArr(getElementAttrAll('link', 'href'));

        pInfo("img src all")
        pArr(getElementAttrAll('img', 'src'));

        pInfo("script src all")
        pArr(getElementAttrAll('script', 'src'));
    }


    function pArr(arr) {
        arr.forEach(element => {
            console.log(element);
        });
    }


    function pInfo(s) {
        console.log(`%c=============== ${s} ==================`, 'color: red;font-size:20px;');
    }

    // 记录最近一次按键事件的时间戳
    let lastKeypressTimestamp = 0;

    // 监听全局键盘按下事件
    document.addEventListener("keydown", (event) => {
        // 判断当前按下的键是否为 "L" 键
        if (event.key === "l" || event.key === "L") {
            const timestamp = new Date().getTime();
            // 如果上一次按键事件与本次间隔小于500ms，则表示双击
            if (timestamp - lastKeypressTimestamp < 500) {
                getInfo();
            }
            lastKeypressTimestamp = timestamp;
        }
    });
})()