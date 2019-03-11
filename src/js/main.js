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
const blogPreview = require('./templates/blog/blog');
const pagination = require('./templates/blog/padination');
const carousel = require('./templates/home/carousel');
const homeTemplate = require('./templates/home/main');
let data;

const path = window.location.pathname;

switch (path) {
  case '/home.html':
    data = require('./data/home/data')();
    renderDOM(document.getElementById('header-container'), carousel(data));
    renderDOM(document.getElementById('main'), homeTemplate());
    break;

  case '/blog.html':
    data = require('./data/blog/blog')();
    renderDOM(document.getElementById('main'), blogPreview(data));
    renderDOM(document.getElementById('main'), pagination());
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