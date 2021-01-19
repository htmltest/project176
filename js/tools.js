$(document).ready(function() {

    $('.slider-list').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: true,
        speed: 2000
    });

    $('.slider-main-ctrl-prev').click(function(e) {
        $('.slider-list').slick('slickPrev');
        e.preventDefault();
    });

    $('.slider-main-ctrl-next').click(function(e) {
        $('.slider-list').slick('slickNext');
        e.preventDefault();
    });

    $('.main-next-inner, .main-nav ul li a').click(function(e) {
        var curBlock = $($(this).attr('href'));
        if (curBlock.length == 1) {
            $('html, body').animate({'scrollTop': curBlock.offset().top});
        }
        e.preventDefault();
    });

    $('body').on('click', 'a.about-video-player-preview', function(e) {
        var curPlayer = $(this).parents().filter('.about-video-player');
        $('.about-video-player-content').html('');
        $('.about-video-player.start').removeClass('start');
        curPlayer.find('.about-video-player-content').html('<iframe width="560" height="315" src="' + $(this).attr('href') + '?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        curPlayer.addClass('start');
        e.preventDefault();
    });

    $('.about-video-list').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.about-video-player-content').html('');
        $('.about-video-player.start').removeClass('start');
    });

    $('.about-video-prev').click(function(e) {
        $('.about-video-list').slick('slickPrev');
        e.preventDefault();
    });

    $('.about-video-next').click(function(e) {
        $('.about-video-list').slick('slickNext');
        e.preventDefault();
    });

    $('.production-serts-list-inner').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    variableWidth: false,
                    centerPadding: '0',
                    centerMode: true
                }
            }
        ]
    });

    $('.production-serts-prev').click(function(e) {
        $('.production-serts-list-inner').slick('slickPrev');
        e.preventDefault();
    });

    $('.production-serts-next').click(function(e) {
        $('.production-serts-list-inner').slick('slickNext');
        e.preventDefault();
    });

    $('body').on('click', '.window-link', function(e) {
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('.mobile-menu-link').click(function(e) {
        if ($('html').hasClass('mobile-menu-open')) {
            $('html').removeClass('mobile-menu-open');
            $('meta[name="viewport"]').attr('content', 'width=device-width');
            $('.wrapper').css('margin-top', 0);
            $(window).scrollTop($('html').data('scrollTop'));
        } else {
            var curWidth = $(window).width();
            if (curWidth < 320) {
                curWidth = 320;
            }
            var curScroll = $(window).scrollTop();
            $('html').addClass('mobile-menu-open');
            $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
            $('html').data('scrollTop', curScroll);
            $('.wrapper').css('margin-top', -curScroll);
        }
        e.preventDefault();
    });

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $('form').each(function() {
        initForm($(this));
    });

});

function windowOpen(linkWindow, dataWindow) {
    if ($('.window').length == 0) {
        var curPadding = $('.wrapper').width();
        var curWidth = $(window).width();
        if (curWidth < 320) {
            curWidth = 320;
        }
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
        $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
    } else {
        $('.window').append('<div class="window-loading"></div>')
        $('.window-container').addClass('window-container-preload');
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window-container').length == 0) {
            $('.window').html('<div class="window-container window-container-preload">' + html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');
        } else {
            $('.window-container').html(html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a>');
            $('.window .window-loading').remove();
        }

        window.setTimeout(function() {
            $('.window-container-preload').removeClass('window-container-preload');
        }, 100);

    });
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
        $('.wrapper').css({'top': 0});
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        $(window).scrollTop($('.wrapper').data('curScroll'));
    }
}

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();
    var windowHeight = $(window).height();

    $('.main-nav').each(function() {
        $('.main-nav ul li a').each(function() {
            var curLink = $(this);
            var curBlock = $(curLink.attr('href'));
            if (curBlock.length == 1) {
                if (windowScroll + windowHeight / 2 > curBlock.offset().top) {
                    $('.main-nav ul li.active').removeClass('active');
                    curLink.parent().addClass('active');
                    if (curLink.parent().hasClass('invert')) {
                        $('.main-nav').addClass('invert');
                    } else {
                        $('.main-nav').removeClass('invert');
                    }
                }
            }
        });
    });

});

Pace.on('done', function() {
    $('.revealator-within').removeClass('revealator-within');
    $('.wrapper').addClass('preloadsuccess');

    $(window).trigger('scroll');
});

function initForm(curForm) {
    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

    $('.form-reset input').click(function() {
        window.setTimeout(function() {
            curForm.find('.form-select select').each(function() {
                var curSelect = $(this);
                curSelect.trigger({type: 'select2:select'});
            });
        }, 100);
    });

    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        var options = {
            minimumResultsForSearch: 99
        }

        curSelect.select2(options);
        if (curSelect.find('option:selected').legnth > 0 || curSelect.find('option').legnth == 1 || curSelect.find('option:first').html() != '') {
            curSelect.trigger({type: 'select2:select'})
        }
    });

    curForm.validate({
        ignore: ''
    });
}