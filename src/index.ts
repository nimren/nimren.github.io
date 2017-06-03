import '../less/site.less';

$(() => {
    console.log('loaded!');
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').on('click', (e: JQueryEventObject) => {
        var $anchor = $(e.currentTarget);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        e.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').on('click', (e: JQueryEventObject) => { 
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

});