$(document).ready(function() {
    var menuOn = $('.hamburger-menu-link'),
        menu = $('.hamburger-menu');

    $(menuOn).on('click', function(e){
        e.preventDefault();
        $(menu).addClass('hamburger-menu_visible');
    });