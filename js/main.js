$(document).ready(function() {
    var menuVisible = $('.hamburger-menu-link'),
        menuOff = $('.hamburger-menu__close'),
        menu = $('.hamburger-menu');

    $(menuVisible).on('click touchstart', function (e) {
        e.preventDefault();
        $(menu).addClass('hamburger-menu_visible');
    });

    $(menuOff).on('click touchstart', function (e) {
        e.preventDefault();
        $(menu).toggleClass('hamburger-menu_visible');
    });
})