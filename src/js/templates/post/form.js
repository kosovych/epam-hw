module.exports = () => {
  return {
    attributes: {
      class: 'reply-form row',
    },
    childrens: [{
      attributes: {
        class: 'reply-form__col',
      },
      childrens: [{
        attributes: {
          class: 'reply-form__input input',
          type: 'text',
          name: 'name',
          placeholder: 'Name',
        },
        childrens: [],
        tagName: 'INPUT',
      }, {
        attributes: {
          class: 'reply-form__input input',
          type: 'text',
          name: 'email',
          placeholder: 'Email',
        },
        childrens: [],
        tagName: 'INPUT',
      }],
      tagName: 'DIV',
    }, {
      attributes: {
        class: 'reply-form__col',
      },
      childrens: [{
        attributes: {
          class: 'reply-form__input input input--textarea',
          name: 'text',
          placeholder: 'Message',
        },
        childrens: [],
        tagName: 'TEXTAREA',
      }],
      tagName: 'DIV',
    }],
    tagName: 'FORM',
  };
};
