// Can Drag Slides
// Added maskers

const SimpleCarousel = require('./SimpleCarousel');

module.exports = function(_container, options) {
  SimpleCarousel.call(this, _container, options);
  this._currentSlide = 0;
  this.markers = this.container.parentElement.querySelector('.markers');

  this.parentNextSlide = this.nextSlide.bind(this);
  this.parentPrevSlide = this.prevSlide.bind(this);

  this.nextSlide = function(event) {
    this.parentNextSlide.call(this, event);

    this.markers.children[this._currentSlide].classList.remove('active');
    this._currentSlide = this._currentSlide + 1 === this._slidesAmount ?
    0
    :
    ++this._currentSlide;
    this.markers.children[this._currentSlide].classList.add('active');
  };
  this.prevSlide = function(event) {
    this.parentPrevSlide.call(this, event);

    this.markers.children[this._currentSlide].classList.remove('active');
    this._currentSlide = this._currentSlide - 1 < 0 ?
    this._slidesAmount - 1
    :
    --this._currentSlide;
    this.markers.children[this._currentSlide].classList.add('active');
  };

  this.mousedownHandler = function(event) {
    this.container.style.userSelect = 'none';
    const startPoint = event.clientX;
    document.body.
        addEventListener(
            'mouseup', (event) => {
              this.mouseupHandles.call(this, event, startPoint);
            }, {
              once: true,
            }
        );
  };

  this.mouseupHandles = function(event, start) {
    this.container.style.userSelect = 'all';
    const end = event.clientX;

    if (end === start) {
      return;
    }

    (start > end && start !== end) ?
    this.nextSlide():
      this.prevSlide();
  };

  this._parentInit = this.sliderInit.bind(this);

  this.sliderInit = function() {
    this._parentInit();

    this.container.
        addEventListener('mousedown', this.mousedownHandler.bind(this));
  };
};
