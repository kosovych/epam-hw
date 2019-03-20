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
  const body = new FormData(event.target);
  fetch('/', {body, method: 'POST'});
}
