module.exports = Carousel;

function Carousel(_container) {
  return new CarouselConstructor(_container);
}

class CarouselConstructor {
  constructor(_container) {
    this.container = document.querySelector(_container);
    this.prevBtn = this.container.
        parentElement.
        parentElement.querySelector('.slider__prev');

    this.nextBtn = this.container.
        parentElement.
        parentElement.querySelector('.slider__next');

    sliderInit.apply(this);

    this.hoverID = this.autoMuve();
  }

  nextSlide(event) {
    if (event && this.hoverID) {
      clearInterval(this.hoverID);
      this.hoverID = null;
    }
    const firstEl = this.container.firstElementChild.cloneNode(true);
    this.container.appendChild(firstEl);

    setTimeout(() => {
      this.container.style.transition = `.6s`;
      this.container.style.transform = `translateX(-${100/3}%)`;
    }, 0);

    this.container.addEventListener('transitionend', () => {
      rmFirstSlide.call(this, event);
    }, {
      once: true,
    });
  }

  prevSlide(event) {
    if (event && this.hoverID) {
      clearInterval(this.hoverID);
      this.hoverID = null;
    }
    const lastEl = this.container.lastElementChild.cloneNode(true);
    this.container.insertBefore(lastEl, this.container.firstElementChild);
    this.container.style.transform = `translateX(-${100/3}%)`;

    setTimeout(() => {
      this.container.style.transition = `.6s`;
      this.container.style.transform = `translateX(0%)`;
    }, 100);

    this.container.addEventListener('transitionend', () => {
      rmLastSlide.call(this, event);
    }, {
      once: true,
    });
  }

  mousedownHandler(event) {
    this.container.style.userSelect = 'none';
    const startPoint = event.clientX;
    document.body.
        addEventListener(
            'mouseup', (event) => {
              this.mouseupHandles.call(this, event, startPoint);
            },
            {once: true}
        );
  }

  mouseupHandles(event, start) {
    this.container.style.userSelect = 'all';
    const end = event.clientX;

    if (end === start) {
      return;
    }

    (start > end && start !== end) ?
    this.nextSlide()
    :
    this.prevSlide();
  }

  autoMuve() {
    return setInterval(this.nextSlide.bind(this), 3000);
  }
};


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

function rmLastSlide(event) {
  this.container.lastElementChild.remove();
  this.container.setAttribute('style', '');

  if (event) {
    this.prevBtn.addEventListener('click', this.prevSlide.bind(this), {
      once: true,
    });
  }
}

function rmFirstSlide(event) {
  this.container.firstElementChild.remove();
  this.container.setAttribute('style', '');
  if (event) {
    this.nextBtn.addEventListener('click', this.nextSlide.bind(this), {
      once: true,
    });
  }
}
