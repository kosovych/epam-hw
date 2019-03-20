module.exports = () => {
  return {
    attributes: {
      class: 'popup',
    },
    childrens: [{
      attributes: {
        class: 'popup__bg',
      },
      childrens: [],
      tagName: 'DIV',
    }, {
      attributes: {
        class: 'popup__inner',
      },
      childrens: [{
        attributes: {
          class: 'popup__header',
        },
        childrens: [{
          attributes: {
            class: 'popup__title',
          },
          childrens: [{
            tagName: 'text',
            textValue: 'Add New Post',
          }],
          tagName: 'H2',
        }, {
          attributes: {
            id: 'popup-close-btn',
            class: 'popup__close-btn',
          },
          childrens: [{
            tagName: 'text',
            textValue: 'X',
          }],
          tagName: 'BUTTON',
        }],
        tagName: 'DIV',
      }, {
        attributes: {
          action: '#',
          id: 'add-post-form',
        },
        childrens: [{
          attributes: {
            class: 'popup__fieldset',
          },
          childrens: [{
            attributes: {},
            childrens: [{
              tagName: 'text',
              textValue: 'Post Content',
            }],
            tagName: 'LEGEND',
          }, {
            attributes: {
              class: 'popup__section',
            },
            childrens: [{
              attributes: {
                class: 'popup__input',
                required: 'required',
                type: 'text',
                name: 'title',
                placeholder: 'Post title',
              },
              childrens: [],
              tagName: 'INPUT',
            }, {
              attributes: {
                class: 'popup__info',
              },
              childrens: [{
                tagName: 'text',
                textValue: `**Title can contain letters and special characters,
                 including space, ( ,!,:,-,?,.,,),\n 
                 length must be more than 2 characters but less than 20,
                 \n must start with an uppercase letter.`,
              }],
              tagName: 'SPAN',
            }, {
              attributes: {
                class: 'popup__input',
                required: 'required',
                type: 'text',
                name: 'author',
                placeholder: 'Post Author',
              },
              childrens: [],
              tagName: 'INPUT',
            }, {
              attributes: {
                class: 'popup__input',
                required: 'required',
                type: 'url',
                name: 'img',
                placeholder: 'Post Image (URL)',
              },
              childrens: [],
              tagName: 'INPUT',
            }, {
              attributes: {
                class: 'popup__input',
                required: 'required',
                cols: '10',
                name: 'text',
                rows: '5',
                type: 'text',
                placeholder: 'Post text',
              },
              childrens: [],
              tagName: 'TEXTAREA',
            }, {
              attributes: {
                class: 'popup__input',
                cols: '10',
                rows: '5',
                type: 'text',
                name: 'blockquote',
                placeholder: 'Blaquote',
              },
              childrens: [],
              tagName: 'TEXTAREA',
            }],
            tagName: 'DIV',
          }],
          tagName: 'FIELDSET',
        }, {
          attributes: {
            class: 'popup__fieldset',
          },
          childrens: [{
            attributes: {},
            childrens: [{
              tagName: 'text',
              textValue: 'Post Options',
            }],
            tagName: 'LEGEND',
          }, {
            attributes: {
              class: 'popup__section',
            },
            childrens: [{
              attributes: {
                class: 'popup__input',
                required: 'required',
                name: 'tags',
                multiple: 'multiple',
              },
              childrens: [{
                attributes: {
                  value: 'love',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'love',
                }],
                tagName: 'OPTION',
              }, {
                attributes: {
                  value: 'signs',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'signs',
                }],
                tagName: 'OPTION',
              }, {
                attributes: {
                  value: 'waterfall',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'waterfall',
                }],
                tagName: 'OPTION',
              }, {
                attributes: {
                  value: 'inspiration',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'inspiration',
                }],
                tagName: 'OPTION',
              }, {
                attributes: {
                  value: 'quotes',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'quotes',
                }],
                tagName: 'OPTION',
              }, {
                attributes: {
                  value: 'sea',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'sea',
                }],
                tagName: 'OPTION',
              }, {
                attributes: {
                  value: 'sense',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'sense',
                }],
                tagName: 'OPTION',
              }, {
                attributes: {
                  value: 'coffee',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'coffee',
                }],
                tagName: 'OPTION',
              }, {
                attributes: {
                  value: 'images',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'images',
                }],
                tagName: 'OPTION',
              }, {
                attributes: {
                  value: 'gold',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'gold',
                }],
                tagName: 'OPTION',
              }, {
                attributes: {
                  value: 'dancing',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'dancing',
                }],
                tagName: 'OPTION',
              }, {
                attributes: {
                  value: 'courage',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'courage',
                }],
                tagName: 'OPTION',
              }],
              tagName: 'SELECT',
            }, {
              attributes: {
                class: 'popup__info',
              },
              childrens: [{
                tagName: 'text',
                textValue: '**Use `CTRL` to choose more than one',
              }],
              tagName: 'SPAN',
            }, {
              attributes: {
                name: 'category',
                required: 'required',
              },
              childrens: [{
                attributes: {
                  value: '',
                  selected: 'selected',
                  disabled: 'disabled',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'Choose the category',
                }],
                tagName: 'OPTION',
              }, {
                attributes: {
                  value: 'pic',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'Picture',
                }],
                tagName: 'OPTION',
              }, {
                attributes: {
                  value: 'film',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'Film',
                }],
                tagName: 'OPTION',
              }, {
                attributes: {
                  value: 'write',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'News',
                }],
                tagName: 'OPTION',
              }, {
                attributes: {
                  value: 'music',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'Music',
                }],
                tagName: 'OPTION',
              }],
              tagName: 'SELECT',
            }],
            tagName: 'DIV',
          }],
          tagName: 'FIELDSET',
        }, {
          attributes: {
            class: 'popup__submit',
            id: 'popup-submit-btn',
          },
          childrens: [{
            tagName: 'text',
            textValue: 'Send Post',
          }],
          tagName: 'BUTTON',
        }],
        tagName: 'FORM',
      }],
      tagName: 'DIV',
    }],
    tagName: 'DIV',
  };
};
