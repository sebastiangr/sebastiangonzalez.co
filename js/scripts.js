var main = ( function($){

    var $window             = $(window),
        $homeBanner         = $('#home-banner'),         /** Home Banner */
        $homeBannerH2       = $homeBanner.find('h2'),
        $bannerText         = $('.header-content');

    var settings            = {
            verbose: false
        },
        tapTargets, scrollPos, oneOff;


    var init = function( options ){

        $.extend( settings, options );

        oneOff = true;
        tapTargets = [];

        if( settings.verbose )
            console.log( 'Verbose mode on.' );

        /** Banner Parallax */
        $window.scroll(function () {
            scrollBanner();
        });

        if( settings.verbose)
            console.log( 'All of init fired.' );

    };

    /**
     * Parallax Banner Function
     */
    var scrollBanner = function() {

        if( settings.verbose && oneOff ) {
            console.log('scrollBanner');
            oneOff = false;
        }

        /** Get the scroll position of the page */
        scrollPos = $(this).scrollTop();

        if( settings.verbose)
            console.log( 'Scroll top: ' + scrollPos );

        /** Scroll and fade out the banner text */
        $bannerText.css({
            'margin-top' : ( scrollPos / 3 ) + "px", // Define el movimiento leve hacia abajo al hacer scroll
            'opacity' : 1 - ( scrollPos / 400 ), // En qué posición Y se empieza a desaparecer el div
            '-ms-filter' : 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + 1 - ( scrollPos / 400 ) + ')'
        });

        /** Scroll the background of the banner */
        $homeBanner.css({
            'background-position' : 'center ' + (- scrollPos / 2 ) + "px"
        });
    };


    $(window).scroll(function(){
        if ($(this).scrollTop() > 450) {

            $("header").addClass("black-bg affix");
            $("header .logo img").addClass("header-logo-scroll");
            $(".header-in").addClass("header-fixed");

            // $("header").addClass("black-bg affix").delay(600).queue(function(next){
            //     $('header .logo img').addClass('header-logo-scroll');
            //     $('.header-in').addClass('header-fixed');
            //         // next();
            // });

        } else {

            $("header").removeClass("black-bg affix");
            $("header .logo img").removeClass("header-logo-scroll");
            $(".header-in").removeClass("header-fixed");


            // $("header").removeClass("black-bg affix").delay(100).queue(function(next){
            //     $('header .logo img').removeClass('header-logo-scroll');
            //     $('.header-in').removeClass('header-fixed');
            // });
        }

    });



    /** Public API */
    return {
        init: init
    }

})(jQuery);

jQuery(document).ready( function() {
    main.init();
});