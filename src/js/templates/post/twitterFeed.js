module.exports = (data) => {
  return {
    "attributes": {
      "class": "twitter-feed"
    },
    "childrens": [{
      "attributes": {
        "class": "twitter-feed__title"
      },
      "childrens": [{
        "tagName": "text",
        "textValue": "Twitter Feed"
      }],
      "tagName": "H2"
    }, {
      "attributes": {},
      "childrens": data.twitts.map( (twitt) => {
        return {
        "attributes": {
          "class": "twit"
        },
        "childrens": [{
          "attributes": {
            "class": "twit__icon"
          },
          "childrens": [{
            "attributes": {
              "class": "ti-twitter-alt"
            },
            "childrens": [],
            "tagName": "SPAN"
          }],
          "tagName": "DIV"
        }, {
          "attributes": {
            "class": "twit__author"
          },
          "childrens": [{
            "attributes": {
              "href": "#"
            },
            "childrens": [{
              "tagName": "text",
              "textValue": twitt.author
            }],
            "tagName": "A"
          }],
          "tagName": "H3"
        }, {
          "attributes": {
            "class": "twit__text"
          },
          "childrens": [{
            "tagName": "text",
            "textValue": twitt.text
          }, {
            "attributes": {
              "class": "twit__hash"
            },
            "childrens": twitt.hashs.map( hesh => { 
              return {
              "attributes": {
                "href": "#"
              },
              "childrens": [{
                "tagName": "text",
                "textValue": `#${hesh}`
              }],
              "tagName": "A"
            }}),
            "tagName": "SPAN"
          }],
          "tagName": "P"
        }, {
          "attributes": {
            "class": "twit__date"
          },
          "childrens": [{
            "attributes": {
              "href": "#"
            },
            "childrens": [{
              "tagName": "text",
              "textValue": twitt.date
            }],
            "tagName": "A"
          }],
          "tagName": "DIV"
        }],
        "tagName": "DIV"
      }}),
      "tagName": "DIV"
    }],
    "tagName": "SECTION"
  }
}