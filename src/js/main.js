const parseDOM = require('./modules/parseDOM');
const renderDOM = require('./modules/renderDOM');
const articleTemplate = require('./templates/post/article');
const commentTemplate = require('./templates/post/comments');
const categoriesTemplate = require('./templates/post/categories');
const tagsContent = require('./templates/post/tags');
const resentPosts = require('./templates/post/resentPosts');
const twittFeed = require('./templates/post/twitterFeed');
const commentForm = require('./templates/post/form');
const relatedPosts = require('./templates/post/relatedPosts');
let data;

const path = window.location.pathname;

switch (path) {
  // case '/home.html':
  //   data = [require('./data/home/carousel')(), require('./data/home/main')()];
  //   renderDOM(document.getElementById('header-container'), data[0]);
  //   renderDOM(document.getElementById('main'), data[1]);
  //   break;

  case '/blog.html':
    data = require('./data/blog/blog')();
    renderDOM(document.getElementById('main'), data);
    console.log(data);
    break;

  case '/post.html':
    data = require('./data/post/post')();
    renderDOM(document.getElementById('article'), articleTemplate(data));

    data.comments.map( (obj) => renderDOM(document.getElementById('comments'), commentTemplate(obj)));
    renderDOM(document.getElementById('comments'), commentForm());
    renderDOM(document.getElementById('aside-content'), categoriesTemplate(data));
    renderDOM(document.getElementById('aside-content'), tagsContent(data));
    renderDOM(document.getElementById('aside-content'), resentPosts(data));
    renderDOM(document.getElementById('aside-content'), twittFeed(data));
    renderDOM(document.getElementById('comments'), relatedPosts(data));
    break;

  default:
    break;
}