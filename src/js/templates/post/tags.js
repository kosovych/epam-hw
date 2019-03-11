module.exports = (data) => {
  return {
    attributes: {
      class: "tags"
    },
    childrens: [{
      attributes: {
        class: "tags__title"
      },
      childrens: [{
        tagName: "text",
        textValue: "Tags"
      }],
      tagName: "H2"
    }, {
      attributes: {
        class: "tags__wrapper"
      },
      childrens: data.tags.map( (tag) => {
        return {
        tagName: "A",
        attributes: {
          href: "#",
          class: "tags__item"
        },
        childrens: [{
          tagName: "text",
          textValue: `${tag}`
        }],
      }}),
      tagName: "DIV"
    }],
    tagName: "SECTION"
  }
}