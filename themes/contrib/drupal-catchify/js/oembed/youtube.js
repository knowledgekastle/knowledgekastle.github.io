/**
 * @file
 * Behaviors to implement control over youtube video tag.
 */

'use strict';
window.video = {
  video: null,

  init: function () {
    var iframe = document.querySelector('iframe');

    // Enable js api
    var domain = window.location.origin;
    var youtubeURL = String(iframe.src);
    youtubeURL = youtubeURL + '&enablejsapi=1';
    youtubeURL = youtubeURL + `&origin=${domain}`;
    iframe.src = youtubeURL;

    // Create video instance
    if (YT.Player) {
      this.video = new YT.Player(iframe, {});
    }
  },

  pause: function () {
    var _this = this;
    this.poll(function () {
      try {
        _this.video.pauseVideo();
        return true;
      } catch {
        return false;
      }
    });
  },

  play: function () {
    var _this = this;
    this.poll(function () {
      try {
        _this.video.playVideo();
        return true;
      } catch {
        return false;
      }
    });
  },

  poll: function (fn) {
    var attempts = 0;
    var maxAttempts = 25;
    var interval = 100;
    (function p() {
      if (fn()) {
        return;
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(p, interval);
      }
    })();
  }
};

window.onYouTubePlayerAPIReady = function () {
  window.video.init();
};
