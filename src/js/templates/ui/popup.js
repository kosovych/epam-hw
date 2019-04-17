module.exports = () => {
  return {
    attributes: {
      class: 'popup',
    },
    childrens: [{
      attributes: {
        class: 'popup__bg',
      },
      childrens: [],
      tagName: 'DIV',
    }, {
      attributes: {
        class: 'popup__inner',
      },
      childrens: [{
        attributes: {
          class: 'popup__header',
        },
        childrens: [{
          attributes: {
            class: 'popup__title',
          },
          childrens: [{
            tagName: 'text',
            textValue: 'Add New Post',
          }],
          tagName: 'H2',
        }, {
          attributes: {
            id: 'popup-close-btn',
            class: 'popup__close-btn',
          },
          childrens: [{
            tagName: 'text',
            textValue: 'X',
          }],
          tagName: 'BUTTON',
        }],
        tagName: 'DIV',
      }],
      tagName: 'DIV',
    }],
    tagName: 'DIV',
  };
};
