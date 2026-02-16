// ==UserScript==
// @name        body-class-switch-theme-dark-theme-light
// @namespace
// @match       https://www.eni-training.com/portal/client/mediabook/home*
// @match       https://www.eni-training.com/*
// @grant       none
// @version     2026.02.16.09.56
// @author      thomaslinux
// @description switch class between theme-dark and theme-light classes on body on pages that uses class defined dark and light theme but implement no switch button
// ==/UserScript==
// document.body.className = document.body.className.replace("theme-light","theme-dark")

// document.body.className = document.body.className.replace("theme-dark","theme-light")

window.onload = (function() {
    'use strict';

    function toggleTheme() {
        if (document.body.className.includes("theme-dark")) {
            document.body.className = document.body.className.replace("theme-dark", "theme-light");
        } else {
            document.body.className = document.body.className.replace("theme-light", "theme-dark");
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'y') {
            toggleTheme();
        }
    });

})();
