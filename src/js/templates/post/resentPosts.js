module.exports = (data) => {
  return {
    attributes: {
      class: 'recent-posts',
    },
    childrens: [{
      attributes: {
        class: 'recent-posts__title',
      },
      childrens: [{
        tagName: 'text',
        textValue: 'Recent posts',
      }],
      tagName: 'H2',
    }, {
      attributes: {},
      childrens: data.resentPosts.map((post) => {
        return {
          attributes: {
            class: 'recent-post row',
          },
          childrens: [{
            attributes: {
              class: 'recent-post__img-wrapper',
            },
            childrens: [{
              attributes: {
                class: 'recent-post__img',
              },
              childrens: [{
                attributes: {
                  class: 'recent-post__img-el',
                  src: post.img,
                  alt: post.title,
                },
                childrens: [],
                tagName: 'IMG',
              }],
              tagName: 'DIV',
            }],
            tagName: 'DIV',
          }, {
            attributes: {
              class: 'recent-post__content',
            },
            childrens: [{
              attributes: {
                class: 'recent-post__title',
              },
              childrens: [{
                attributes: {
                  href: '#',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: post.title,
                }],
                tagName: 'A',
              }],
              tagName: 'H3',
            }, {
              attributes: {
                class: 'recent-post__title-date',
              },
              childrens: [{
                attributes: {
                  class: 'recent-post__title-date-icon ti-calendar',
                },
                childrens: [],
                tagName: 'SPAN',
              }, {
                attributes: {
                  href: '#',
                  class: 'recent-post__title-date-value',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: post.date,
                }],
                tagName: 'A',
              }],
              tagName: 'SPAN',
            }],
            tagName: 'DIV',
          }],
          tagName: 'DIV',
        };
      }),
      tagName: 'DIV',
    }],
    tagName: 'SECTION',
  };
};
