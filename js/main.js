$(document).ready(function() {
    var menuVisible = $('.hamburger-menu-link'),
        menuClose = $('.hamburger-menu__close'),
        menu = $('.hamburger-menu');

    $(menuVisible).on('click', function(e) {
        e.preventDefault();
        $(menu).addClass('hamburger-menu_visible');
    });

    $(menuClose).on('click', function(e) {
        e.preventDefault();
        $(menu).toggleClass('hamburger-menu_visible');
    });
})