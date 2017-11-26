"use strict";

    // гамбургер меню
    var menuVisible = $('.hamburger-menu-link'),
        menuClose = $('.hamburger-menu__close'),
        menu = $('.hamburger-menu');

    $(menuVisible).on('click touchstart', function(e) {
        e.preventDefault();
        $(menu).addClass('hamburger-menu_visible');
    });

    $(menuClose).on('click touchstart', function(e) {
        e.preventDefault();
        $(menu).removeClass('hamburger-menu_visible');
    });

    //Аккордеон - команда
        $('.team-acco__trigger').on('click touchstart', (e) => {
            e.preventDefault()

        const $this = $(e.target)
        const item = $this.closest('.team-acco__item')
        const container = $this.closest('.team-acco')
        const items = container.find('.team-acco__item')
        const content = item.find('.team-acco__content')
        const otherContent = container.find('.team-acco__content')

        if (!item.hasClass('active')) {

            items.removeClass('active')
            item.addClass('active')
            otherContent.slideUp()
            content.slideDown()

        } else {
            item.removeClass('active')
            content.slideUp()
        }
    });


// Аккордеон в секции меню
        const calculateWidth = () => {
            const wWidth = $(window).width()
            const titles = $('.menu-acco__trigger')
            const titleWidth = titles.width()
            const reqWidth = wWidth - (titleWidth * titles.length)

            return (reqWidth > 550) ? 550 : reqWidth
        }

        const openItem = item => {
            const container = $('.menu-acco')
            const items = $('.menu-acco__item', container)
            const accoText = $('.menu-acco__text', container)
            const activeItem = items.filter('.active__menu')
            const activeContent = activeItem.find('.menu-acco__content')
            const content = item.find('.menu-acco__content')
            const reqWidth = calculateWidth()

            items.removeClass('active__menu');
            item.addClass('active__menu');

            accoText.hide();
            activeContent.animate({ 'width': '0px' });

            content.animate({
                'width': reqWidth + 'px'
            }, () => { accoText.fadeIn() })
        }

        const closeItem = item => {
            item.removeClass('active__menu');

            item.closest('.menu-acco').find('.menu-acco__text')
                .stop(true, true).fadeOut(() => {
                item.find('.menu-acco__content').animate({ 'width': '0px' });
        });
        }

        $('.menu-acco__trigger').on('click touchstart', (e) => {
            e.preventDefault();

        const $this = $(e.target)
        const item = $this.closest('.menu-acco__item')

        item.hasClass('active__menu')
            ? closeItem(item)
            : openItem(item)
    });

        // клик вне аккордеона
        $(document).on('click touchstart', (e) => {
            const $this = $(e.target);

        if (!$this.closest('.menu-acco').length) {
            closeItem($('.menu-acco__item'))
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

    // Модальное окно - отзывы
$(function() {
    $("[data-popup]").fancybox({
        transitionEffect : "slide",
        transitionDuration : 1500,
});
    $('.full-review__close').on('click touchstart', e => {
        e.preventDefault()
    $.fancybox.close();
})
})

    // One page scroll
    const display = $('.maincontent');
    const sections = $('.section');

    let inScroll = false;

    const mobileDetect = new MobileDetect(window.navigator.userAgent);
    const isMobile = mobileDetect.mobile();

    const switchMenuActiveClass = sectionEq => {
        $('.fixed-menu__item').eq(sectionEq).addClass('active')
            .siblings().removeClass('active');
    }

    const performTransition = sectionEq => {
        if (inScroll) return
        inScroll = true

        const position = (sectionEq * -100) + '%';

        display.css({
            'transform': `translate(0, ${position})`,
            '-webkit-transform': `translate(0, ${position})`
        })

        sections.eq(sectionEq).addClass('active')
            .siblings().removeClass('active');

        setTimeout(() => {
            inScroll = false;
        switchMenuActiveClass(sectionEq);
    }, 1300);
    }

    const difineSections = sections => {
        const activeSection = sections.filter('.active');
        return {
            activeSection: activeSection,
            nextSection: activeSection.next(),
            prevSection: activeSection.prev()
        }
    }

    const scrollToSection = direction => {
        const section = difineSections(sections)

        if (inScroll) return;

        if (direction === 'up' && section.nextSection.length) { // вниз
            performTransition(section.nextSection.index())
        }

        if (direction === 'down' && section.prevSection.length) { // вверх
            performTransition(section.prevSection.index())
        }
    }

    $('.wrapper').on({
        wheel: e => {
        const deltaY = e.originalEvent.deltaY;
    let direction = (deltaY > 0)
        ? 'up'
        : 'down'

    scrollToSection(direction);
    },
    touchmove: e => (e.preventDefault())
    });


    $(document).on('keydown', e => {
        const section = difineSections(sections);

    if (inScroll) return

    switch (e.keyCode) {
        case 40: // вверх
            if (!section.nextSection.length) return;
            performTransition(section.nextSection.index());
            break;

        case 38: // вниз
            if (!section.prevSection.length) return;
            performTransition(section.prevSection.index());
            break;
    }
    });

    if (isMobile) {
        $(window).swipe({
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                console.log(direction);
                scrollToSection(direction);
            }
        })
    }

    $('[data-scroll-to]').on('click touchstart', e => {
        e.preventDefault();
    const $this = $(e.currentTarget);
    const sectionIndex = parseInt($this.attr('data-scroll-to'));

    performTransition(sectionIndex);
    });

    //yandex карта
        let myMap
        const init = () => {
            myMap = new ymaps.Map("map", {
                center: [59.93916998692174, 30.309015096732622],
                zoom: 11,
                controls: ['zoomControl', 'fullscreenControl'],
            });

            var coords = [
                    [59.94554327989287, 30.38935262114668],
                    [59.91142323563909, 30.50024587065841],
                    [59.88693161784606, 30.319658102103713],
                    [59.97033574821672, 30.315194906302924],
                ],
                myCollection = new ymaps.GeoObjectCollection({}, {
                    draggable: false,
                    iconLayout: 'default#image',
                    iconImageHref: './img/content/map-marker.svg',
                    iconImageSize: [46, 57],
                    iconImageOffset: [-26, -52]
                });

            for (var i = 0; i < coords.length; i++) {
                myCollection.add(new ymaps.Placemark(coords[i]));
            }

            myMap.geoObjects.add(myCollection);

            myMap.behaviors.disable('scrollZoom');
        }

        ymaps.ready(init);