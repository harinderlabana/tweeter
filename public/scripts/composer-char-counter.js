console.log('FILE LOADED IN HTML');

$(document).ready(function() {
  // --- our code goes here ---
  console.log('DOM LOADED');

  $('#tweet-text').on('input', function() {
    let char = $(this).val();
    let remainingChars = 140 - char.length;

    $('.counter').text(remainingChars);

    if (remainingChars >= 0) {
      $('.counter').css('color', 'black');
    } else if (remainingChars < 0) {
      $('.counter').css('color', 'red');
    }
  });
});
