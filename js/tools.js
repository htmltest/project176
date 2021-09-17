$(document).ready(function() {

    $('.slider-list').each(function() {
        var curList = $(this);
        var curCount = curList.find('.slider-item').length;
        curList.find('.slider-main-ctrl-count').html(curCount);
        curList.find('.slider-item').each(function() {
            var curItem = $(this);
            curItem.find('.slider-main-ctrl-current').html(curItem.index() + 1);
        });
    });

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
        var playerID = 'player_' + Date.now();
        curPlayer.find('.about-video-player-content').html('<div id="' + playerID + '"></div>');
        LimelightPlayerUtil.embed({
            'height': '321',
            'width': '540',
            'mediaId': $(this).attr('data-id'),
            'playerId': playerID,
            'playerForm': 'LVPPlayer',
            'autoplay': true
        });
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

    $('body').on('click', '.window-close, .window-close-btn', function(e) {
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

    $.validator.addMethod('inputDate',
        function(curDate, element) {
            if (this.optional(element) && curDate == '') {
                return true;
            } else {
                if (curDate.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
                    return true;
                } else {
                    $.validator.messages['inputDate'] = 'Дата введена некорректно';
                    return false;
                }
            }
        },
        ''
    );

    $('form').each(function() {
        initForm($(this));
    });

    $('body').on('click', '.external-link', function(e) {
        windowOpenHTML( '<div class="window-external">' +
                            '<div class="window-external-title">Вы переходите<br /> с веб-сайта компании «Верофарм» на сторонний веб-сайт</div>' +
                            '<div class="window-external-text">Ссылки, с помощью которых вы можете перейти с веб-сайтов компании «Верофарм», не контролируются компанией «Верофарм», и компания «Верофарм» не несет ответственности за содержание таких веб-сайтов и любые другие ссылки на таких сайтах. Компания «Верофарм» предоставляет вам эти ссылки исключительно для удобства, и включение таких ссылок не подразумевает авторизацию компанией Верофарм связанного сайта.</div>' +
                            '<div class="window-external-confirm">Вы хотите продолжить и покинуть этот веб-сайт?</div>' +
                            '<div class="window-external-btns">' +
                                '<a href="' + $(this).attr('href') + '">Да</a>' +
                                '<a href="#" class="window-close-btn">Нет</a>' +
                            '</div>' +
                        '</div>');
        e.preventDefault();
    });

    $('.form-add-link a').click(function(e) {
        var curID = Date.now();
        var newHTMLTEXT = $('.page-form-add-block').html();
        newHTMLTEXT = newHTMLTEXT.replace(/_ID_/g, curID);
        $('<div class="form-add-other">' + newHTMLTEXT + '</div>').insertBefore('.form-add-link');
        var curForm = $('.form-add-other:last');

        curForm.find('.form-input-date input').mask('00.00.0000');
        curForm.find('.form-input-date input').attr('autocomplete', 'off');
        curForm.find('.form-input-date input').addClass('inputDate');

        curForm.find('.form-input-date input').on('keyup', function() {
            var curValue = $(this).val();
            if (curValue.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
                var isCorrectDate = true;
                var userDate = new Date(curValue.substr(6, 4), Number(curValue.substr(3, 2)) - 1, Number(curValue.substr(0, 2)));
                if ($(this).attr('min')) {
                    var minDateStr = $(this).attr('min');
                    var minDate = new Date(minDateStr.substr(6, 4), Number(minDateStr.substr(3, 2)) - 1, Number(minDateStr.substr(0, 2)));
                    if (userDate < minDate) {
                        isCorrectDate = false;
                    }
                }
                if ($(this).attr('max')) {
                    var maxDateStr = $(this).attr('max');
                    var maxDate = new Date(maxDateStr.substr(6, 4), Number(maxDateStr.substr(3, 2)) - 1, Number(maxDateStr.substr(0, 2)));
                    if (userDate > maxDate) {
                        isCorrectDate = false;
                    }
                }
                if (isCorrectDate) {
                    var myDatepicker = $(this).data('datepicker');
                    if (myDatepicker) {
                        var curValueArray = curValue.split('.');
                        myDatepicker.selectDate(new Date(Number(curValueArray[2]), Number(curValueArray[1]) - 1, Number(curValueArray[0])));
                        myDatepicker.show();
                        $(this).focus();
                    }
                } else {
                    $(this).addClass('error');
                    return false;
                }
            }
        });

        curForm.find('.form-input-date input').each(function() {
            var minDateText = $(this).attr('min');
            var minDate = null;
            if (typeof (minDateText) != 'undefined') {
                var minDateArray = minDateText.split('.');
                minDate = new Date(Number(minDateArray[2]), Number(minDateArray[1]) - 1, Number(minDateArray[0]));
            }
            var maxDateText = $(this).attr('max');
            var maxDate = null;
            if (typeof (maxDateText) != 'undefined') {
                var maxDateArray = maxDateText.split('.');
                maxDate = new Date(Number(maxDateArray[2]), Number(maxDateArray[1]) - 1, Number(maxDateArray[0]));
            }
            if ($(this).hasClass('maxDate1Year')) {
                var curDate = new Date();
                curDate.setFullYear(curDate.getFullYear() + 1);
                curDate.setDate(curDate.getDate() - 1);
                maxDate = curDate;
                var maxDay = curDate.getDate();
                if (maxDay < 10) {
                    maxDay = '0' + maxDay
                }
                var maxMonth = curDate.getMonth() + 1;
                if (maxMonth < 10) {
                    maxMonth = '0' + maxMonth
                }
                $(this).attr('max', maxDay + '.' + maxMonth + '.' + curDate.getFullYear());
            }
            var startDate = new Date();
            if (typeof ($(this).attr('value')) != 'undefined') {
                var curValue = $(this).val();
                if (curValue != '') {
                    var startDateArray = curValue.split('.');
                    startDate = new Date(Number(startDateArray[2]), Number(startDateArray[1]) - 1 , Number(startDateArray[0]));
                }
            }
            $(this).datepicker({
                language: 'ru',
                minDate: minDate,
                maxDate: maxDate,
                startDate: startDate,
                toggleSelected: false
            });
            if (typeof ($(this).attr('value')) != 'undefined') {
                var curValue = $(this).val();
                if (curValue != '') {
                    var startDateArray = curValue.split('.');
                    startDate = new Date(Number(startDateArray[2]), Number(startDateArray[1]) - 1 , Number(startDateArray[0]));
                    $(this).data('datepicker').selectDate(startDate);
                }
            }
        });

        e.preventDefault();
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

function windowOpenHTML(html) {
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

    if ($('.window-container').length == 0) {
        $('.window').html('<div class="window-container window-container-preload">' + html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');
    } else {
        $('.window-container').html(html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a>');
        $('.window .window-loading').remove();
    }

    window.setTimeout(function() {
        $('.window-container-preload').removeClass('window-container-preload');
    }, 100);
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
    if (!$('.wrapper').hasClass('preloadsuccess')) {
        $('.revealator-within').removeClass('revealator-within');
        $('.wrapper').addClass('preloadsuccess');
        $('body').addClass('preloadsuccess_one');

        $(window).trigger('scroll');
    }
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

    curForm.find('.form-input-date input').mask('00.00.0000');
    curForm.find('.form-input-date input').attr('autocomplete', 'off');
    curForm.find('.form-input-date input').addClass('inputDate');

    curForm.find('.form-input-date input').on('keyup', function() {
        var curValue = $(this).val();
        if (curValue.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
            var isCorrectDate = true;
            var userDate = new Date(curValue.substr(6, 4), Number(curValue.substr(3, 2)) - 1, Number(curValue.substr(0, 2)));
            if ($(this).attr('min')) {
                var minDateStr = $(this).attr('min');
                var minDate = new Date(minDateStr.substr(6, 4), Number(minDateStr.substr(3, 2)) - 1, Number(minDateStr.substr(0, 2)));
                if (userDate < minDate) {
                    isCorrectDate = false;
                }
            }
            if ($(this).attr('max')) {
                var maxDateStr = $(this).attr('max');
                var maxDate = new Date(maxDateStr.substr(6, 4), Number(maxDateStr.substr(3, 2)) - 1, Number(maxDateStr.substr(0, 2)));
                if (userDate > maxDate) {
                    isCorrectDate = false;
                }
            }
            if (isCorrectDate) {
                var myDatepicker = $(this).data('datepicker');
                if (myDatepicker) {
                    var curValueArray = curValue.split('.');
                    myDatepicker.selectDate(new Date(Number(curValueArray[2]), Number(curValueArray[1]) - 1, Number(curValueArray[0])));
                    myDatepicker.show();
                    $(this).focus();
                }
            } else {
                $(this).addClass('error');
                return false;
            }
        }
    });

    curForm.find('.form-input-date input').each(function() {
        var minDateText = $(this).attr('min');
        var minDate = null;
        if (typeof (minDateText) != 'undefined') {
            var minDateArray = minDateText.split('.');
            minDate = new Date(Number(minDateArray[2]), Number(minDateArray[1]) - 1, Number(minDateArray[0]));
        }
        var maxDateText = $(this).attr('max');
        var maxDate = null;
        if (typeof (maxDateText) != 'undefined') {
            var maxDateArray = maxDateText.split('.');
            maxDate = new Date(Number(maxDateArray[2]), Number(maxDateArray[1]) - 1, Number(maxDateArray[0]));
        }
        if ($(this).hasClass('maxDate1Year')) {
            var curDate = new Date();
            curDate.setFullYear(curDate.getFullYear() + 1);
            curDate.setDate(curDate.getDate() - 1);
            maxDate = curDate;
            var maxDay = curDate.getDate();
            if (maxDay < 10) {
                maxDay = '0' + maxDay
            }
            var maxMonth = curDate.getMonth() + 1;
            if (maxMonth < 10) {
                maxMonth = '0' + maxMonth
            }
            $(this).attr('max', maxDay + '.' + maxMonth + '.' + curDate.getFullYear());
        }
        var startDate = new Date();
        if (typeof ($(this).attr('value')) != 'undefined') {
            var curValue = $(this).val();
            if (curValue != '') {
                var startDateArray = curValue.split('.');
                startDate = new Date(Number(startDateArray[2]), Number(startDateArray[1]) - 1 , Number(startDateArray[0]));
            }
        }
        $(this).datepicker({
            language: 'ru',
            minDate: minDate,
            maxDate: maxDate,
            startDate: startDate,
            toggleSelected: false
        });
        if (typeof ($(this).attr('value')) != 'undefined') {
            var curValue = $(this).val();
            if (curValue != '') {
                var startDateArray = curValue.split('.');
                startDate = new Date(Number(startDateArray[2]), Number(startDateArray[1]) - 1 , Number(startDateArray[0]));
                $(this).data('datepicker').selectDate(startDate);
            }
        }
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

$(window).on('load resize', function() {

    $('.main-map').each(function() {
        var startWidth = Number($('.main-map-img').attr('data-width'));
        var curWidth = $('.main-map-inner').width();
        var curDiff = curWidth / startWidth;
        $('.main-map-point').each(function() {
            var curPoint = $(this);
            curPoint.css({'left': curDiff * Number(curPoint.attr('data-left')) + 'px', 'top': curDiff * Number(curPoint.attr('data-top')) + 'px'});
        });
    });

});

$(document).ready(function() {

    $('.main-map-point-icon').click(function() {
        if ($(window).width() < 1200) {
            var curScroll = $(window).scrollTop();
            $('html').addClass('main-map-point-open');
            $('.wrapper').css({'top': -curScroll});
            $('.wrapper').data('curScroll', curScroll);
        }
        $('.main-map-point.open').removeClass('open');
        $(this).parent().addClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.main-map-point').length == 0 && $('.main-map-point.open').length > 0) {
            $('.main-map-point.open').removeClass('open');
            if ($(window).width() < 1200) {
                $('html').removeClass('main-map-point-open');
                $('.wrapper').css({'top': 0});
                $(window).scrollTop($('.wrapper').data('curScroll'));
            }
        }
    });

    $('.main-map-point-window-close').click(function(e) {
        $('.main-map-point.open').removeClass('open');
        if ($(window).width() < 1200) {
            $('html').removeClass('main-map-point-open');
            $('.wrapper').css({'top': 0});
            $(window).scrollTop($('.wrapper').data('curScroll'));
        }
        e.preventDefault();
    });

});

var captchaKey = '6Ldk5DMUAAAAALWRTOM96EQI_0OApr59RQHoMirA';
var captchaArray = [];

var onloadCallback = function() {
    $('.g-recaptcha').each(function() {
        var newCaptcha = grecaptcha.render(this, {
            'sitekey' : captchaKey,
            'callback' : verifyCallback,
        });
        captchaArray.push([newCaptcha, $(this)]);
    });
};

var verifyCallback = function(response) {
    for (var i = 0; i < captchaArray.length; i++) {
        if (grecaptcha.getResponse(captchaArray[i][0])) {
            var curInput = captchaArray[i][1].next();
            curInput.val(response);
            curInput.removeClass('error');
            curInput.parent().find('label.error').remove();
        }
    }
};