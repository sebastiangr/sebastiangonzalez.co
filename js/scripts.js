var main = ( function($){

    var $window = $(window),
        $body = $('html, body'),
        $homeBanner = $("#home-banner"),   /** Home Banner */
        $homeBannerH2 = $homeBanner.find("h2"), /** Home Banner Title H2 */
        $bannerText = $(".header-content"),
        $header = $("header"),
        $headerLogo = $("header .logo img"),
        $headerInner = $(".header-in"),
        owl = $("#entries-slider"),
        $btnNext = $(".next"),
        $btnPrev = $(".prev");

    var settings = { verbose: false }, tapTargets, scrollPos, oneOff;

    var init = function( options ){

        $.extend( settings, options );

        oneOff = true;
        tapTargets = [];

        if( settings.verbose )
            console.log( "Verbose mode on." );

        /** Banner Parallax */
        $window.scroll(function () {
            scrollBanner();
            scrollMenu();
        });


        // SCROLL TO ANCHOR
        $("a[href*=#]").click(function(e) {
            e.preventDefault();
            var currentAnchor = $(this);
            var currentClass = $(this).attr('class');

            // Links for <sup> elements
            if (currentClass == "suplink") {
                $body.animate({
                    scrollTop: $(currentAnchor.attr('href')).offset().top - 140
                }, 1200);
            } else {
                $body.animate({
                    scrollTop: $(currentAnchor.attr('href')).offset().top - 80
                }, 1200);
            }
        });

        if( settings.verbose)
            console.log( "All of init fired." );

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
            console.log( "Scroll top: " + scrollPos );

        /** Scroll and fade out the banner text */
        $bannerText.css({
            "margin-top" : ( scrollPos / 3 ) + "px", // Define el movimiento leve hacia abajo al hacer scroll
            "opacity" : 1 - ( scrollPos / 400 ), // En qué posición Y se empieza a desaparecer el div
            "-ms-filter" : "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + 1 - ( scrollPos / 400 ) + ")"
        });

        /** Scroll the background of the banner */
        $homeBanner.css({
            "background-position" : "center " + (- scrollPos / 2 ) + "px"
        });
    };

    /**
     * Scroll Menu Function
     */
    var scrollMenu = function() {
        if ($(this).scrollTop() > 450) {
            $header.addClass("black-bg affix");
            $headerLogo.addClass("header-logo-scroll");
            $headerInner.addClass("header-fixed");
        } else {
            $header.removeClass("black-bg affix");
            $headerLogo.removeClass("header-logo-scroll");
            $headerInner.removeClass("header-fixed");
        }
    };

    /**
     * OWL Carousel
     */
    owl.owlCarousel({
        items : 2, //10 items above 1000px browser width
        itemsDesktop : [1140,2], //5 items between 1000px and 901px
        itemsDesktopSmall : [992,2], // betweem 900px and 601px
        itemsTablet: [768,1], //2 items between 600 and 0
        itemsMobile : false, // itemsMobile disabled - inherit from itemsTablet option
        pagination : true,
        autoPlay: true
    });

    // Custom Navigation Events
    $btnNext.click(function(){
        owl.trigger("owl.next");
    })
    $btnPrev.click(function(){
        owl.trigger("owl.prev");
    })


    /** Public API */
    return {
        init: init
    }

})(jQuery);

jQuery(document).ready( function() {
    main.init();
});