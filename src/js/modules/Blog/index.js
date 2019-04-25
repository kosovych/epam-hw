const renderDOM = require('../renderDOM');
const pagination = require('../../templates/blog/padination');
const blogPreview = require('../../templates/blog/blog');
const errorParser = require('../../helpers/errorParser');
const PostFilter = require('../../components/PostFilter');
const addListenen = require('../../helpers/addDeligateListener');
const jsPopup = require('../../lib/jqPopup');
const removeAtricle = require('./removeAtricle');
const rmAllAtricles = require('./rmAllArticles');
rmAllAtricles();
const editPost = require('./editPost');
editPost();

jsPopup($);
let errorWasShowed = false;

module.exports = () => {
  fetch('http://localhost:3000/api/list')
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
        new PostFilter(
            'filter-post', '#sort-by', '#keyword',
            '#filter-post-btn', '#filter-post-cancel-btn', data, 'main');

        if (!localStorage.getItem('filterBy')) {
          renderDOM(document.getElementById('main'), blogPreview(data));
          renderDOM(document.getElementById('main'), pagination());
        }
      })
      .catch((error) => {
        if (!errorWasShowed) {
          alert(errorParser(error.message));
        }
      });

  addListenen('body', 'click', '.article-preview__rm', (event) => {
    const popup = $().jqPopup(
        event.target,
        () => removeAtricle(event, popup),
        'info',
        'promt',
        'dark',
        'Are you sure you want to delete this post?'
    );
  });
};
