const renderDOM = require('../renderDOM');
const pagination = require('../../templates/blog/padination');
const blogPreview = require('../../templates/blog/blog');
const errorParser = require('../../helpers/errorParser');
const PostFilter = require('../../components/PostFilter');
const addListenen = require('../../helpers/addDeligateListener');
const jsPopup = require('../../lib/jqPopup');
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

  $().jqPopup(
      null,
      popupHandler,
      'succes',
      'alert',
      'none',
      'Subscribe to this blog and get new update first!',
      true
  );

  addListenen('body', 'click', '.article-preview__rm', (event) => $().jqPopup(
      event.target,
      popupHandler,
      'info',
      'promt',
      'dark',
      'Are you sure you want to delete this post?'
  ));
};

function popupHandler() {
  const post = this.targer.parent().parent().parent();
  post.slideUp(300, () => post.remove());
  this.closePopup();
}
