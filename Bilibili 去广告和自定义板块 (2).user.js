// ==UserScript==
// @name         Bilibili 去广告和自定义板块
// @namespace    http://tampermonkey.net/
// @version      0.2
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

                新版
                直播：0
                动画：1
                番剧/番剧动态：2
                国产/国产相关：3
                综艺:4
                漫画：5
                音乐：6
                舞蹈：7
                游戏：8
                知识：9
                课堂：10
                科技：11
                运动：12
                汽车：13
                生活：14
                美食：15
                动物圈 16
                鬼畜：17
                时尚：18
                资讯：19
                娱乐：20
                专栏：21
                电影：22
                电视剧 23
                影视：24
                纪录片 25
                */
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