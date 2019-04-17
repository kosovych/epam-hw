// const validate = require('./validators/index')();
const addListener = require('../helpers/addDeligateListener');
const template = require('../templates/ui/addPostPopup')();
const render = require('../modules/renderDOM');
const errorParser = require('../helpers/errorParser');
const errorWasShowed = false;
const regexpValidTitle = require('./validators/regexpValidTitle');

module.exports = () => {
  addListener('body', 'click', '#add-article-btn', addPopup);
  addListener('body', 'click', '#popup-close-btn', closePopup);
  addListener('body', 'submit', '#add-post-form', sendData);
};


function addPopup(event) {
  render(document.body, template);
}

function closePopup(event) {
  event.target.parentElement.parentElement.parentElement.remove();
}

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
    method: 'POST',
    headers,
    body,
  };


  fetch('http://localhost:3000/api/create-article', options)
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

  // data.id = data.title.toLocaleLowerCase().replace(/ /gi, '-');
  data.id = Date.now();

  return data;
}
