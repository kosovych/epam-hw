const validate = require('./validators/index')();
const addListener = require('../helpers/addDeligateListener');
const template = require('../templates/ui/addPostPopup')();
const render = require('../modules/renderDOM');

module.exports = () => {
  addListener('body', 'click', '#add-article-btn', addPopup);
  addListener('body', 'click', '#popup-close-btn', closePopup);
  addListener('body', 'submit', '#add-post-form', sendData);
};


function addPopup(event) {
  console.log('addPopup');
  render(document.body, template);
}

function closePopup(event) {
  console.log('closePopup');
  event.target.parentElement.parentElement.parentElement.remove();
}

function sendData(event) {
  event.preventDefault();

  const title = event.target.querySelector('input[name="title"]').value;
  if (!validate.title(title)) {
    return alert('Please, enter a Valid Title');
  }

  const _data = createData(event.target);
  console.log(_data);
  const body = JSON.stringify(_data);
  console.log(body);

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const options = {
    method: 'POST',
    headers,
    body,
  };


  fetch('http://localhost:3000/api/create-article', options)
      .then((res) => res.json())
      .then((data) => window.location = `/post.html#${_data.id}`)
      .catch((error) => {
        return alert(`Ooops something went wrong \n ${error.message}`);
      });
}

function createData(form) {
  const data = {};
  const map = [].map;

  map.call(form, (el) => {
    let value;

    if (!el.name || !el.value) {
      console.log(el.name, el.value);
      return;
    }

    if (el.multiple) {
      value = map.call(el.selectedOptions, (option) => option.value);
      data[el.name] = value;
      return;
    }

    value = el.value;
    data[el.name] = el.value;
    console.dir(el.name, el.value);
  });

  // data.id = data.title.toLocaleLowerCase().replace(/ /gi, '-');
  data.id = Date.now();

  return data;
}
