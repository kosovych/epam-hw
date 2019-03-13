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
          textValue: data.year,
        }],
        tagName: 'DIV',
      }, {
        attributes: {
          class: 'article__date-month',
        },
        childrens: [{
          tagName: 'text',
          textValue: data.mounth,
        }],
        tagName: 'DIV',
      }, {
        attributes: {
          class: 'article__date-day',
        },
        childrens: [{
          tagName: 'text',
          textValue: data.day,
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
          textValue: 'Coffee is good, coffee is great',
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
            class: 'article-preview__img-label article-preview__img-label--pic',
          },
          childrens: [],
          tagName: 'SPAN',
        }, {
          attributes: {
            class: 'article__img-el',
            src: data.articleImg,
            alt: '',
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
            textValue: data.text[0],
          }, {
            attributes: {},
            childrens: [],
            tagName: 'BR',
          }, {
            attributes: {},
            childrens: [],
            tagName: 'BR',
          }, {
            tagName: 'text',
            textValue: data.text[1],
          }, {
            attributes: {},
            childrens: [],
            tagName: 'BR',
          }, {
            attributes: {},
            childrens: [],
            tagName: 'BR',
          }, {
            tagName: 'text',
            textValue: data.text[2],
          }],
          tagName: 'P',
        }, {
          attributes: {
            class: 'blockquote',
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
            textValue: data.text[2],
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
