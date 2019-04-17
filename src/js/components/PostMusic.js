const Post = require('./Post');
const popupTempl = require('../templates/ui/popup');
const renderDOM = require('../modules/renderDOM');

class PostMusic extends Post {
  constructor($article, src) {
    super($article, src);
    this.poster.addEventListener('click', this.showSong.bind(this));
  }

  showSong() {
    const audio = document.createElement('audio');
    audio.setAttribute('controls', 'controls');
    audio.setAttribute('loop', 'loop');

    const source = document.createElement('source');
    source.src = this.src;

    const link = document.createElement('a');
    link.href = this.src;
    link.textContent = 'Download song';

    audio.appendChild(source);
    audio.appendChild(link);

    const popup = renderDOM(null, popupTempl());
    popup.querySelector('.popup__inner').appendChild(audio);
    document.body.appendChild(popup);
  }
}

module.exports = PostMusic;
