    var menuVisible = $('.hamburger-menu-link'),
        menuClose = $('.hamburger-menu__close'),
        menu = $('.hamburger-menu');

    $(menuVisible).on('click', function(e) {
        e.preventDefault();
        $(menu).addClass('hamburger-menu_visible');
    });

    $(menuClose).on('click', function(e) {
        e.preventDefault();
        $(menu).removeClass('hamburger-menu_visible');
    });


    // var menuVisible = document.querySelector('.hamburger-menu-link'),
    //     menuClose = document.querySelector('.hamburger-menu__close'),
    //     menu = document.querySelector('.hamburger-menu');
    //
    // menuVisible.addEventListener('click', function() {
    //     menu.classList.add('hamburger-menu_visible')
    // });
    //
    // menuClose.addEventListener('click', function() {
    //     menu.classList.remove('hamburger-menu_visible')
    // });
