const getMonth = require('../../helpers/monthSwitcher');
const dayParser = require('../../helpers/dayParser');

module.exports = (data) => {
  return {
    attributes: {
      class: 'row',
    },
    childrens: [{
      attributes: {
        class: 'article__date',
      },
      childrens: [{
        attributes: {
          class: 'article__date-year',
        },
        childrens: [{
          tagName: 'text',
          textValue: new Date(+data.id).getFullYear(),
        }],
        tagName: 'DIV',
      }, {
        attributes: {
          class: 'article__date-month',
        },
        childrens: [{
          tagName: 'text',
          textValue: getMonth(new Date(+data.id).getMonth()),
        }],
        tagName: 'DIV',
      }, {
        attributes: {
          class: 'article__date-day',
        },
        childrens: [{
          tagName: 'text',
          textValue: dayParser(new Date(+data.id).getDate()),
        }],
        tagName: 'DIV',
      }],
      tagName: 'DIV',
    }, {
      attributes: {
        class: 'article__content',
      },
      childrens: [{
        attributes: {
          class: 'article__title',
        },
        childrens: [{
          tagName: 'text',
          textValue: data.title,
        }],
        tagName: 'H2',
      }, {
        attributes: {
          class: 'article__details',
        },
        childrens: [{
          attributes: {
            href: '#',
            class: 'article-preview__statistics-author ti-user',
          },
          childrens: [{
            tagName: 'text',
            textValue: data.author,
          }],
          tagName: 'A',
        }, {
          attributes: {
            href: '#',
            class: 'article-preview__statistics-comments ti-comment',
          },
          childrens: [{
            tagName: 'text',
            textValue: '3 comments',
          }],
          tagName: 'A',
        }],
        tagName: 'DIV',
      }, {
        attributes: {
          class: 'article__img',
        },
        childrens: [{
          attributes: {
            // eslint-disable-next-line max-len
            class: `article-preview__img-label article-preview__img-label--${data.category}`,
          },
          childrens: [],
          tagName: 'SPAN',
        }, {
          attributes: {
            class: 'article__img-el',
            src: data.img,
            alt: '',
            id: 'article-poster',
          },
          childrens: [],
          tagName: 'IMG',
        }],
        tagName: 'DIV',
      }, {
        attributes: {
          class: 'article__content-wrapper',
        },
        childrens: [{
          attributes: {
            class: 'article__text',
          },
          childrens: [{
            tagName: 'text',
            textValue: Array.isArray(data.text) ? data.text[0] : data.text,
          },
          {
            tagName: 'text',
            textValue: Array.isArray(data.text) ? data.text[1] : '',
          },
          {
            tagName: 'text',
            textValue: Array.isArray(data.text) ? data.text[2] : '',
          }],
          tagName: 'P',
        }, {
          attributes: {
            class: 'blockquote',
            style: data.blockquote ? '' : 'display: none',
          },
          childrens: [{
            tagName: 'text',
            textValue: data.blockquote,
          }],
          tagName: 'BLOCKQUOTE',
        }, {
          attributes: {
            class: 'article__text',
          },
          childrens: [{
            tagName: 'text',
            textValue: Array.isArray(data.text) ? data.text[2] : '',
          }],
          tagName: 'P',
        }],
        tagName: 'DIV',
      }],
      tagName: 'DIV',
    }],
    tagName: 'DIV',
  };
};
