// ==UserScript==
// @name        Test2
// @namespace   Test
// @description TEST
// @match       *://*.bilibili.com/*/*
// @version     1
// @grant       GM_xmlhttpRequest
// @grant       unsafeWindow
// @run-at      document-start
// ==/UserScript==

function addScript(text) {
    text = text.replace("112===i||116===i||120===i||125===i||126===i||127===i", "false");
    var newScript = document.createElement('script');
    newScript.type = "text/javascript";
    newScript.textContent = text;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(newScript);
}

console.log("running....");

var dha = document.head.appendChild;
document.head.appendChild = function(val){
    if (val.src != void 0 && val.src.indexOf("jsc-player.88cefe51.js")!=-1){
        console.log("劫持成功...");
        GM_xmlhttpRequest({
            method: "GET",
            url: val.src,
            onload: function(response) {
                addScript(response.responseText);
                console.log("okok!!");
            }
        });
    }else{
        dha.call(this,val);
    }
}

//   //unsafeWindow.addEventListener('beforescriptexecute', function(e) {
// unsafeWindow.addEventListener('DOMNodeInserted', function(e) {
//     let src = e.target.src;
//     console.log("EventListenerrunning....");
//     if (src.search("https://s1.hdslb.com/bfs/seed/log/report/2.dce30.function.chunk.js") != -1) {
//         debugger;
//         // e.preventDefault();
//         // e.stopPropagation();
//         // GM_xmlhttpRequest({
//         //     method: "GET",
//         //     url: e.target.src,
//         //     onload: function(response) {
//         //         addScript(response.responseText);
//         //         console.log("okok!!");
//         //     }
//         // });

//         console.log("get!!!");
//     }
// });