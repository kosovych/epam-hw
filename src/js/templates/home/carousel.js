module.exports = (data) => {
  return {
    attributes: {
      class: "main-carousel row"
    },
    childrens: [{
      attributes: {
        id: "main-carousel-slide-wrapper"
      },
      childrens: data.slides.map( (slide) => {
        return {
        attributes: {
          class: "main-carousel__slide"
        },
        childrens: [{
          attributes: {
            class: "main-carousel__header"
          },
          childrens: [{
            tagName: "text",
            textValue: "Expire"
          }, {
            attributes: {
              class: "main-carousel__header-border"
            },
            childrens: [],
            tagName: "DIV"
          }],
          tagName: "H2"
        }, {
          attributes: {
            class: "main-carousel__text"
          },
          childrens: [{
            tagName: "text",
            textValue: "Professionaly designed, carefully made\n for your enjoyement"
          }],
          tagName: "P"
        }, {
          attributes: {
            class: "btn main-carousel__btn-explore"
          },
          childrens: [{
            tagName: "text",
            textValue: "EXPLORE"
          }],
          tagName: "BUTTON"
        }, {
          attributes: {
            class: "btn"
          },
          childrens: [{
            tagName: "text",
            textValue: "LEARN MORE"
          }],
          tagName: "BUTTON"
        }],
        tagName: "DIV"
      }}),
      tagName: "DIV"
    }, {
      attributes: {
        class: "main-carousel__markers"
      },
      childrens: [{
        attributes: {
          class: "main-carousel__marker main-carousel__marker--active"
        },
        childrens: [],
        tagName: "DIV"
      }, {
        attributes: {
          class: "main-carousel__marker"
        },
        childrens: [],
        tagName: "DIV"
      }, {
        attributes: {
          class: "main-carousel__marker"
        },
        childrens: [],
        tagName: "DIV"
      }],
      tagName: "DIV"
    }, {
      attributes: {
        class: "main-carousel__btn main-carousel__btn--prew ti-angle-left"
      },
      childrens: [],
      tagName: "BUTTON"
    }, {
      attributes: {
        class: "main-carousel__btn main-carousel__btn--next ti-angle-right"
      },
      childrens: [],
      tagName: "BUTTON"
    }],
    tagName: "DIV"
  }
}