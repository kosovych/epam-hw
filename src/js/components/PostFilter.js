const simpleInputValidator = require('../modules/validators/simpleInputValidator');
const renderDOM = require('../modules/renderDOM');
const popup = require('../templates/ui/popup');
const blogPreview = require('../templates/blog/blog');

class PostFilter {
  constructor(container, select, input, btn, cancelBtn, data, target) {
    this.filter = document.getElementById(container);
    this.select = this.filter.querySelector(select);
    this.input = this.filter.querySelector(input);
    this.btn = this.filter.querySelector(btn);
    this.cancelBtn = this.filter.querySelector(cancelBtn);
    this._data = data;
    this.target = document.getElementById(target);

    this.input.addEventListener('input', this.validateInput);
    this.select.addEventListener('change', this.validateSelect);
    this.filter.addEventListener('submit', this.filterSubmitHandler.bind(this));
    this.cancelBtn.addEventListener('click', this.cancelHandler.bind(this));
    this.filterInit();
  }

  filterInit() {
    if (localStorage.getItem('isFilterUsed')) {
      const filterByValue = localStorage.getItem('filterBy');
      const value = localStorage.getItem('keyWord');
      this.input.value = value;
      this.select.querySelector('option[selected]').removeAttribute('selected');
      this.select.querySelector(`option[value="${filterByValue}"]`).setAttribute('selected', 'selected');
    }
  }

  validateInput(event) {
    const $target = event.target;
    const isValid = $target.value.length > 2;
    return simpleInputValidator(isValid, $target);
  }

  validateSelect(event) {
    const $target = event.target;
    const isValid = $target.value !== 'placeholder';
    return simpleInputValidator(isValid, $target);
  }

  filterSubmitHandler(event) {
    event.preventDefault();
    if (!this.validateInput({target: this.input}) || !this.validateSelect({target: this.select})) {
      return false;
    }

    localStorage.setItem('isFilterUsed', 'true');
    localStorage.setItem('filterBy', this.select.value);
    localStorage.setItem('keyWord', this.input.value);
    this.filterPost(this.select.value, this.input.value);
  }

  filterPost(filterByValue, value) {
    const result = this._data.filter( (post) => post[filterByValue].toLocaleLowerCase().includes(value.toLocaleLowerCase()));

    if (result.length > 0) {
      this.target.innerHTML = '';
      renderDOM(this.target, blogPreview(result));
    } else {
      const $popup = renderDOM(null, popup());
      $popup.querySelector('.popup__title').innerHTML = '';
      $popup.querySelector('.popup__inner').appendChild(createPopupContent());
      document.body.appendChild($popup);
    }
  }

  cancelHandler(event) {
    event.preventDefault();
    this.target.innerHTML = '';
    renderDOM(this.target, blogPreview(this._data));
  }
}

function createPopupContent() {
  const img = document.createElement('img');
  img.src = 'https://usercontent2.hubstatic.com/13523673.jpg';
  img.alt = 'Sorry, no results found :(';
  return img;
}

module.exports = PostFilter;
