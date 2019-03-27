module.exports = (data) => {
  return {
    attributes: {
      class: 'main-carousel row',
    },
    childrens: [{
      attributes: {
        id: 'main-carousel-slide-wrapper',
        class: 'main-carousel-slide-wrapper row',
      },
      childrens: data.slides.map((slide) => {
        return {
          attributes: {
            class: 'main-carousel__slide',
          },
          childrens: [{
            attributes: {
              class: 'main-carousel__header',
            },
            childrens: [{
              tagName: 'text',
              textValue: slide.header,
            }, {
              attributes: {
                class: 'main-carousel__header-border',
              },
              childrens: [],
              tagName: 'DIV',
            }],
            tagName: 'H2',
          }, {
            attributes: {
              class: 'main-carousel__text',
            },
            childrens: [{
              tagName: 'text',
              textValue: slide.text,
            }],
            tagName: 'P',
          }, {
            attributes: {
              class: 'btn main-carousel__btn-explore',
            },
            childrens: [{
              tagName: 'text',
              textValue: 'EXPLORE',
            }],
            tagName: 'BUTTON',
          }, {
            attributes: {
              class: 'btn',
            },
            childrens: [{
              tagName: 'text',
              textValue: 'LEARN MORE',
            }],
            tagName: 'BUTTON',
          }],
          tagName: 'DIV',
        };
      }),
      tagName: 'DIV',
    }, {
      attributes: {
        class: 'main-carousel__markers markers',
      },
      childrens: [{
        attributes: {
          class: 'main-carousel__marker marker active',
        },
        childrens: [],
        tagName: 'DIV',
      }, {
        attributes: {
          class: 'main-carousel__marker marker',
        },
        childrens: [],
        tagName: 'DIV',
      }, {
        attributes: {
          class: 'main-carousel__marker marker',
        },
        childrens: [],
        tagName: 'DIV',
      }],
      tagName: 'DIV',
    }, {
      attributes: {
        class: 'main-carousel__btn main-carousel__btn--prew ti-angle-left slider__prev',
      },
      childrens: [],
      tagName: 'BUTTON',
    }, {
      attributes: {
        class: 'main-carousel__btn main-carousel__btn--next ti-angle-right slider__next',
      },
      childrens: [],
      tagName: 'BUTTON',
    }],
    tagName: 'DIV',
  };
};
