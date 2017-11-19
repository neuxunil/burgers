    // гамбургер меню
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

// Аккордеон в секции команда
    $('.team-acco__trigger').on('click touchstart', function(e){
        e.preventDefault();
        var wrap = $(e.target).next('.team-acco__content'),
            info = wrap.children('.team-acco__content'),
            item = $(e.target).parent('.team-acco__item');

        item.toggleClass('active__team');
        item.siblings().removeClass('active__team');

        if (item.hasClass('active__team')) {
           info.css({'height' : 0});
            wrap.css({ 'height' : info.height() });
        } else {
            info.css({'height' : 0});
        }
    });

    // Слайдер
    $(function() {
        var screen = $('.slider__list'),
            slide = $('.slider__item'),
            right = $('.arrow--right'),
            left = $('.arrow--left'),
            slideNum = 0,
            scrolling = false;


        var relocate = function (slideNum) { //функция смещения на другой слайд

            if(!scrolling) { //если уже идет скролл, нельзя заново вызвать функцию
                scrolling = true;

                var position = (slideNum * -100) + '%';

                screen.css({
                    '-webkit-transform:' : 'translateX(' + position + ')',
                    '-ms-transform:' : 'translateX(' + position + ')',
                    'transform' : 'translateX(' + position + ')',

                });

                setTimeout(function() {
                    scrolling = false;
                    $('.slider__item').eq(slideNum).addClass('active')
                        .siblings().removeClass('active');
                }, 800);
            }
        }

        $(left).on('click touchstart', function(e){
            e.preventDefault();

            if(!scrolling) { //если уже идет скролл, slideNum нельзя изменить
                if (slideNum > 0) {
                    slideNum--;
                    relocate(slideNum);
                } else {
                    slideNum = slide.length - 1;
                    relocate(slideNum);
                }
            }
        });

        $(right).on('click touchstart', function(e){
            e.preventDefault();

            if(!scrolling) { //если уже идет скролл, slideNum нельзя изменить
                if (slideNum < slide.length - 1) {
                    slideNum++;
                    relocate(slideNum);
                } else {
                    slideNum = 0;
                    relocate(slideNum);
                }
            }
        });
    });