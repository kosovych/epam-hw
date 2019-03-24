// const parseDOM = require('./modules/parseDOM');
const newPostPopup = require('./modules/addNewPost');
newPostPopup();

const Post = require('./modules/Post/index');
const Home = require('./modules/Home/index');
const Blog = require('./modules/Blog/index');
const path = window.location.pathname;

switch (path) {
  case '/home.html':
    Home();
    break;

  case '/blog.html':
    Blog();
    break;

  case '/post.html':
    Post();
    break;

  default:
    break;
}
