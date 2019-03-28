// Can only move by controls

module.exports = function(_container, options) {
  this.container = document.querySelector(_container);
  this._slidesAmount = this.container.children.length;

  this.prevBtn = this.container.
      parentElement.
      parentElement.querySelector('.slider__prev');

  this.nextBtn = this.container.
      parentElement.
      parentElement.querySelector('.slider__next');

  this.nextSlide = function(event) {
    if (event && this.hoverID) {
      clearInterval(this.hoverID);
      this.hoverID = null;
    }
    const firstEl = this.container.firstElementChild.cloneNode(true);
    this.container.appendChild(firstEl);

    setTimeout(() => {
      this.container.style.transition = `.6s`;
      this.container.style.transform = `translateX(-${100/options.slidesSameTime}%)`;
    }, 0);

    this.container.addEventListener('transitionend', () => {
      this._rmFirstSlide.call(this, event);
    }, {
      once: true,
    });
  };

  this.prevSlide = function(event) {
    if (event && this.hoverID) {
      clearInterval(this.hoverID);
      this.hoverID = null;
    }
    this._lastEl = this.container.lastElementChild.cloneNode(true);
    this.container.insertBefore(this._lastEl, this.container.firstElementChild);
    this.container.style.transform = `translateX(-${100/options.slidesSameTime}%)`;

    setTimeout(() => {
      this.container.style.transition = `.6s`;
      this.container.style.transform = `translateX(0%)`;
    }, 100);

    this.container.addEventListener('transitionend', () => {
      this._rmLastSlide.call(this, event);
    }, {
      once: true,
    });
  };

  this.sliderInit = function() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', this.prevSlide.bind(this), {
        once: true,
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', this.nextSlide.bind(this), {
        once: true,
      });
    }
  };

  this._rmLastSlide = function(event) {
    this.container.lastElementChild.remove();
    this.container.setAttribute('style', '');

    if (event) {
      this.prevBtn.addEventListener('click', this.prevSlide.bind(this), {
        once: true,
      });
    }
  };

  this._rmFirstSlide = function(event) {
    this.container.firstElementChild.remove();
    this.container.setAttribute('style', '');
    if (event) {
      this.nextBtn.addEventListener('click', this.nextSlide.bind(this), {
        once: true,
      });
    }
  };
};
