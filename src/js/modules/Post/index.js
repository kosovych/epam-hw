const renderDOM = require('../renderDOM');
const articleTemplate = require('../../templates/post/article');
const commentTemplate = require('../../templates/post/comments');
const categoriesTemplate = require('../../templates/post/categories');
const tagsContent = require('../../templates/post/tags');
const resentPosts = require('../../templates/post/resentPosts');
const twittFeed = require('../../templates/post/twitterFeed');
const commentForm = require('../../templates/post/form');
const relatedPosts = require('../../templates/post/relatedPosts');
let data;
const info = require('../../data/post/post')();
const errorParser = require('../../helpers/errorParser');
let errorWasShowed = false;

const PostPic = require('../../components/PostPic');
const PostVideo = require('../../components/PostVideo');
const PostMusic = require('../../components/PostMusic');

module.exports = () => {
  if (location.hash !== '') {
    fetch(`http://localhost:3000/api/list/${location.hash.slice(1)}`)
        .catch((err) => {
          errorWasShowed = true;
          alert(errorParser(500));
        })
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.status);
          }
          return res.json();
        })
        .then((data) => {
          const article = renderDOM(document.getElementById('article'),
              articleTemplate(data));
          let post;

          switch (data.category) {
            case 'pic':
              post = new PostPic(article, data.src);
              break;

            case 'film':
              post = new PostVideo(article, data.src);
              break;

            case 'music':
              post = new PostMusic(article, data.src);
              break;

            default:
              post = new PostMusic(article, data.src);
              break;
          }

          renderDOM(document.getElementById('aside-content'),
              tagsContent(data));

          renderDOM(document.getElementById('comments'),
              commentForm());

          renderDOM(document.getElementById('aside-content'),
              resentPosts(info));

          renderDOM(document.getElementById('aside-content'),
              twittFeed(info));

          renderDOM(document.getElementById('comments'),
              relatedPosts(info));
        })
        .catch((error) => {
          if (isNaN(error.message)) {
            return alert(errorParser(404));
          }
          if (!errorWasShowed) {
            alert(errorParser(error.message));
          }
        });

    return;
  }
  data = require('../../data/post/post')();
  renderDOM(document.getElementById('article'), articleTemplate(data));
  data.comments.map((obj) => {
    renderDOM(document.getElementById('comments'), commentTemplate(obj));
  });
  renderDOM(document.getElementById('comments'), commentForm());
  renderDOM(
      document.getElementById('aside-content'),
      categoriesTemplate(data)
  );
  renderDOM(document.getElementById('aside-content'), tagsContent(data));
  renderDOM(document.getElementById('aside-content'), resentPosts(data));
  renderDOM(document.getElementById('aside-content'), twittFeed(data));
  renderDOM(document.getElementById('comments'), relatedPosts(data));
};
