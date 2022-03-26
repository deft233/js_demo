// ==UserScript==
// @name         Bilibili 去广告和自定义板块
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  B站页面板块屏蔽(包括旧版和新版)
// @author       caixukun
// @match        *://www.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// ==/UserScript== 

/*
        推广：'reportFirst2'
        赛事：'reportFirst3'
        正在直播：'bili_live'
        动画：'bili_douga'
        番剧：'bili_anime'
        国产：'bili_guochuang'
        漫画：'bili_manga'
        音乐：'bili_music'
        舞蹈：'bili_dance'
        游戏：'bili_game'
        知识：'bili_knowledge'
        课堂：'bili_cheese'
        科技：'bili_tech'
        运动：'bili_sports'
        汽车：'bili_car'
        生活：'bili_life'
        美食：'bili_food'
        动物圈：'bili_animal'
        鬼畜：'bili_kichiku'
        时尚：'bili_fashion'
        资讯：'bili_information'
        娱乐：'bili_ent'
        专栏：'bili_read'
        电影：'bili_movie'
        电视剧：'bili_teleplay'
        影视：'bili_cinephile'
        纪录片；'bili_documentary'

        */
(window.onload = function () {
    'use strict';
    // 全部分区
    /* const bZhanBlocks = ['reportFirst2', 'reportFirst3','bili_car', 'bili_life', 'bili_food', 'bili_animal',
         'bili_live', 'bili_dance', 'bili_game', 'bili_knowledge',
         'bili_douga', 'bili_cheese', 'bili_tech', 'bili_sports',
         'bili_anime', 'bili_guochuang', 'bili_manga', 'bili_music',
         'bili_kichiku', 'bili_fashion', 'bili_information',
         'bili_read', 'bili_movie', 'bili_teleplay', 'bili_cinephile', 'bili_documentary',
         'bili_ent', 'bili_report_spe_rec']

     //自定义分区 请用户使用英文输入法输入
     const bZhanBlocksDIY = ['reportFirst2'];

     bZhanBlocksDIY.forEach(item => {
         document.getElementById(item).style.display = 'none'
     })*/
    const bZhanBlockDIYNew = [];
    //去广告卡片旧版/新版
    let banner = document.getElementsByTagName('section').length ? 'eva-banner' : 'banner-card'
    const newOne = document.getElementsByClassName('bili_grid');
    console.log(newOne);
    if (banner === 'eva-banner') {
        const newBlocks = document.getElementsByClassName('bili-layout');
        newBlocks[0].addEventListener('DOMNodeInserted', function (e) {
            if (e.target.className === 'eva-banner') { e.target.style.display = 'none' }
            else if (e.target.className === 'bili-grid') {
                bZhanBlockDIYNew.push(e.target);
                if (bZhanBlockDIYNew.length === 26) {
                    // bZhanBlockDIYNew[0].style.display = 'none';
                }
                console.log(bZhanBlockDIYNew);
            }

        })
    } else {
        const toRemoveBanner = document.getElementsByClassName(banner);
        toRemoveBanner.forEach(item => {
            item.style.display = 'none';
        })
    }

    // let toRemoveBanner1 = document.getElementsByClassName('first-screen')[0];
    // toRemoveBanner1.style.display = 'none';
    // Your code here...
})();