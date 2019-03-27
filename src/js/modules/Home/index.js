const renderDOM = require('../renderDOM');
const carousel = require('../../templates/home/carousel');
const homeTemplate = require('../../templates/home/main');
const sliderConstructor = require('../../modules/carousel');
const SimpleCarousel = require('../SimpleCarousel');
const DraggableCarousel = require('../DraggableCarousel');

let data;

module.exports = () => {
  data = [require('../../data/home/data')(), require('../../data/blog/blog')()];
  renderDOM(document.getElementById('header-container'), carousel(data[0]));
  renderDOM(document.getElementById('main'), homeTemplate(data[1]));


  sliderConstructor('#laters-post-carousel', {slidesSameTime: 3, animTime: 600}, SimpleCarousel).sliderInit();
  sliderConstructor('#main-carousel-slide-wrapper', {slidesSameTime: 1, animTime: 600}, DraggableCarousel).sliderInit();
};
