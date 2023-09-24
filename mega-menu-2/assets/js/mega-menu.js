/*  ---------------------------------------------------
    Template Name: Amin
    Description:  Amin magazine HTML Template
    Author: Colorlib
    Author URI: https://colorlib.com
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    // Humberger Menu
    $(".humberger-open").on('click', function () {
        $(".humberger-menu-wrapper").addClass("show-humberger-menu");
        $(".humberger-menu-overlay").addClass("active");
        $(".nav-options").addClass("humberger-change");
    });

    $(".humberger-menu-overlay").on('click', function () {
        $(".humberger-menu-wrapper").removeClass("show-humberger-menu");
        $(".humberger-menu-overlay").removeClass("active");
        $(".nav-options").removeClass("humberger-change");
    });

    // Search model
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    // Sign Up Form
    $('.signup-switch').on('click', function () {
        $('.signup-section').fadeIn(400);
    });

    $('.signup-close').on('click', function () {
        $('.signup-section').fadeOut(400);
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Hero Slider
    --------------------*/
    var hero_s = $(".hero-slider");
    hero_s.owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false
    });

    /*------------------
        Trending Slider
    --------------------*/
    $(".trending-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ['<span class="arrow_carrot-left"></span>', '<span class="arrow_carrot-right"></span>'],
        dotsEach: 2,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*------------------------
        Latest Review Slider
    --------------------------*/
    $(".lp-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 4,
        dots: true,
        nav: true,
        navText: ['<span class="arrow_carrot-left"></span>', '<span class="arrow_carrot-right"></span>'],
        smartSpeed: 1200,
        autoHeight: false,
        dotsEach: 2,
        autoplay: true,
        responsive: {
            320: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });

    /*------------------------
        Update News Slider
    --------------------------*/
    $(".un-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ['<span class="arrow_carrot-left"></span>', '<span class="arrow_carrot-right"></span>'],
        smartSpeed: 1200,
        autoHeight: false,
        dotsEach: 2,
        autoplay: true
    });

    /*------------------------
        Video Guide Slider
    --------------------------*/
    $(".vg-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ['<span class="arrow_carrot-left"></span>', '<span class="arrow_carrot-right"></span>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*------------------------
        Gallery Slider
    --------------------------*/
    $(".dg-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ['<span class="arrow_carrot-left"></span>', '<span class="arrow_carrot-right"></span>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*------------------
        Video Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
        Barfiller
    --------------------*/
    $('#bar-1').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });
    $('#bar-2').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });
    $('#bar-3').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });
    $('#bar-4').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });
    $('#bar-5').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });
    $('#bar-6').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });

    /*------------------
        Circle Progress
    --------------------*/
    $('.circle-progress').each(function () {
        var cpvalue = $(this).data("cpvalue");
        var cpcolor = $(this).data("cpcolor");
        var cpid = $(this).data("cpid");

        $(this).append('<div class="' + cpid + '"></div><div class="progress-value"></div>');

        if (cpvalue < 100) {

            $('.' + cpid).circleProgress({
                value: '0.' + cpvalue,
                size: 40,
                thickness: 2,
                startAngle: -190,
                fill: cpcolor,
                emptyFill: "rgba(0, 0, 0, 0)"
            });
        } else {
            $('.' + cpid).circleProgress({
                value: 1,
                size: 40,
                thickness: 5,
                fill: cpcolor,
                emptyFill: "rgba(0, 0, 0, 0)"
            });
        }
    });

    $('.circle-progress-1').each(function () {
        var cpvalue = $(this).data("cpvalue");
        var cpcolor = $(this).data("cpcolor");
        var cpid = $(this).data("cpid");

        $(this).append('<div class="' + cpid + '"></div><div class="progress-value"></div>');

        if (cpvalue < 100) {

            $('.' + cpid).circleProgress({
                value: '0.' + cpvalue,
                size: 60,
                thickness: 2,
                startAngle: -190,
                fill: cpcolor,
                emptyFill: "rgba(0, 0, 0, 0)"
            });
        } else {
            $('.' + cpid).circleProgress({
                value: 1,
                size: 60,
                thickness: 5,
                fill: cpcolor,
                emptyFill: "rgba(0, 0, 0, 0)"
            });
        }
    });

    $('.circle-progress-2').each(function () {
        var cpvalue = $(this).data("cpvalue");
        var cpcolor = $(this).data("cpcolor");
        var cpid = $(this).data("cpid");

        $(this).append('<div class="' + cpid + '"></div><div class="progress-value"></div>');

        if (cpvalue < 100) {

            $('.' + cpid).circleProgress({
                value: '0.' + cpvalue,
                size: 200,
                thickness: 5,
                startAngle: -190,
                fill: cpcolor,
                emptyFill: "rgba(0, 0, 0, 0)"
            });
        } else {
            $('.' + cpid).circleProgress({
                value: 1,
                size: 200,
                thickness: 5,
                fill: cpcolor,
                emptyFill: "rgba(0, 0, 0, 0)"
            });
        }
    });

})(jQuery);