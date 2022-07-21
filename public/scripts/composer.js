$(document).ready(function() {
  // ON INPUT
  $('#tweet-text').on('input', function(event) {
    let char = $(this).val();
    let remainingChars = 140 - char.length;

    $('.counter').text(remainingChars);

    if (remainingChars >= 0 && remainingChars <= 140) {
      $('.counter').css('color', 'black');
    } else if (remainingChars < 0) {
      $('.counter').css('color', 'red');
    }
  });

  // ON SCROLL
  const myButton = document.getElementById('toTop');
  const myNav = document.getElementById('nav');
  let prevScrollpos = window.pageYOffset;

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      myButton.style.display = 'block';
    } else {
      myButton.style.display = 'none';
    }
  }

  window.onscroll = function() {
    scrollFunction();

    let currentScrollPos = window.pageYOffset;

    if (prevScrollpos > currentScrollPos) {
      myNav.style.top = '0';
    } else {
      myNav.style.top = '-120px';
    }

    prevScrollpos = currentScrollPos;
  };
});
