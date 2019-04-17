function renderDOM(parent, obj) {
  let element;
  switch (obj.tagName === 'text') {
    case true:
      element = document.createTextNode(obj.textValue);
      break;
    case false:
      element = document.createElement(obj.tagName);
      if (obj.attributes) {
        for (const attr in obj.attributes) {
          if (Object.prototype.hasOwnProperty.call(obj.attributes, attr)) {
            element.setAttribute(`${attr}`, obj.attributes[attr]);
          }
        }
      }
      break;

    default:
      break;
  }
  if (parent) {
    parent.appendChild(element);
  }

  if (obj.childrens) {
    obj.childrens.map((el) => {
      renderDOM(element, el);
    });
  }
  return element;
}

module.exports = renderDOM;
