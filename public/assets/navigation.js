// Sticky Header
$(window).scroll(function() {

    if ($(window).scrollTop() > 200) {
        $('.main_h').addClass('sticky');
    } else {
        $('.main_h').removeClass('sticky');
    }
});

// Mobile Navigation 
function toggleMobileMenu(menu) {
    menu.classList.toggle('open');
}