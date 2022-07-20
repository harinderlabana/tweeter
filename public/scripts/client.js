/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//DOCUMENT READY
$(document).ready(() => {
  console.log('DOCUMENT READY');

  // ESCAPE FUNCTION
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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

  $('.nav-right').click(function() {
    $('.new-tweet').toggle('slide');
    $('#tweet-text').focus();
  });

  // HANDLES SUBMIT FORM
  $('.post-tweet-form').submit(function(event) {
    event.preventDefault();
    $('.tweets-container').empty();
    $('.loading-gif').show('slide');
    //UX element
    setTimeout(() => {
      $.post(
        '/tweets', // url
        $(this).serialize(), // data to be submit
        function() {
          // success callback
          $('.tweets-container').empty();
          $('#tweet-text').val('');
          $('.counter').text(escape('140'));
          $('.submit-button').attr('disabled', 'disabled');
          loadtweets();
          $('.loading-gif').hide();
          console.log('FORM SUBMITTED');
        }
      );
    }, 500);
  });

  // LOAD TWEETS
  const loadtweets = () => {
    $.get('/tweets', function(result) {
      renderTweets(result);
    });
  };

  loadtweets();
});
