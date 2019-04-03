const renderDOM = require('../renderDOM');
const pagination = require('../../templates/blog/padination');
const blogPreview = require('../../templates/blog/blog');
const errorParser = require('../../helpers/errorParser');
const PostFilter = require('../../components/PostFilter');
let errorWasShowed = false;

module.exports = () => {
  fetch('http://localhost:3000/api/list')
      .catch( (err) => {
        errorWasShowed = true;
        alert(errorParser(500));
      })
      .then( (res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then( (data) => {
        const filter = new PostFilter(
            'filter-post', '#sort-by', '#keyword',
            '#filter-post-btn', '#filter-post-cancel-btn', data, 'main');

        if (!localStorage.getItem('filterBy')) {
          renderDOM(document.getElementById('main'), blogPreview(data));
          renderDOM(document.getElementById('main'), pagination());
        }
      })
      .catch( (error) => {
        if (!errorWasShowed) {
          alert(errorParser(error.message));
        }
      });
};
