module.exports = Carousel;

function Carousel(_container, options, carouselClass) {
  return new carouselClass(_container, options);
}

function CarouselConstructor(_container, options) {
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

  this.autoMuve = function() {
    return setInterval(this.nextSlide.bind(this), 3000);
  };

  this.hoverID = this.autoMuve();


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

  sliderInit.call(this);
  function sliderInit() {
    this.prevBtn.addEventListener('click', this.prevSlide.bind(this), {
      once: true,
    });

    this.nextBtn.addEventListener('click', this.nextSlide.bind(this), {
      once: true,
    });

    this.container.
        addEventListener('mousedown', this.mousedownHandler.bind(this));

    this.container.
        parentElement.
        parentElement.addEventListener('mouseenter', () => {
          if (this.autoMuve) {
            clearInterval(this.hoverID);
            this.hoverID = null;
          }
        });

    this.container.
        parentElement.
        parentElement.addEventListener('mouseleave', () => {
          this.hoverID = this.autoMuve();
        });
  }

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
