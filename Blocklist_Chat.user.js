// ==UserScript==
// @name         Blocklist_Chat
// @namespace    Leitstellenspiel
// @version      0.1
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

    var circle = 'width: 20px; height: 20px; border: 1px solid rgb(85, 107, 47); text-align: center; border-radius: 20px;';
    var i, j;
    var timerId;

    const blockuser = ["",""];

    $(".nav.navbar-nav.navbar-right").not(".hidden-xs").append('<li><a id="blockchatuser" class="blockchatuser"><div id="dog_circle" style="background-color: rgb(85, 107, 47);' + circle + '"><span id="filter" class="glyphicon glyphicon-fire"></span></div></a></li>');

    $("#blockchatuser").click(function() {
        if($('#dog_circle').css('background-color') == 'rgb(85, 107, 47)'){
            $("#dog_circle").css({'background-color':'grey'});
        } else {
            $("#dog_circle").css({'background-color':'rgb(85, 107, 47)'});
        }
    })

    function refreshData()
    {
        let cl = document.getElementById('mission_chat_messages');
        let cll = cl.children.length;

        if($('#dog_circle').css('background-color') !== 'rgb(85, 107, 47)'){
            for (i = 0; i < cll; i++) {
                let it = cl.children[i];
                let ih = it.innerHTML;
                for (j = 0; j < blockuser.length; j++) {
                    let ii = ih.indexOf('">' + blockuser[j]);
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
                for (j = 0; j < blockuser.length; j++) {
                    let ii = ih.indexOf('">' + blockuser[j]);
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
