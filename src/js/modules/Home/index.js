const renderDOM = require('../renderDOM');
const carousel = require('../../templates/home/carousel');
const homeTemplate = require('../../templates/home/main');
const slider = require('../../modules/carousel');

let data;

module.exports =() => {
  data = [require('../../data/home/data')(), require('../../data/blog/blog')()];
  renderDOM(document.getElementById('header-container'), carousel(data[0]));
  renderDOM(document.getElementById('main'), homeTemplate(data[1]));
  slider('#laters-post-carousel');
};
