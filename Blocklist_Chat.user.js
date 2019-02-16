// ==UserScript==
// @name         Blocklist_Chat
// @namespace    Leitstellenspiel
// @version      0.2
// @description  Blocklist Chat
// @author       x_Freya_x
// @include      https://www.leitstellenspiel.de/*
// @exclude      https://www.leitstellenspiel.de/verband*
// @exclude      https://www.leitstellenspiel.de/alliance_threads*
// @exclude      https://www.leitstellenspiel.de/alliances*
// @exclude      https://www.leitstellenspiel.de/alliance_logfiles*
// @exclude      https://www.leitstellenspiel.de/schoolings*
// @require      https://code.jquery.com/jquery-3.3.1.js
// ==/UserScript==

(() => {
    'use strict';

    var circle = 'width: 20px; height: 20px; border: 1px solid rgb(255, 153, 0); text-align: center; border-radius: 20px;';
    var i, j;
    var timerId;

    var blockuser = [];

    $(".nav.navbar-nav.navbar-right").not(".hidden-xs").append('<li><a id="blockchatuser" class="blockchatuser"><div id="orange_circle" style="background-color: rgb(255, 153, 0);' + circle + '"><span id="filter" class="glyphicon glyphicon-fire"></span></div></a></li>');

    $("#blockchatuser").click(function() {
        if($('#orange_circle').css('background-color') == 'rgb(255, 153, 0)'){
            $("#orange_circle").css({'background-color':'grey'});
        } else {
            $("#orange_circle").css({'background-color':'rgb(255, 153, 0)'});
        }
    })

    function refreshData()
    {
        var bu = [];

        let cl = document.getElementById('mission_chat_messages');
        let cll = cl.children.length;

        for (i = 0; i < blockuser.length; i++) {
            if (blockuser[i].length > 3) {
                bu.push(blockuser[i]);
            }
        }
        if (bu.length == 0) {
            return;
        }

        if($('#orange_circle').css('background-color') !== 'rgb(255, 153, 0)'){
            for (i = 0; i < cll; i++) {
                let it = cl.children[i];
                let ih = it.innerHTML;
                for (j = 0; j < bu.length; j++) {
                    let ii = ih.indexOf('">' + bu[j]);
                    let iii = ih.indexOf('/profile/')
                    if ((ii !== -1) && (iii !== -1)) {
                        it.style.display = 'none';
                    }
                }
            }
        } else {
            for (i = 0; i < cll; i++) {
                let it = cl.children[i];
                let ih = it.innerHTML;
                for (j = 0; j < bu.length; j++) {
                    let ii = ih.indexOf('">' + bu[j]);
                    let iii = ih.indexOf('/profile/')
                    if ((ii !== -1) && (iii !== -1)) {
                        it.style.display = '';
                    }
                }
            }
            clearInterval(timerId)
        }
    }

    let timerID = setInterval(refreshData, 10000);

})
();
