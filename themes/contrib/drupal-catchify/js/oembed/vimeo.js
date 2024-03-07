/**
 * @file
 * Behaviors to implement control over vimeo video tag.
 */

'use strict';
window.video = {
  video: null,

  init: function() {
    const iframe = document.querySelector('iframe');
    this.video = new Vimeo.Player(iframe);
  },

  pause: function () {
    if (!this.video) {
      this.init();
    }
    this.video.pause();
  },

  play: function () {
    if (!this.video) {
      this.init();
    }
    this.video.play();
  },
};
