const addListenen = require('../../helpers/addDeligateListener');
const jsPopup = require('../../lib/jqPopup');
// eslint-disable-next-line no-unused-vars
const popupTemplate = require('../../templates/ui/addPostPopup')();
const render = require('../renderDOM');
const regexpValidTitle = require('../validators/regexpValidTitle');
jsPopup($);

module.exports = () => {
  addListenen('body', 'click', '.article-preview__edit', (event) => {
    const $eventTarget = $(event.target);
    const articleId = $eventTarget.parent()
        .find('.article-preview__link')
        .prop('hash')
        .slice(1);

    fetch(`http://localhost:3000/api/list/${articleId}`, {method: 'GET'})
        .then( (res) => res.json())
        .then( (data) => openEditPopup(data, articleId));
  });
};

function openEditPopup(data, articleId) {
  const popup = render(document.body, popupTemplate);
  const form = popup.querySelector('#add-post-form');
  const dataKeys = Object.keys(data);

  dataKeys.map( (name) => {
    const formEl = form.querySelector(`*[name=${name}]`);
    if (formEl) {
      switch (formEl.tagName.toLowerCase() === 'input' ||
      formEl.tagName.toLowerCase() === 'textarea') {
        case true:
          formEl.value = data[name];
          break;
        case false:
          break;

        default:
          break;
      }
    }
  });

  form.querySelector('*[name="category"]')
      .querySelector(`option[value=${data.category}]`)
      .setAttribute('selected', true);

  data.tags.map( (category) => {
    form.querySelector('select[name="tags"]')
        .querySelector(`option[value=${category}]`)
        .setAttribute('selected', true);
  });

  form.id = 'update-post-form';
  form.setAttribute('data-postid', `${articleId}`);
  form.addEventListener('submit', sendData);
};

function sendData(event) {
  event.preventDefault();

  const title = event.target.querySelector('input[name="title"]').value;
  if (!regexpValidTitle(title)) {
    return alert('Please, enter a Valid Title');
  }

  const _data = createData(event.target);
  const body = JSON.stringify(_data);

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const options = {
    method: 'PUT',
    headers,
    body,
  };

  fetch(`http://localhost:3000/api/list/${_data.id}`, options)
      .then( (res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) => window.location = `/post.html#${_data.id}`)
      .catch((error) => {
        if (!errorWasShowed) {
          alert(errorParser(error.message));
        }
      });
}

function createData(form) {
  const data = {};
  const map = [].map;

  map.call(form, (el) => {
    let value;

    if (!el.name || !el.value) {
      return;
    }

    if (el.multiple) {
      value = map.call(el.selectedOptions, (option) => option.value);
      data[el.name] = value;
      return;
    }

    value = el.value;
    data[el.name] = el.value;
  });

  data.id = form.dataset.postid;

  return data;
};
