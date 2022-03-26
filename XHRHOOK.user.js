// ==UserScript==
// @name         XHRHOOK
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://www.bilibili.com/video/BV*
// @match        *://www.bilibili.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @run-at       document-start
// @grant        GM_cookie
// @grant        unsafeWindow
// ==/UserScript==


let SESSDATA = GM_cookie('list', { name: 'SESSDATA', url: '.bilibili.com' }, function (cookies, error) {
    return cookies;
});
console.log(SESSDATA);

function addXMLRequestCallback(callback) {
    var oldSend, i;
    if (XMLHttpRequest.callbacks) {
        // we've already overridden send() so just add the callback
        XMLHttpRequest.callbacks.push(callback);
    } else {
        // create a callback queue
        XMLHttpRequest.callbacks = [callback];
        // store the native send()
        oldSend = XMLHttpRequest.prototype.send;
        // override the native send()
        XMLHttpRequest.prototype.send = function () {
            // process the callback queue
            // the xhr instance is passed into each callback but seems pretty useless
            // you can't tell what its destination is or call abort() without an error
            // so only really good for logging that a request has happened
            // I could be wrong, I hope so...
            // EDIT: I suppose you could override the onreadystatechange handler though
            for (i = 0; i < XMLHttpRequest.callbacks.length; i++) {
                XMLHttpRequest.callbacks[i](this);
            }
            let xhr = this;
            if (xhr.__sentry_xhr__ != void 0 && xhr.__sentry_xhr__.url.indexOf("https://api.bilibili.com/x/player/playurl?cid=") != -1) {
                console.log(xhr.__sentry_xhr__.url);
                //初始化设置cookie函数
                let setCookie = function (val) {
                    let ck = val.split(";");
                    for (let i = 0; i < ck.length; i++) {
                        let key = ck[i].split("=")[0];
                        let value = ck[i].split("=")[1];
                        console.log("setCookie: key: " + key + "    value: " + value);
                        document.cookie = key + "=" + value + "; expires=Tue, 14 Feb 2123 05:47:10 GMT; path=/; domain=.bilibili.com";
                    }
                }
                //缓存cookie
                let cacheCookie = document.cookie;
                let st = this;
                let sa = arguments;
                GM_cookie('list', { name: 'SESSDATA', url: '.bilibili.com' }, function (cookies, error) {
                    console.log(cookies[0]);
                    console.log(SESSDATA);
                    //删除cookie
                    var d = new Date();
                    var n = d.toUTCString();
                    var cookie_cache = document.cookie;
                    var cache = cookie_cache.split(";");
                    for (let i = 0; i < cache.length; i++) {
                        var key = cache[i].split("=")[0];
                        var value = cache[i].split("=")[1];
                        document.cookie = key + "=" + value + ";expires=" + n;
                    }
                    //替换cookie
                    let val = "buvid3=09B7809F-F821-8D10-B251-4B61868764D167578infoc; _uuid=104FBEA55-71037-172B-8CF7-45CCCE7999D569043infoc; buvid4=B53C7A84-AFC8-6916-A6DD-C8064EFE474438453-022020821-Pk1O31qDhl6NRLdaY+99/9eFTvkihtM7XneQYrixmrb/cHO9gX/QSw%3D%3D; fingerprint=7b43c1836ae6513441e5a04c16b98c9b; buvid_fp=9f8de825e6a844c2fc3af0b73ed6ced8; SESSDATA=126f7494%2C1659879752%2C9c169%2A21; bili_jct=b14031ba6dc894d236346d96dbc771d2; DedeUserID=28531621; DedeUserID__ckMd5=f2217c1a36a3dbd8; sid=j9lsvi0z; b_ut=5; blackside_state=1; rpdid=0zbfAHVLEC|12HR1Qtux|ef|3w1NhqLx; LIVE_BUVID=AUTO1616444151486175; bp_video_offset_28531621=625269512274934000; CURRENT_BLACKGAP=0; CURRENT_FNVAL=4048; i-wanna-go-back=2; PVID=1; b_lsid=4C6C6628_17EF06D530B; innersign=1; CURRENT_QUALITY=120";
                    //debugger;
                    setCookie(val);
                    //GM_cookie.list({ url: location.href }, (cookies, error) => {
                    //    console.log(cookies);
                    //})
                    GM_cookie("set", {
                        "name": "SESSDATA",
                        "value": "126f7494%2C1659879752%2C9c169%2A21",
                        "domain": ".bilibili.com",
                        "path": "/",
                        "expiration": Date.parse("Jan 17, 2057") / 1000,
                        "secure": false,
                        "httpOnly": true,
                        "session": false,
                    });
                    // call the native send()
                    oldSend.apply(st, sa);
                    //还原Cookie
                    let ssesdata = setCookie(cacheCookie);
                    GM_cookie("set", {
                        "name": "SESSDATA",
                        "value": cookies[0].value,
                        "domain": ".bilibili.com",
                        "path": "/",
                        "expiration": Date.parse("Jan 17, 2057") / 1000,
                        "secure": false,
                        "httpOnly": true,
                        "session": false,
                    });
                });

            } else {
                // call the native send()
                oldSend.apply(this, arguments);
            }
        }
    }
}


(function () {
    'use strict';
    let SESSDATA = GM_cookie('list', { name: 'SESSDATA', url: '.bilibili.com' }, function (cookies, error) {
        console.log(cookies);
        return cookies;
    });
    console.log(SESSDATA);
    //GM_cookie();
    addXMLRequestCallback(function (xhr) {
        //console.log(xhr.responseURL)
        //console.log(xhr.responseURL.indexOf("https://api.bilibili.com/x/player/playurl?cid="))
        if (xhr.__sentry_xhr__ != void 0 && xhr.__sentry_xhr__.url.indexOf("https://api.bilibili.com/x/player/playurl?cid=") != -1) {
            console.log(xhr.__sentry_xhr__.url);
        }
        xhr.addEventListener("load", function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                //console.log(xhr);
                //console.log( xhr.responseURL );


                //if (xhr.responseURL.indexOf("https://api.bilibili.com/x/player/playurl?cid=")!=-1){
                //   console.log(xhr);
                //}
            }
        });
    });
})();
(window.onload = function () {
    'use strict';
    // 全部分区
    const bZhanBlocks = ['reportFirst2', 'reportFirst3', 'bili_car', 'bili_life', 'bili_food', 'bili_animal',
        'bili_live', 'bili_dance', 'bili_game', 'bili_knowledge',
        'bili_douga', 'bili_cheese', 'bili_tech', 'bili_sports',
        'bili_anime', 'bili_guochuang', 'bili_manga', 'bili_music',
        'bili_kichiku', 'bili_fashion', 'bili_information',
        'bili_read', 'bili_movie', 'bili_teleplay', 'bili_cinephile', 'bili_documentary',
        'bili_ent', 'bili_report_spe_rec']

    //旧版自定义分区 请用户使用英文输入法输入
    const bZhanBlocksDIY = ['reportFirst2'];
    //新版自定义分区 youBlocks = [0,1,2,3...]
    const yourBlocks = [];
    const bZhanBlockDIYNew = [];
    //旧版/新版
    let whatVersion = document.getElementsByTagName('section').length ? 'eva-banner' : 'banner-card';
    //eva-banner新版
    if (whatVersion === 'eva-banner') {
        const newBlocks = document.getElementsByClassName('bili-layout');
        //去除推广区
        document.getElementsByClassName('bili-grid')[2].style.display = 'none';
        //去除赛事栏
       // console.log(document.getElementsByClassName('no-margin'))
        //监听
        newBlocks[0].addEventListener('DOMNodeInserted', function (e) {
            //去广告
            if (e.target.className === 'eva-banner') { e.target.style.display = 'none' }
            else if (e.target.className === 'bili-grid') {
                bZhanBlockDIYNew.push(e.target);
                if (bZhanBlockDIYNew.length === 26) {
                    yourBlocks.forEach(item => {
                        bZhanBlockDIYNew[item].style.display = 'none';
                        console.log(bZhanBlockDIYNew,e.target.className);
                    })
                }    
            }
            //晚上的比赛板块
            else if(e.target.className === 'battle-area'){
                e.target.style.display = 'none';
                    console.log(e.target);
            }
        })
    } else //'banner-card' 旧版
    {
        const toRemoveBanner = document.getElementsByClassName(whatVersion);
        toRemoveBanner.forEach(item => {
            item.style.display = 'none';
        })
        bZhanBlocksDIY.forEach(item => {
            document.getElementById(item).style.display = 'none'
        })
    }
    // Your code here...
})();