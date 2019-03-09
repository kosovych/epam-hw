function parseDOM(parentEl, childrenEl) {
  let obj = {};
  switch (childrenEl.nodeName) {
    case '#text':
      obj.tagName = 'text';
      obj.textValue = childrenEl.nodeValue;
      break;
    default:
      obj.attributes = {};
      obj.childrens = [];
      obj.tagName = childrenEl.tagName;
      let arrOfAttr = Array.from(childrenEl.attributes);
      arrOfAttr.map(attr => {
        obj.attributes[`${attr.name}`] = `${attr.value}`;
      });
      break;
  }
  
  if (parentEl && parentEl.childrens) {
    parentEl.childrens.push(obj);
  }

  if(childrenEl.childNodes.length > 0) {
    Array.from(childrenEl.childNodes).map( (el) => {
      parseDOM(obj, el)
    })
  }
  return obj;
}

module.exports = parseDOM;