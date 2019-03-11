module.exports = (data) => {
  return {
    "attributes": {
      "class": "related-posts"
    },
    "childrens": [{
      "attributes": {
        "class": "related-posts__title"
      },
      "childrens": [{
        "tagName": "text",
        "textValue": "Related posts"
      }],
      "tagName": "H2"
    }, {
      "attributes": {
        "class": "related-posts__carousel"
      },
      "childrens": [{
        "attributes": {},
        "childrens": data.related.map( (post) => {
          return {
          "attributes": {
            "class": "related-posts__item"
          },
          "childrens": [{
            "attributes": {
              "class": "related-post__img",
              "src": post.img,
              "alt": "Another Post"
            },
            "childrens": [],
            "tagName": "IMG"
          }, {
            "attributes": {
              "class": "related-posts__item-title"
            },
            "childrens": [{
              "tagName": "text",
              "textValue": post.title
            }],
            "tagName": "H3"
          }, {
            "attributes": {
              "class": "related-posts__item-actions"
            },
            "childrens": [{
              "attributes": {
                "class": "related-posts__item-action-link ti-link",
                "href": "#"
              },
              "childrens": [],
              "tagName": "A"
            }, {
              "attributes": {
                "class": "related-posts__item-action-link ti-comments",
                "href": "#"
              },
              "childrens": [],
              "tagName": "A"
            }, {
              "attributes": {
                "class": "related-posts__item-action-link ti-email",
                "href": "#"
              },
              "childrens": [],
              "tagName": "A"
            }],
            "tagName": "DIV"
          }],
          "tagName": "DIV"
        }
      }),
        "tagName": "DIV"
      }, {
        "attributes": {},
        "childrens": [{
          "attributes": {
            "class": "related-posts__btn related-posts__btn--prev ti-angle-left"
          },
          "childrens": [],
          "tagName": "BOTTON"
        }, {
          "attributes": {
            "class": "related-posts__btn related-posts__btn--next ti-angle-right"
          },
          "childrens": [],
          "tagName": "BOTTON"
        }],
        "tagName": "DIV"
      }],
      "tagName": "DIV"
    }],
    "tagName": "SECTION"
  }
}