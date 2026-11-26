(function ($) {
    "use strict";

    // Hide the page loader if a page still has one
    $('#spinner').removeClass('show');

    // Scroll-in animations on the older pages (skipped when the visitor prefers reduced motion)
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (typeof WOW !== 'undefined' && !reduceMotion) {
        new WOW().init();
    } else {
        $('.wow').css({ visibility: 'visible', animationName: 'none' });
    }

    // Back to top button
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').on('click', function () {
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        return false;
    });

})(jQuery);
