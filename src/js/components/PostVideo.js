const Post = require('./Post');
const popupTempl = require('../templates/ui/popup');
const renderDOM = require('../modules/renderDOM');

class PostVideo extends Post {
  constructor($article, src) {
    super($article, src);
    this.poster.addEventListener('click', this.showPic.bind(this));
  }

  showPic(event) {
    const iframe = document.createElement('iframe');
    iframe.width = 717;
    iframe.height = 538;
    iframe.src = this.src;
    iframe.setAttribute('frameborder', '0');
    // eslint-disable-next-line max-len
    iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', 'allowfullscreen');

    const popup = renderDOM(null, popupTempl());
    popup.querySelector('.popup__inner').appendChild(iframe);
    document.body.appendChild(popup);
  }
}

module.exports = PostVideo;
