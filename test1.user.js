// ==UserScript==
// @name         test1
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.baidu.com/
// @icon         https://www.google.com/s2/favicons?domain=baidu.com
// @grant        none
// ==/UserScript==

(window.onload = function(){
    //@require      https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
    'use strict';
    //var lg = $('#lg');
    //if (lg.length == 1){
    var lgImg = $('#lg img');
    var img = 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/00e93901213fb80e13bf418237d12f2eb938947c.jpg';
    setTimeout(()=>{
        lgImg.attr("src", img);
    },1)
})();