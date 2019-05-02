/* eslint-disable new-cap */
// const parseDOM = require('./modules/parseDOM');
const newPostPopup = require('./modules/addNewPost');
newPostPopup();

const Post = require('./modules/Post/index');
const Home = require('./modules/Home/index');
const Blog = require('./modules/Blog/index');
const Mediator = require('./modules/Mediator/index');
const path = window.location.pathname;

switch (path) {
  case '/':
    Home();
    break;

  case '/blog.html':
    Blog();
    break;

  case '/post.html':
    Post();
    break;

  case '/mediator.html':
    Mediator();
    break;

  default:
    break;
}
