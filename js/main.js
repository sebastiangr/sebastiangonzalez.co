var main = ( function($){

    var $window             = $(window),
        $homeBanner         = $('#homeBanner'),         /** Home Banner */
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

    // var isMobile = function(){

    //     if( settings.verbose)
    //         console.log( 'isMobile' );

    //     return (
    //     (navigator.userAgent.match(/Android/i)) ||
    //     (navigator.userAgent.match(/webOS/i)) ||
    //     (navigator.userAgent.match(/iPhone/i)) ||
    //     (navigator.userAgent.match(/iPod/i)) ||
    //     (navigator.userAgent.match(/iPad/i)) ||
    //     (navigator.userAgent.match(/BlackBerry/))
    //     );
    // };


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
            // $('#sticky').fadeIn(500);
            $('.infoBlog').css({
                'position' : 'fixed'
            });
            $('article').css({
                'margin-top' : '60px'
            });
            $('.infoBar').fadeOut(0);
            $('.stickyBar').fadeIn(500);

            // $('#sticky').slideDown();
            // $('#sticky').animate({
            //     "margin-top" : "0px"
            // }, 300 );

        } else {
            // $('#sticky').fadeOut(200);
            $('.infoBlog').css({
                'position' : 'relative'
            });
            $('article').css({
                'margin-top' : '0px'
            });
            $('.infoBar').fadeIn(500);
            $('.stickyBar').fadeOut(0);

            // $('#sticky').slideUp(200);
            // $('#sticky').animate({
            //     "margin-top" : "-75px"
            // }, 300 );
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