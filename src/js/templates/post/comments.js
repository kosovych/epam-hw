module.exports = (data) => {
  return {
    attributes: {
      class: `comment row ${data.reply ? 'comment--reply' : ''}`
    },
    childrens: [{
      attributes: {
        class: "comment__author-avatar"
      },
      childrens: [{
        attributes: {
          class: "comment__author-avatar-img"
        },
        childrens: [{
          attributes: {
            class: "comment__author-avatar-img-el",
            src: data.avatar,
            alt: "User"
          },
          childrens: [],
          tagName: "IMG"
        }],
        tagName: "DIV"
      }],
      tagName: "DIV"
    }, {
      attributes: {
        class: "comment__content"
      },
      childrens: [{
        attributes: {
          class: "comment__author"
        },
        childrens: [{
          tagName: "text",
          textValue: data.user
        }],
        tagName: "H4"
      }, {
        attributes: {
          class: "comment__text"
        },
        childrens: [{
          tagName: "text",
          textValue: data.comment
        }],
        tagName: "P"
      }, {
        attributes: {},
        childrens: [{
          attributes: {
            class: "comment__reply-btn"
          },
          childrens: [{
            tagName: "text",
            textValue: "Reply"
          }],
          tagName: "BUTTON"
        }],
        tagName: "DIV"
      }],
      tagName: "DIV"
    }],
    tagName: "DIV"
  }
}