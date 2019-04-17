module.exports = (data) => {
  return {
    attributes: {
      class: 'categories',
    },
    childrens: [{
      attributes: {
        class: 'categories__title',
      },
      childrens: [{
        tagName: 'text',
        textValue: 'Categories',
      }],
      tagName: 'H2',
    }, {
      attributes: {
        class: 'categories__list',
      },
      childrens: data.categories.map((el) => {
        return {
          attributes: {
            class: 'categories__list-item',
          },
          childrens: [{
            attributes: {
              class: 'categories__list-item-title',
            },
            childrens: [{
              tagName: 'text',
              textValue: `${el.title}`,
            }],
            tagName: 'SPAN',
          }, {
            attributes: {
              class: 'categories__list-item-amount',
            },
            childrens: [{
              tagName: 'text',
              textValue: `(${el.count})`,
            }],
            tagName: 'SPAN',
          }],
          tagName: 'LI',
        };
      }),
      tagName: 'UL',
    }],
    tagName: 'SECTION',
  };
};
