function parseDOM(parentEl, childrenEl) {
  const obj = {};
  switch (childrenEl.nodeName) {
    case '#text':
      obj.tagName = 'text';
      obj.textValue = childrenEl.nodeValue.trim();
      break;
    default:
      obj.attributes = {};
      obj.childrens = [];
      obj.tagName = childrenEl.tagName;
      const arrOfAttr = Array.from(childrenEl.attributes);
      arrOfAttr.map((attr) => {
        obj.attributes[`${attr.name}`] = `${attr.value}`;
      });
      break;
  }

  if (checkBeforeAdd(parentEl, obj)) {
    parentEl.childrens.push(obj);
  }

  if (childrenEl.childNodes.length > 0) {
    Array.from(childrenEl.childNodes).map((el) => {
      parseDOM(obj, el);
    });
  }
  return obj;
}

function checkBeforeAdd(parentEl, obj) {
  if (parentEl && parentEl.childrens) {
    if (obj.textValue !== '') {
      return true;
    }
  }
  return false;
}

module.exports = parseDOM;
