let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    var header = document.getElementById('header');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Downscroll
        header.style.transform = 'translateY(-100%)';
    } else {
        // Upscroll
        header.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});