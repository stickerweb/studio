"use strict";
function GetHeightCss() {
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var css = "";
    var $window = $(window);
    var windowsize = $window.width();
    if (windowsize > 767) {
        var pad = 0;
    } else {
        var pad = 0;
    }
    var availableheight = h - pad;
    css = '.height-one{ height: ' + availableheight + 'px;}';
    var cssEle = document.getElementById('heightStyle');
    if (cssEle == null) {
        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');
        style.type = 'text/css';
        style.setAttribute("id", "heightStyle");
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
    } else {
        cssEle.innerHTML = css;
    }
}
GetHeightCss();
$(window).on("resize", function() {
    GetHeightCss();
	equalheight('.equal-height > div');
});
var equalheight = function(container) {
    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
    $(container).each(function() {
        $el = $(this);
        $($el).height('auto')
        topPosition = $el.position().top;
        if (currentRowStart != topPosition) {
            for (var currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPosition;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (var currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}
$(window).on("load", function() {
    equalheight('.equal-height > div');
	$('#loading').hide();
});
document.addEventListener('DOMContentLoaded', function() {
    new Typed('.home_title #subtitle', {
        strings: ['Мы предлагаем дизайн, решение и идею.'],
        typeSpeed: 50,
        backSpeed: 20,
        smartBackspace: true,
        loop: false
    });
});
$(function() {
    var worksgrid = $('#portfolio-grid');
    $('a', filters).on('click', function() {
        var selector = $(this).attr('data-filter');
        $('.current', filters).removeClass('current');
        $(this).addClass('current');
        worksgrid.isotope({
            filter: selector
        });
        return false;
    });
    $(window).on('resize', function() {
        var windowWidth = Math.max($(window).width(), window.innerWidth),
            itemWidht = $('.grid-sizer').width(),
            itemHeight = Math.floor(itemWidht * 0.95),
            itemTallHeight = itemHeight * 2;
        if (windowWidth > 500) {
            $('.portfolio-item', worksgrid).each(function() {
                if ($(this).hasClass('tall')) {
                    $(this).css({
                        height: itemTallHeight
                    });
                } else if ($(this).hasClass('wide')) {
                    $(this).css({
                        height: itemHeight
                    });
                } else if ($(this).hasClass('wide-tall')) {
                    $(this).css({
                        height: itemTallHeight
                    });
                } else {
                    $(this).css({
                        height: itemHeight
                    });
                }
            });
        } else {
            $('.portfolio-item', worksgrid).each(function() {
                if ($(this).hasClass('tall')) {
                    $(this).css({
                        height: itemTallHeight
                    });
                } else if ($(this).hasClass('wide')) {
                    $(this).css({
                        height: itemHeight / 2
                    });
                } else if ($(this).hasClass('wide-tall')) {
                    $(this).css({
                        height: itemHeight
                    });
                } else {
                    $(this).css({
                        height: itemHeight
                    });
                }
            });
        }
        worksgrid.isotope();
    }).resize();
    $('.popup-link').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        image: {
            titleSrc: function(item) {
                return item.el.attr('title') + '<small>STICKERWEB</small>';
            }
        }
    });	
    $('.popup-youtube, .popup-vimeo').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
	$("#cf-form").submit(function (e) {
		e.preventDefault();
		var isValid = true;
		var email = $("#email").val();
		$("#name").css("border-color", "#e8eaf6");
		$("#email").css("border-color", "#e8eaf6");
		
		if($("#name").val() == ""){
			$("#name").css("border-color", "red");
			$("#name").focus();
			isValid = false;
		}
		if($("#email").val() == ""){
			$("#email").css("border-color", "red");
			$("#email").focus();
			isValid = false;
		}
		if(!validateEmail(email)){
			$("#email").css("border-color", "red");
			$("#email").focus();
			isValid = false;
		}
		
		if(isValid){
			var form_data = $("#cf-form").serialize();
			$.ajax({
				type: "POST", 
				url: "send-mail.php",
				dataType: "json",
				data: form_data
			}).done(function (data) {
				if(data["status"] == "success"){
					$(".contact-message").html("<span class='sucess'>Благодарим вас! Ваше сообщение успешно отправлено. Мы обязательно свяжемся с вами в ближайшее время!</span>");
				}
				if(data["status"] == "error"){
					$(".contact-message").html("<span class='error'>Произошла ошибка при попытке отправки сообщения. Пожалуйста, попробуйте ещё раз позднее.</span>");
				}
			}).fail(function (data) {
				console.log(data);
			});
		}
	});
});
function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}