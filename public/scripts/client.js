//DOCUMENT READY
$(document).ready(() => {
  // ESCAPE FUNCTION
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // PREVENTS 'ENTER' TO BE USED IN TEXTAREA
  $('#tweet-text').keypress(function(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
    }
  });

  // SHOW/HIDE NEW TWEET ELEMENT
  $('.nav-right').click(function() {
    $('.new-tweet').toggle('slide');
    $('.new-tweet-alert').hide();
    $('#tweet-text').focus();
    $('#tweet-text').val('');
  });

  // CREATE TWEET
  const createTweetElement = (tweet) => {
    let tweetElement = `
      <section class='tweet-feed'>
          <div class="tweet-header">
            <div class="user-badge">
              <div class="user-avatar">
                <img src="${escape(tweet.user.avatars)}" />
              </div>
              <div class="user-name">${escape(tweet.user.name)}</div>
            </div>
            <div class="user-handle">${escape(tweet.user.handle)}</div>
          </div>

          <article>
            <div class="user-tweet">${escape(tweet.content.text)}</div>
          </article>

          <div class="tweet-footer">
            <div class="date-posted">${escape(
    timeago.format(tweet.created_at)
  )}</div>
            <div class="interaction-icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </div>
      </section>`;
    return tweetElement;
  };

  // RENDER TWEETS
  const renderTweets = (data) => {
    for (const tweet of data) {
      const newTweet = createTweetElement(tweet);
      $('.tweets-container').prepend(newTweet);
    }
  };

  // HANDLES SUBMIT FORM
  $('.post-tweet-form').submit(function(event) {
    event.preventDefault();
    const tweet = $('#tweet-text').val();
    $('.new-tweet-alert').hide();

    if (tweet.length > 140) {
      $('.new-tweet-alert')
        .show('slide')
        .text(escape('Exceeding character limit!'));
      return;
    } else if (tweet.length === 0) {
      $('.new-tweet-alert').show('slide').text(escape('Your sting is empty!'));
      return;
    }
    $('.tweets-container').empty();
    $('.loading-gif').show('slide');
    // ux element
    setTimeout(() => {
      $.post('/tweets', $(this).serialize(), function() {
        $('.tweets-container').empty();
        $('#tweet-text').val('');
        $('.counter').text(escape('140'));
        loadtweets();
        $('.loading-gif').hide();
      });
    }, 250);
  });

  // LOAD TWEETS
  const loadtweets = () => {
    $.get('/tweets', function(result) {
      renderTweets(result);
    });
  };

  loadtweets();
});
