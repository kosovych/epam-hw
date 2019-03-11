module.exports = () => {
  return {
    "attributes": {
      "class": "pagination"
    },
    "childrens": [{
      "attributes": {
        "class": "container"
      },
      "childrens": [{
        "attributes": {
          "class": "row"
        },
        "childrens": [{
          "attributes": {
            "class": "pagination__btns"
          },
          "childrens": [{
            "attributes": {
              "class": "pagination__btn"
            },
            "childrens": [{
              "tagName": "text",
              "textValue": "1"
            }],
            "tagName": "BUTTON"
          }, {
            "attributes": {
              "class": "pagination__btn"
            },
            "childrens": [{
              "tagName": "text",
              "textValue": "2"
            }],
            "tagName": "BUTTON"
          }, {
            "attributes": {
              "class": "pagination__btn-next"
            },
            "childrens": [{
              "tagName": "text",
              "textValue": "NEXT PAGE"
            }],
            "tagName": "BUTTON"
          }],
          "tagName": "DIV"
        }],
        "tagName": "DIV"
      }],
      "tagName": "DIV"
    }],
    "tagName": "DIV"
  }
}