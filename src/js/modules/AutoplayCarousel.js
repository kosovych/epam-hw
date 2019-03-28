// Added Autoply

const DraggableCarousel = require('./DraggableCarousel');

module.exports = function(_container, options) {
  DraggableCarousel.call(this, _container, options);

  this.autoMuve = function() {
    return setInterval(this.nextSlide.bind(this), 3000);
  };

  this.parentInit = this.sliderInit.bind(this);

  this.sliderInit = function() {
    this.parentInit();

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
  };

  this.hoverID = this.autoMuve();
};
