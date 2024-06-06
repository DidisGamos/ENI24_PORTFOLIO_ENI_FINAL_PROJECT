// SCROLL HEADER

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector('header').style.top = "0";
  } else {
    document.querySelector('header').style.top = "-60px";
  }
  prevScrollpos = currentScrollPos;
}

// // FADE UP

document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.querySelector('.bloc-bx');
    setTimeout(() => {
        textElement.classList.add('visible');
    }, 100);
});

// //FADE LEFT

document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.querySelector('.logo-bx')
    setTimeout(() => {
        textElement.classList.add('visible');
    }, 100);
});
