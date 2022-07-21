console.log('FILE LOADED IN HTML');

$(document).ready(function() {
  // --- our code goes here ---
  console.log('DOM LOADED');

  $('#tweet-text').on('input', function(event) {
    let char = $(this).val();
    let remainingChars = 140 - char.length;

    $('.counter').text(remainingChars);

    if (remainingChars >= 0 && remainingChars <= 140) {
      $('.counter').css('color', 'black');
      // $('.submit-button').removeAttr('disabled');
      // $('.new-tweet-alert').hide();
    } else if (remainingChars < 0) {
      $('.counter').css('color', 'red');
      // $('.submit-button').attr('disabled', 'disabled');
      // $('.new-tweet-alert').show('slide');
    }

    console.log('char.length: ', char.length);
    console.log('remainingChars: ', remainingChars);
  });

  // ON SCROLL
  //Get the button
  const myButton = document.getElementById('toTop');
  const myNav = document.getElementById('nav');

  let prevScrollpos = window.pageYOffset;
  // When the user scrolls down 20px from the top of the document, show the button
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
