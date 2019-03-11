const parseDOM = require('./modules/parseDOM');
const renderDOM = require('./modules/renderDOM');
const articleTemplate = require('./templates/post/article');

let data;

const path = window.location.pathname;

switch (path) {
  // case '/home.html':
  //   data = [require('./data/home/carousel')(), require('./data/home/main')()];
  //   renderDOM(document.getElementById('header-container'), data[0]);
  //   renderDOM(document.getElementById('main'), data[1]);
  //   break;

  // case '/blog.html':
  //   data = require('./data/blog/blog')();
  //   renderDOM(document.getElementById('main'), data);
  //   console.log(data);
  //   break;

  case '/post.html':
    data = [
      require('./data/post/post')(),
      // require('./data/post/comments')(),
      // require('./data/post/aside')(),
    ]
    renderDOM(document.getElementById('article'), articleTemplate(data[0]));
    // renderDOM(document.getElementById('comments'), data[1]);
    // renderDOM(document.getElementById('aside-content'), data[2]);
    break;

  default:
    break;
}