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
            return this.optional(element) || phone_number.match(/^\+\d+$/);
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

    $('.links-filter').each(function() {
        var years = [];
        $('.links-item').each(function() {
            var curYear = Number($(this).attr('data-year'));
            if (years.indexOf(curYear) == -1) {
                years.push(curYear);
            }
        });

        years.sort(function(a, b) {
          if (a < b) return 1;
          if (a == b) return 0;
          if (a > b) return -1;
        });

        for (var i = 0; i < years.length; i++) {
            $('.links-filter').append('<div class="links-filter-item"><a href="#" data-year="' + years[i] + '">' + years[i] + '</a></div>');
        }

        $('.links-filter-item').eq(0).addClass('active');

        updateFilterLinks();
    });

    $('.links-filter-item a').click(function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.links-filter-item.active').removeClass('active');
            curItem.addClass('active');
            updateFilterLinks();
        }
        e.preventDefault();
    });

    $('a').click(function(e) {
        var curBlock = $(this.hash);
        if (curBlock.length > 0) {
            if ($('html').hasClass('mobile-menu-open')) {
                $('html').removeClass('mobile-menu-open');
                $('meta[name="viewport"]').attr('content', 'width=device-width');
                $('.wrapper').css('margin-top', 0);
                $(window).scrollTop($('html').data('scrollTop'));
            }
            $('html, body').animate({'scrollTop': curBlock.offset().top});
            e.preventDefault();
        }
    });

    $('#pregnancyYes').each(function() {
        if ($('#pregnancyYes').prop('checked')) {
            $('#pregnancyDuration').removeClass('hidden');
        } else {
            $('#pregnancyDuration').addClass('hidden');
        }
    });

    $('#pregnancyYes, #pregnancyNo').change(function() {
        if ($('#pregnancyYes').prop('checked')) {
            $('#pregnancyDuration').removeClass('hidden');
        } else {
            $('#pregnancyDuration').addClass('hidden');
        }
    });

    $('#otherYes').each(function() {
        if ($('#otherYes').prop('checked')) {
            $('#otherBlock').removeClass('hidden');
        } else {
            $('#otherBlock').addClass('hidden');
        }
    });

    $('#otherYes, #otherNo').change(function() {
        if ($('#otherYes').prop('checked')) {
            $('#otherBlock').removeClass('hidden');
        } else {
            $('#otherBlock').addClass('hidden');
        }
    });

    $('.up-link').click(function(e) {
        $('html, body').animate({'scrollTop': 0});
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

    if (windowScroll > windowHeight) {
        $('.up-link').addClass('visible');
    } else {
        $('.up-link').removeClass('visible');
    }

    if (windowScroll + windowHeight > $('footer').offset().top) {
        $('.up-link').css({'margin-bottom': (windowScroll + windowHeight) - $('footer').offset().top});
    } else {
        $('.up-link').css({'margin-bottom': 0});
    }

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
    curForm.find('input.phoneRU').mask('+ZZZZZZZZZZZZZZZZZZZZ', {
        translation: {
            'Z': {
                pattern: /[0-9]/, optional: true
            }
        }
    });

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
            toggleSelected: false,
            autoClose: true
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
        ignore: '',
        submitHandler: function(form) {
            var curForm = $(form);
            if (curForm.hasClass('recaptcha-form')) {
                grecaptcha.ready(function() {
                    grecaptcha.execute('6LdHSvgcAAAAAHfkqTliNRLNbN8n4oSa0UJfMCU3', {action: 'submit'}).then(function(token) {
                        $.ajax({
                            type: 'POST',
                            url: curForm.attr('data-captchaurl'),
                            dataType: 'json',
                            data: 'recaptcha_response=' + token,
                            cache: false
                        }).fail(function(jqXHR, textStatus, errorThrown) {
                            alert('Сервис временно недоступен, попробуйте позже.' + textStatus);
                        }).done(function(data) {
                            if (data.status) {
                                form.submit();
                            } else {
                                alert('Не пройдена проверка Google reCAPTCHA v3.');
                            }
                        });
                    });
                });
            } else {
                form.submit();
            }
        }
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

var pageSize = 10;

function updateFilterLinks() {
    var curYear = $('.links-filter-item.active a').attr('data-year');
    $('.links-item').addClass('hidden');
    $('.links-item[data-year="' + curYear + '"]').removeClass('hidden');
    if ($('.links-item:not(.hidden)').length == 0) {
        $('.links-list').addClass('hidden');
        $('.links-empty').addClass('visible');
    } else {
        $('.links-list').removeClass('hidden');
        $('.links-empty').removeClass('visible');
    }

    $('.links-item').removeClass('pager-hidden');
    var countLinks = $('.links-item:not(.hidden)').length;
    var countPages = Math.ceil(countLinks / pageSize);
    if (countPages > 1) {
        var htmlPages = '<div class="pager">' +
                            '<a href="#" class="pager-prev disabled"></a>';
        for (var i = 0; i < countPages; i++) {
            var classActive = '';
            if (i == 0) {
                classActive = ' class="active"';
            }
            htmlPages    +=     '<a href="#"' + classActive + '>' + (i + 1) + '</a>';
        }
        htmlPages    +=     '<a href="#" class="pager-next"></a>' +
                        '</div>';
        $('.links-pager').html(htmlPages);
        $('.links-pager').addClass('visible');

        $('.links-item:not(.hidden)').each(function() {
            var curLink = $(this);
            var curID = $('.links-item:not(.hidden)').index(curLink);
            if (curID >= pageSize) {
                curLink.addClass('pager-hidden');
            }
        });
    } else {
        $('.links-pager').removeClass('visible');
    }
}

$(document).ready(function() {

    $('body').on('click', '.links-pager .pager a', function(e) {
        var curLink = $(this);
        if (curLink.hasClass('pager-prev') && !curLink.hasClass('disabled')) {
            var curActiveID = $('.links-pager .pager a').index($('.links-pager .pager a.active'));
            curActiveID--;
            $('.links-pager .pager a.active').removeClass('active')
            $('.links-pager .pager a').eq(curActiveID).addClass('active')
        } else if (curLink.hasClass('pager-next') && !curLink.hasClass('disabled')) {
            var curActiveID = $('.links-pager .pager a').index($('.links-pager .pager a.active'));
            curActiveID++;
            $('.links-pager .pager a.active').removeClass('active')
            $('.links-pager .pager a').eq(curActiveID).addClass('active')
        } else {
            $('.links-pager .pager a.active').removeClass('active')
            curLink.addClass('active')
        }
        var newActiveID = $('.links-pager .pager a').index($('.links-pager .pager a.active'));
        if (newActiveID == 1) {
            $('.links-pager .pager a.pager-prev').addClass('disabled');
        } else if (newActiveID == $('.links-pager .pager a').length - 2) {
            $('.links-pager .pager a.pager-next').addClass('disabled');
        } else {
            $('.links-pager .pager a.pager-prev').removeClass('disabled');
            $('.links-pager .pager a.pager-next').removeClass('disabled');
        }

        $('.links-item:not(.hidden)').each(function() {
            var curLinkThis = $(this);
            var curID = $('.links-item:not(.hidden)').index(curLinkThis);
            if ((curID >= (newActiveID - 1) * pageSize) && (curID < newActiveID * pageSize)) {
                curLinkThis.removeClass('pager-hidden');
            } else {
                curLinkThis.addClass('pager-hidden');
            }
        });
        
        $('html, body').animate({'scrollTop': $('.links-filter').offset().top});
        
        e.preventDefault();
    });

});