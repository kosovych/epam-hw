const getMonth = require('../../helpers/monthSwitcher');
const dayParser = require('../../helpers/dayParser');

module.exports = (data) => {
  return {
    attributes: {
      class: 'blog-feed container',
    },
    childrens: [{
      attributes: {},
      childrens: data.map((article) => {
        return {
          attributes: {
            class: 'article-preview row',
          },
          childrens: [{
            attributes: {
              class: 'article-preview__info',
            },
            childrens: [{
              attributes: {
                class: 'article-preview__info-year',
              },
              childrens: [{
                tagName: 'text',
                textValue: new Date(article.id).getFullYear(),
              }],
              tagName: 'DIV',
            }, {
              attributes: {
                class: 'article-preview__info-date',
              },
              childrens: [{
                tagName: 'text',
                textValue: getMonth(new Date(article.id).getMonth()),
              }],
              tagName: 'DIV',
            }, {
              attributes: {
                class: 'article-preview__info-day',
              },
              childrens: [{
                tagName: 'text',
                textValue: dayParser(new Date(article.id).getDate()),
              }],
              tagName: 'DIV',
            }],
            tagName: 'DIV',
          }, {
            attributes: {
              class: 'article-preview__content',
            },
            childrens: [{
              attributes: {
                class: `article-preview__img ${ article.img === '' ?
              'article-preview__img--no-image' : ''}`,
              },
              childrens: [{
                attributes: {
                  class: `article-preview__img-label 
                article-preview__img-label--${article.category}`,
                },
                childrens: [],
                tagName: 'SPAN',
              }, {
                attributes: {
                  class: 'article-preview__img-el',
                  src: article.img,
                  alt: article.title,
                },
                childrens: [],
                tagName: 'IMG',
              }],
              tagName: 'DIV',
            }, {
              attributes: {
                class: 'article-preview__content-wrapper',
              },
              childrens: [{
                attributes: {
                  class: 'article-preview__title',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: article.title || article.title,
                }],
                tagName: 'DIV',
              }, {
                attributes: {
                  class: 'article-preview__statistics',
                },
                childrens: [{
                  attributes: {
                    href: '#',
                    class: 'article-preview__statistics-author ti-user',
                  },
                  childrens: [{
                    tagName: 'text',
                    textValue: article.author,
                  }],
                  tagName: 'A',
                }, {
                  attributes: {
                    href: '#',
                    class: 'article-preview__statistics-comments ti-comment',
                  },
                  childrens: [{
                    tagName: 'text',
                    textValue: `${article.commentsCount} comments`,
                  }],
                  tagName: 'A',
                }],
                tagName: 'DIV',
              }, {
                attributes: {
                  class: 'article-preview__text',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: article.text,
                }],
                tagName: 'DIV',
              }, {
                attributes: {
                  class: 'article-preview__link',
                  href: `http://localhost:3001/post.html#${article.id}`,
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'READ MORE',
                }],
                tagName: 'A',
              }],
              tagName: 'DIV',
            }],
            tagName: 'DIV',
          }],
          tagName: 'SECTION',
        };
      }),
      tagName: 'DIV',
    }],
    tagName: 'DIV',
  };
};
