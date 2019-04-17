const Post = require('./Post');
const popupTempl = require('../templates/ui/popup');
const renderDOM = require('../modules/renderDOM');

class PostPic extends Post {
  constructor($article, src) {
    super($article, src);
    this.poster.addEventListener('click', this.showPic.bind(this));
  }

  showPic(event) {
    const img = document.createElement('img');
    img.src = this.src;
    const popup = renderDOM(null, popupTempl());
    popup.querySelector('.popup__inner').appendChild(img);
    document.body.appendChild(popup);
  }
}

module.exports = PostPic;
