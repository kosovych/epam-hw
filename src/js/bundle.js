(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class Post {
  constructor($article, src) {
    this.article = $article;
    this.poster =  $article.querySelector('#article-poster');
    this.src = src;
  }
}

module.exports = Post;
},{}],2:[function(require,module,exports){
const simpleInputValidator = require('../modules/validators/simpleInputValidator');
const renderDOM = require('../modules/renderDOM');
const popup = require('../templates/ui/popup');
const blogPreview = require('../templates/blog/blog');

class PostFilter {
  constructor(container, select, input, btn, cancelBtn, data, target) {
    this.filter = document.getElementById(container);
    this.select = this.filter.querySelector(select);
    this.input = this.filter.querySelector(input);
    this.btn = this.filter.querySelector(btn);
    this.cancelBtn = this.filter.querySelector(cancelBtn);
    this._data = data;
    this.target = document.getElementById(target);

    this.input.addEventListener('input', this.validateInput);
    this.select.addEventListener('change', this.validateSelect);
    this.filter.addEventListener('submit', this.filterSubmitHandler.bind(this));
    this.cancelBtn.addEventListener('click', this.cancelHandler.bind(this));
    this.filterInit();
  }

  filterInit() {
    if (localStorage.getItem('isFilterUsed')) {
      const filterByValue = localStorage.getItem('filterBy');
      const value = localStorage.getItem('keyWord');
      this.input.value = value;
      this.select.querySelector('option[selected]').removeAttribute('selected');
      this.select.querySelector(`option[value="${filterByValue}"]`).setAttribute('selected', 'selected');
    }
  }

  validateInput(event) {
    const $target = event.target;
    const isValid = $target.value.length > 2;
    return simpleInputValidator(isValid, $target);
  }

  validateSelect(event) {
    const $target = event.target;
    const isValid = $target.value !== 'placeholder';
    return simpleInputValidator(isValid, $target);
  }

  filterSubmitHandler(event) {
    event.preventDefault();
    if (!this.validateInput({target: this.input}) || !this.validateSelect({target: this.select})) {
      return false;
    }

    localStorage.setItem('isFilterUsed', 'true');
    localStorage.setItem('filterBy', this.select.value);
    localStorage.setItem('keyWord', this.input.value);
    this.filterPost(this.select.value, this.input.value);
  }

  filterPost(filterByValue, value) {
    const result = this._data.filter( (post) => post[filterByValue].toLocaleLowerCase().includes(value.toLocaleLowerCase()));

    if (result.length > 0) {
      this.target.innerHTML = '';
      renderDOM(this.target, blogPreview(result));
    } else {
      const $popup = renderDOM(null, popup());
      $popup.querySelector('.popup__title').innerHTML = '';
      $popup.querySelector('.popup__inner').appendChild(createPopupContent());
      document.body.appendChild($popup);
    }
  }

  cancelHandler(event) {
    event.preventDefault();
    this.target.innerHTML = '';
    renderDOM(this.target, blogPreview(this._data));
  }
}

function createPopupContent() {
  const img = document.createElement('img');
  img.src = 'https://usercontent2.hubstatic.com/13523673.jpg';
  img.alt = 'Sorry, no results found :(';
  return img;
}

module.exports = PostFilter;

},{"../modules/renderDOM":22,"../modules/validators/simpleInputValidator":24,"../templates/blog/blog":25,"../templates/ui/popup":38}],3:[function(require,module,exports){
const Post = require('./Post');
const popupTempl = require('../templates/ui/popup');
const renderDOM = require('../modules/renderDOM');

class PostMusic extends Post {
  constructor($article, src) {
    super($article, src);
    this.poster.addEventListener('click', this.showSong.bind(this));
  }

  showSong() {
    const audio = document.createElement('audio');
    audio.setAttribute('controls', 'controls');
    audio.setAttribute('loop', 'loop');

    const source = document.createElement('source');
    source.src = this.src;

    const link = document.createElement('a');
    link.href = this.src;
    link.textContent = 'Download song';

    audio.appendChild(source);
    audio.appendChild(link);

    const popup = renderDOM(null, popupTempl());
    popup.querySelector('.popup__inner').appendChild(audio);
    document.body.appendChild(popup);
  }
}

module.exports = PostMusic;

},{"../modules/renderDOM":22,"../templates/ui/popup":38,"./Post":1}],4:[function(require,module,exports){
const Post = require('./Post');
const popupTempl = require('../templates/ui/popup');
const renderDOM = require('../modules/renderDOM');

class PostPic extends Post {
  constructor($article, src) {
    super($article, src);
    this.poster.addEventListener('click', this.showPic.bind(this));
  }

  showPic(event) {
    const img = document.createElement('img');
    img.src = this.src;
    const popup = renderDOM(null, popupTempl());
    popup.querySelector('.popup__inner').appendChild(img);
    document.body.appendChild(popup);
  }
}

module.exports = PostPic;

},{"../modules/renderDOM":22,"../templates/ui/popup":38,"./Post":1}],5:[function(require,module,exports){
const Post = require('./Post');
const popupTempl = require('../templates/ui/popup');
const renderDOM = require('../modules/renderDOM');

class PostVideo extends Post {
  constructor($article, src) {
    super($article, src);
    this.poster.addEventListener('click', this.showPic.bind(this));
  }

  showPic(event) {
    const iframe = document.createElement('iframe');
    iframe.width = 717;
    iframe.height = 538;
    iframe.src = this.src;
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', 'allowfullscreen');

    const popup = renderDOM(null, popupTempl());
    popup.querySelector('.popup__inner').appendChild(iframe);
    document.body.appendChild(popup);
  }
}

module.exports = PostVideo;

},{"../modules/renderDOM":22,"../templates/ui/popup":38,"./Post":1}],6:[function(require,module,exports){
module.exports = () => {
  return [{
      "year": "2014",
      "month": "nov",
      "day": "09",
      "img": "img/article/post-1.jpg",
      "title": "Coffee is good, coffee is great",
      "author": "By Author1",
      "commentsCount": "3",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque veniam in nobis nulla, excepturi necessitatibus maxime sapiente laborum, rerum asperiores ipsa similique quos, deserunt beatae aliquam maiores alias sed dolorum? Rerum recusandae culpa nobis ipsa dolores consequatur voluptate. Est commodi amet dolores atque autem sapiente quidem numquam assumenda. Veritatis corrupti minima omnis nobis quos, repellat sed voluptate facere, nisi eum labore, dolor quam autem quisquam hic, quasi placeat doloribus laudantium.",
      "category": "pic",
      "id": "1415484000000",
    },
    {
      "year": "2014",
      "month": "nov",
      "day": "08",
      "img": "img/article/post-2.jpg",
      "title": "Blog Post With Youtube video",
      "author": "By Author2",
      "commentsCount": "3",
      "text": "Neque veniam in nobis nulla, excepturi necessitatibus maxime sapiente laborum, rerum asperiores ipsa similique quos, deserunt beatae aliquam maiores alias sed dolorum? Rerum recusandae culpa nobis ipsa dolores consequatur voluptate. Est commodi amet dolores atque autem sapiente quidem numquam assumenda. Veritatis corrupti minima omnis nobis quos, repellat sed voluptate facere, nisi eum labore, dolor quam autem quisquam hic, quasi placeat doloribus laudantium.",
      "category": "film",
      "id": "1415397600000",
    },
    {
      "year": "2014",
      "month": "nov",
      "day": "07",
      "img": "",
      "title": "Just a post, a simple post",
      "author": "By Author3",
      "commentsCount": "3",
      "text": "Est commodi amet dolores atque autem sapiente quidem numquam assumenda. Veritatis corrupti minima omnis nobis quos, repellat sed voluptate facere, nisi eum labore, dolor quam autem quisquam hic, quasi placeat doloribus laudantium.",
      "category": "write",
      "id": "1415311200000",
    },
    {
      "year": "2014",
      "month": "nov",
      "day": "06",
      "img": "img/article/post-3.jpg",
      "title": "This Could be Great",
      "author": "By Author4",
      "commentsCount": "3",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque veniam in nobis nulla, excepturi necessitatibus maxime sapiente laborum, rerum asperiores ipsa similique quos, deserunt beatae aliquam maiores alias sed dolorum? Rerum recusandae culpa nobis ipsa dolores consequatur voluptate. Est commodi amet dolores atque autem sapiente quidem numquam assumenda. Veritatis corrupti minima omnis nobis quos, repellat sed voluptate facere, nisi eum labore, dolor quam autem quisquam hic, quasi placeat doloribus laudantium.",
      "category": "music",
      "id": "1415224800000",
    },
  ];
};

},{}],7:[function(require,module,exports){
module.exports = () => {
  return {
    "slides": [{
      "header": "Expire",
      "text": "Professionaly designed, carefully made for your enjoyement",
    },
    {
      "header": "Provide",
      "text": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia, tempore!",
    },
    {
      "header": "Explore",
      "text": "Ipsum dolor sit amet consectetur! Professionaly designed.",
    }],
  };
};


},{}],8:[function(require,module,exports){
module.exports = () => {
  return {
    "year": "2018",
    "day": "09",
    "mounth": "NOV",
    "title": "Coffee is good, coffee is great",
    "author": "By Author",
    "img": "img/article/post-1.jpg",
    "text": [
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque veniam in nobis nulla, excepturi\n necessitatibus maxime sapiente laborum, rerum asperiores ipsa similique quos, deserunt beatae aliquam\n maiores alias sed dolorum? Rerum recusandae culpa nobis ipsa dolores consequatur voluptate. Est\n commodi\n amet dolores atque autem sapiente quidem numquam assumenda. Veritatis corrupti minima omnis nobis\n quos,\n repellat sed voluptate facere, nisi eum labore, dolor quam autem quisquam hic, quasi placeat\n doloribus\n laudantium.",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque veniam in nobis nulla, excepturi\n necessitatibus maxime sapiente laborum, rerum asperiores ipsa similique quos, deserunt beatae aliquam\n maiores alias sed dolorum? Rerum recusandae culpa nobis ipsa dolores consequatur voluptate. Est\n commodi\n amet dolores atque autem sapiente quidem numquam assumenda.",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque veniam in nobis nulla, excepturi\n necessitatibus maxime sapiente laborum, rerum asperiores ipsa similique quos, deserunt beatae aliquam\n maiores alias sed dolorum? Rerum recusandae culpa nobis ipsa dolores consequatur voluptate. Est\n commodi\n amet dolores atque autem sapiente quidem numquam assumenda. Veritatis corrupti minima omnis nobis\n quos,\n repellat sed voluptate facere.",
      "Rerum recusandae culpa nobis ipsa dolores consequatur voluptate. Est commodi amet dolores atque autem\n sapiente quidem numquam assumenda. Veritatis corrupti minima omnis nobis quos, repellat sed voluptate\n facere..."
    ],
    "blockquote": "We are not simply in the universe, we are part of it. We are born from it. One might even say we have\n been empowered by the universe to figure itself out — and we have only just begun.",
    "comments": [{
        "avatar": "img/avatars/cat-1.jpg",
        "user": "User Qwerty",
        "comment": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi mollitia sed,\n aspernatur porro fuga eveniet maiores? Minima itaque cum neque quisquam veniam, id deleniti ad! Ab enim\n est veniam neque officia blanditiis eligendi earum et optio, totam sunt aliquam culpa, deleniti illo!\n Dolorum laborum voluptate aperiam cupiditate quod laboriosam, sint numquam veritatis ad architecto\n inventore eligendi atque reiciendis possimus beatae vero non minus praesentium sapiente. Voluptates,\n asperiores exercitationem totam reiciendis cumque placeat laboriosam nulla reprehenderit fuga. Hic, vero\n beatae odit delectus sint asperiores deleniti corporis minus harum, fugiat vel in inventore. Molestias\n explicabo voluptate earum consequatur ad enim obcaecati quibusdam neque reprehenderit dolor temporibus\n eveniet sint, nobis unde tempora numquam dicta fuga adipisci accusantium magni, similique officiis iure.\n Dicta excepturi, aliquid quo pariatur totam voluptas harum amet, provident distinctio veniam iste commodi\n itaque soluta laboriosam maiores placeat quam vero suscipit voluptatum sequi est ratione? Cupiditate,\n rem? Fugit animi quia aut!"
      },
      {
        "avatar": "img/avatars/cat-1.jpg",
        "user": "User Qwerty",
        "comment": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi mollitia sed,\n aspernatur porro fuga eveniet maiores? Minima itaque cum neque quisquam veniam, id deleniti ad! Ab enim\n est veniam neque officia blanditiis eligendi earum et optio, totam sunt aliquam culpa, deleniti illo!\n Dolorum laborum voluptate aperiam cupiditate quod laboriosam, sint numquam veritatis ad architecto\n inventore eligendi atque reiciendis possimus beatae vero non minus praesentium sapiente. Voluptates,\n asperiores exercitationem totam reiciendis cumque placeat laboriosam nulla reprehenderit fuga. Hic, vero\n beatae odit delectus sint asperiores deleniti corporis minus harum, fugiat vel in inventore. Molestias\n explicabo voluptate earum consequatur ad enim obcaecati quibusdam neque reprehenderit dolor temporibus\n eveniet sint, nobis unde tempora numquam dicta fuga adipisci accusantium magni, similique officiis iure.\n Dicta excepturi, aliquid quo pariatur totam voluptas harum amet, provident distinctio veniam iste commodi\n itaque soluta laboriosam maiores placeat quam vero suscipit voluptatum sequi est ratione? Cupiditate,\n rem? Fugit animi quia aut!",
        "reply": "reply"

      },
      {
        "avatar": "img/avatars/cat-2.jpg",
        "user": "User Qwerty2",
          "comment": "Modi mollitia sed, aspernatur porro fuga eveniet maiores? Minima itaque cum neque quisquam veniam, id deleniti ad! Ab enim est veniam neque officia blanditiis eligendi earum et optio, totam sunt aliquam culpa, deleniti illo! Dolorum laborum voluptate aperiam cupiditate quod laboriosam, sint numquam veritatis ad architecto inventore eligendi atque reiciendis possimus beatae vero non minus praesentium sapiente. Voluptates, asperiores exercitationem totam reiciendis cumque placeat laboriosam nulla reprehenderit fuga. Hic, vero beatae odit delectus sint asperiores deleniti corporis minus harum, fugiat vel in inventore. Molestias explicabo voluptate earum consequatur ad enim obcaecati quibusdam neque reprehenderit dolor temporibus eveniet sint, nobis unde tempora numquam dicta fuga adipisci accusantium magni, similique officiis iure. Dicta excepturi, aliquid quo pariatur totam voluptas harum amet, provident distinctio veniam iste commodi itaque soluta laboriosam maiores placeat quam vero suscipit voluptatum sequi est ratione? Cupiditate, rem? Fugit animi quia aut!",
        },
        {
          "avatar": "img/avatars/cat-1.jpg",
          "user": "User Qwerty1",
          "comment": "Modi mollitia sed, aspernatur porro fuga eveniet maiores? Minima itaque cum neque quisquam veniam, id deleniti ad! Ab enim est veniam neque officia blanditiis eligendi earum et optio, totam sunt aliquam culpa, deleniti illo! Dolorum laborum voluptate aperiam cupiditate quod laboriosam, sint numquam veritatis ad architecto inventore eligendi atque reiciendis possimus beatae vero non minus praesentium sapiente. Voluptates, asperiores exercitationem totam reiciendis cumque placeat laboriosam nulla reprehenderit fuga. Hic, vero beatae odit delectus sint asperiores deleniti corporis minus harum, fugiat vel in inventore. Molestias explicabo voluptate earum consequatur ad enim obcaecati quibusdam neque reprehenderit dolor temporibus eveniet sint, nobis unde tempora numquam dicta fuga adipisci accusantium magni, similique officiis iure. Dicta excepturi, aliquid quo pariatur totam voluptas harum amet, provident distinctio veniam iste commodi itaque soluta laboriosam maiores placeat quam vero suscipit voluptatum sequi est ratione? Cupiditate, rem? Fugit animi quia aut!",
        }
      ],
    "categories": [{
        "title": "Tales of a different kind",
        "count": "7",
      },
      {
        "title": "In the middle of a scary story",
        "count": "3",
      },
      {
        "title": "Lyrics in line",
        "count": "1",
      },
      {
        "title": "Water and glass",
        "count": "2",
      },
    ],
    "tags": [
      "love",
      "signs",
      "waterfall",
      "inspiration",
      "quotes",
      "sea",
      "sense",
      "coffee",
      "images",
      "gold",
      "dancing",
      "courage",
    ],
    "resentPosts": [{
        "title": "Blog Post With Youtube video",
        "date": "29 November 2014",
        "img": "img/article/resent-1.jpg"
      },
      {
        "title": "Blog Post With Youtube video",
        "date": "28 November 2014",
        "img": "img/article/resent-2.jpg",
      },
    ],
    "twitts": [{
      "author": "dingo_design",
      "text": "Check out our new theme Expire on themeforest",
      "hashs": ["themeforest", "theme", "Expire"],
      "date": "about 3 days ago"
    }, ],
    "related": [{
        "img": "img/article/related-1.jpg",
        "title": "Blog Post With Youtube video",
      },
      {
        "img": "img/article/related-2.jpg",
        "title": "This Could be Great",
      }
    ]
  }
}
},{}],9:[function(require,module,exports){
function addListenen(targterElQuery, eventType, currentElQuery, handler) {
  document.querySelector(targterElQuery)
      .addEventListener(eventType, function(event) {
        const eventTarget = event.target;
        const currentEl = document.querySelector(currentElQuery);
        if (eventTarget === currentEl) {
          return handler(event);
        }
        return;
      });
}

module.exports = addListenen;

},{}],10:[function(require,module,exports){
module.exports = (numb) => {
  return `${numb}`.length >= 2 ?
  `${numb}`
  :
  `0${numb}`;
};

},{}],11:[function(require,module,exports){
const prefix = 'Simon Says:';
const postfix = 'Please try again later.';

const errorClient = {
  '400': 'You are looking for something wrong',
  '404': 'The thing you were looking for was not found',
};

module.exports = (code) => {
  if (isNaN(code)) {
    return severError(500);
  }
  if (code > 399 && code < 500) {
    return clientError(code, errorClient);
  }

  if (code >= 500) {
    return severError(code);
  }
};

function clientError(code, vocabulary) {
  return vocabulary[code] ?
    `${prefix} "${vocabulary[code]}". ${postfix}`
    :
    `Oops something went wrong :\'(. ${postfix}`;
};

function severError(code, vocabulary) {
  return `Some nasty bugs captured our server \
  and we need time to deal with them. ${postfix}`;
};

},{}],12:[function(require,module,exports){
module.exports = (numb) => {
  let month;
  switch (numb) {
    case 0:
      month = 'Jan'.toUpperCase();
      break;

    case 1:
      month = 'Feb'.toUpperCase();
      break;

    case 2:
      month = 'Mar'.toUpperCase();
      break;

    case 3:
      month = 'Apr'.toUpperCase();
      break;

    case 4:
      month = 'May'.toUpperCase();
      break;

    case 5:
      month = 'Jun'.toUpperCase();
      break;

    case 6:
      month = 'Jul'.toUpperCase();
      break;

    case 7:
      month = 'Aug'.toUpperCase();
      break;

    case 8:
      month = 'Sept'.toUpperCase();
      break;

    case 9:
      month = 'Oct'.toUpperCase();
      break;

    case 10:
      month = 'Nov'.toUpperCase();
      break;

    case 11:
      month = 'Dec'.toUpperCase();
      break;

    default:
      break;
  }
  return month;
};

},{}],13:[function(require,module,exports){
// const parseDOM = require('./modules/parseDOM');
const newPostPopup = require('./modules/addNewPost');
newPostPopup();

const Post = require('./modules/Post/index');
const Home = require('./modules/Home/index');
const Blog = require('./modules/Blog/index');
const path = window.location.pathname;

switch (path) {
  case '/':
    Home();
    break;

  case '/blog.html':
    Blog();
    break;

  case '/post.html':
    Post();
    break;

  default:
    break;
}

},{"./modules/Blog/index":15,"./modules/Home/index":17,"./modules/Post/index":18,"./modules/addNewPost":20}],14:[function(require,module,exports){
// Added Autoply

const DraggableCarousel = require('./DraggableCarousel');

module.exports = function(_container, options) {
  DraggableCarousel.call(this, _container, options);

  this.autoMuve = function() {
    return setInterval(this.nextSlide.bind(this), 3000);
  };

  this.parentInit = this.sliderInit.bind(this);

  this.sliderInit = function() {
    this.parentInit();

    this.container.
        parentElement.
        parentElement.addEventListener('mouseenter', () => {
          if (this.autoMuve) {
            clearInterval(this.hoverID);
            this.hoverID = null;
          }
        });

    this.container.
        parentElement.
        parentElement.addEventListener('mouseleave', () => {
          this.hoverID = this.autoMuve();
        });
  };

  this.hoverID = this.autoMuve();
};

},{"./DraggableCarousel":16}],15:[function(require,module,exports){
const renderDOM = require('../renderDOM');
const pagination = require('../../templates/blog/padination');
const blogPreview = require('../../templates/blog/blog');
const errorParser = require('../../helpers/errorParser');
const PostFilter = require('../../components/PostFilter');
let errorWasShowed = false;

module.exports = () => {
  fetch('http://localhost:3000/api/list')
      // .catch( (err) => {
      //   errorWasShowed = true;
      //   alert(errorParser(500));
      // })
      .then( (res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then( (data) => {
        const filter = new PostFilter('filter-post', '#sort-by', '#keyword', '#filter-post-btn', '#filter-post-cancel-btn', data, 'main');
        renderDOM(document.getElementById('main'), blogPreview(data));
        renderDOM(document.getElementById('main'), pagination());
      })
      // .catch( (error) => {
      //   if (!errorWasShowed) {
      //     alert(errorParser(error.message));
      //   }
      // });
};

},{"../../components/PostFilter":2,"../../helpers/errorParser":11,"../../templates/blog/blog":25,"../../templates/blog/padination":26,"../renderDOM":22}],16:[function(require,module,exports){
// Can Drag Slides
// Added maskers

const SimpleCarousel = require('./SimpleCarousel');

module.exports = function(_container, options) {
  SimpleCarousel.call(this, _container, options);
  this._currentSlide = 0;
  this.markers = this.container.parentElement.querySelector('.markers');

  this.parentNextSlide = this.nextSlide.bind(this);
  this.parentPrevSlide = this.prevSlide.bind(this);

  this.nextSlide = function(event) {
    this.parentNextSlide.call(this, event);

    this.markers.children[this._currentSlide].classList.remove('active');
    this._currentSlide = this._currentSlide + 1 === this._slidesAmount ?
    0
    :
    ++this._currentSlide;
    this.markers.children[this._currentSlide].classList.add('active');
  };
  this.prevSlide = function(event) {
    this.parentPrevSlide.call(this, event);

    this.markers.children[this._currentSlide].classList.remove('active');
    this._currentSlide = this._currentSlide - 1 < 0 ?
    this._slidesAmount - 1
    :
    --this._currentSlide;
    this.markers.children[this._currentSlide].classList.add('active');
  };

  this.mousedownHandler = function(event) {
    this.container.style.userSelect = 'none';
    const startPoint = event.clientX;
    document.body.
        addEventListener(
            'mouseup', (event) => {
              this.mouseupHandles.call(this, event, startPoint);
            }, {
              once: true,
            }
        );
  };

  this.mouseupHandles = function(event, start) {
    this.container.style.userSelect = 'all';
    const end = event.clientX;

    if (end === start) {
      return;
    }

    (start > end && start !== end) ?
    this.nextSlide():
      this.prevSlide();
  };

  this._parentInit = this.sliderInit.bind(this);

  this.sliderInit = function() {
    this._parentInit();

    this.container.
        addEventListener('mousedown', this.mousedownHandler.bind(this));
  };
};

},{"./SimpleCarousel":19}],17:[function(require,module,exports){
const renderDOM = require('../renderDOM');
const carousel = require('../../templates/home/carousel');
const homeTemplate = require('../../templates/home/main');
const sliderConstructor = require('../../modules/carousel');
const SimpleCarousel = require('../SimpleCarousel');
const DraggableCarousel = require('../DraggableCarousel');
const AutoplayCarousel = require('../AutoplayCarousel');

let data;

module.exports = () => {
  data = [require('../../data/home/data')(), require('../../data/blog/blog')()];
  renderDOM(document.getElementById('header-container'), carousel(data[0]));
  renderDOM(document.getElementById('main'), homeTemplate(data[1]));


  sliderConstructor('#laters-post-carousel', {slidesSameTime: 3}, SimpleCarousel).sliderInit();
  sliderConstructor('#main-carousel-slide-wrapper', {slidesSameTime: 1}, DraggableCarousel).sliderInit();
  sliderConstructor('#testimonials-container', {slidesSameTime: 1}, AutoplayCarousel).sliderInit();
};

},{"../../data/blog/blog":6,"../../data/home/data":7,"../../modules/carousel":21,"../../templates/home/carousel":27,"../../templates/home/main":28,"../AutoplayCarousel":14,"../DraggableCarousel":16,"../SimpleCarousel":19,"../renderDOM":22}],18:[function(require,module,exports){
const renderDOM = require('../renderDOM');
const articleTemplate = require('../../templates/post/article');
const commentTemplate = require('../../templates/post/comments');
const categoriesTemplate = require('../../templates/post/categories');
const tagsContent = require('../../templates/post/tags');
const resentPosts = require('../../templates/post/resentPosts');
const twittFeed = require('../../templates/post/twitterFeed');
const commentForm = require('../../templates/post/form');
const relatedPosts = require('../../templates/post/relatedPosts');
let data;
const info = require('../../data/post/post')();
const errorParser = require('../../helpers/errorParser');
let errorWasShowed = false;

const PostPic = require('../../components/PostPic');
const PostVideo = require('../../components/PostVideo');
const PostMusic = require('../../components/PostMusic');

module.exports = () => {
  if (location.hash !== '') {
    fetch(`http://localhost:3000/api/list/${location.hash.slice(1)}`)
        .catch((err) => {
          errorWasShowed = true;
          alert(errorParser(500));
        })
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.status);
          }
          return res.json();
        })
        .then((data) => {
          const article = renderDOM(document.getElementById('article'),
              articleTemplate(data));
          let post;

          switch (data.category) {
            case 'pic':
              post = new PostPic(article, data.src);
              break;

            case 'film':
              post = new PostVideo(article, data.src);
              break;

            case 'music':
              post = new PostMusic(article, data.src);
              break;

            default:
              post = new PostMusic(article, data.src);
              break;
          }

          renderDOM(document.getElementById('aside-content'),
              tagsContent(data));

          renderDOM(document.getElementById('comments'),
              commentForm());

          renderDOM(document.getElementById('aside-content'),
              resentPosts(info));

          renderDOM(document.getElementById('aside-content'),
              twittFeed(info));

          renderDOM(document.getElementById('comments'),
              relatedPosts(info));
        })
        .catch((error) => {
          if (isNaN(error.message)) {
            return alert(errorParser(404));
          }
          if (!errorWasShowed) {
            alert(errorParser(error.message));
          }
        });

    return;
  }
  data = require('../../data/post/post')();
  renderDOM(document.getElementById('article'), articleTemplate(data));
  data.comments.map((obj) => {
    renderDOM(document.getElementById('comments'), commentTemplate(obj));
  });
  renderDOM(document.getElementById('comments'), commentForm());
  renderDOM(
      document.getElementById('aside-content'),
      categoriesTemplate(data)
  );
  renderDOM(document.getElementById('aside-content'), tagsContent(data));
  renderDOM(document.getElementById('aside-content'), resentPosts(data));
  renderDOM(document.getElementById('aside-content'), twittFeed(data));
  renderDOM(document.getElementById('comments'), relatedPosts(data));
};

},{"../../components/PostMusic":3,"../../components/PostPic":4,"../../components/PostVideo":5,"../../data/post/post":8,"../../helpers/errorParser":11,"../../templates/post/article":29,"../../templates/post/categories":30,"../../templates/post/comments":31,"../../templates/post/form":32,"../../templates/post/relatedPosts":33,"../../templates/post/resentPosts":34,"../../templates/post/tags":35,"../../templates/post/twitterFeed":36,"../renderDOM":22}],19:[function(require,module,exports){
// Can only move by controls

module.exports = function(_container, options) {
  this.container = document.querySelector(_container);
  this._slidesAmount = this.container.children.length;

  this.prevBtn = this.container.
      parentElement.
      parentElement.querySelector('.slider__prev');

  this.nextBtn = this.container.
      parentElement.
      parentElement.querySelector('.slider__next');

  this.nextSlide = function(event) {
    if (event && this.hoverID) {
      clearInterval(this.hoverID);
      this.hoverID = null;
    }
    const firstEl = this.container.firstElementChild.cloneNode(true);
    this.container.appendChild(firstEl);

    setTimeout(() => {
      this.container.style.transition = `.6s`;
      this.container.style.transform = `translateX(-${100/options.slidesSameTime}%)`;
    }, 0);

    this.container.addEventListener('transitionend', () => {
      this._rmFirstSlide.call(this, event);
    }, {
      once: true,
    });
  };

  this.prevSlide = function(event) {
    if (event && this.hoverID) {
      clearInterval(this.hoverID);
      this.hoverID = null;
    }
    this._lastEl = this.container.lastElementChild.cloneNode(true);
    this.container.insertBefore(this._lastEl, this.container.firstElementChild);
    this.container.style.transform = `translateX(-${100/options.slidesSameTime}%)`;

    setTimeout(() => {
      this.container.style.transition = `.6s`;
      this.container.style.transform = `translateX(0%)`;
    }, 100);

    this.container.addEventListener('transitionend', () => {
      this._rmLastSlide.call(this, event);
    }, {
      once: true,
    });
  };

  this.sliderInit = function() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', this.prevSlide.bind(this), {
        once: true,
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', this.nextSlide.bind(this), {
        once: true,
      });
    }
  };

  this._rmLastSlide = function(event) {
    this.container.lastElementChild.remove();
    this.container.setAttribute('style', '');

    if (event) {
      this.prevBtn.addEventListener('click', this.prevSlide.bind(this), {
        once: true,
      });
    }
  };

  this._rmFirstSlide = function(event) {
    this.container.firstElementChild.remove();
    this.container.setAttribute('style', '');
    if (event) {
      this.nextBtn.addEventListener('click', this.nextSlide.bind(this), {
        once: true,
      });
    }
  };
};

},{}],20:[function(require,module,exports){
const validate = require('./validators/index')();
const addListener = require('../helpers/addDeligateListener');
const template = require('../templates/ui/addPostPopup')();
const render = require('../modules/renderDOM');
const errorParser = require('../helpers/errorParser');
const errorWasShowed = false;

module.exports = () => {
  addListener('body', 'click', '#add-article-btn', addPopup);
  addListener('body', 'click', '#popup-close-btn', closePopup);
  addListener('body', 'submit', '#add-post-form', sendData);
};


function addPopup(event) {
  render(document.body, template);
}

function closePopup(event) {
  event.target.parentElement.parentElement.parentElement.remove();
}

function sendData(event) {
  event.preventDefault();

  const title = event.target.querySelector('input[name="title"]').value;
  if (!validate.title(title)) {
    return alert('Please, enter a Valid Title');
  }

  const _data = createData(event.target);
  const body = JSON.stringify(_data);

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const options = {
    method: 'POST',
    headers,
    body,
  };


  fetch('http://localhost:3000/api/create-article', options)
      .then( (res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) => window.location = `/post.html#${_data.id}`)
      .catch((error) => {
        if (!errorWasShowed) {
          alert(errorParser(error.message));
        }
      });
}

function createData(form) {
  const data = {};
  const map = [].map;

  map.call(form, (el) => {
    let value;

    if (!el.name || !el.value) {
      return;
    }

    if (el.multiple) {
      value = map.call(el.selectedOptions, (option) => option.value);
      data[el.name] = value;
      return;
    }

    value = el.value;
    data[el.name] = el.value;
  });

  // data.id = data.title.toLocaleLowerCase().replace(/ /gi, '-');
  data.id = Date.now();

  return data;
}

},{"../helpers/addDeligateListener":9,"../helpers/errorParser":11,"../modules/renderDOM":22,"../templates/ui/addPostPopup":37,"./validators/index":23}],21:[function(require,module,exports){
module.exports = Carousel;

function Carousel(_container, options, CarouselClass) {
  return new CarouselClass(_container, options);
};

},{}],22:[function(require,module,exports){
function renderDOM(parent, obj) {
  let element;
  switch (obj.tagName === 'text') {
    case true:
      element = document.createTextNode(obj.textValue);
      break;
    case false:
      element = document.createElement(obj.tagName);
      if (obj.attributes) {
        for (const attr in obj.attributes) {
          if (Object.prototype.hasOwnProperty.call(obj.attributes, attr)) {
            element.setAttribute(`${attr}`, obj.attributes[attr]);
          }
        }
      }
      break;

    default:
      break;
  }
  if (parent) {
    parent.appendChild(element);
  }

  if (obj.childrens) {
    obj.childrens.map((el) => {
      renderDOM(element, el);
    });
  }
  return element;
}

module.exports = renderDOM;

},{}],23:[function(require,module,exports){
module.exports = () => {
  return {
    title,
  };
};

function title(value) {
  if (typeof value !== 'string') {
    return false;
  }

  if (!checkLength(value) || !checkTheFirstSumb(value.charCodeAt(0))) {
    return false;
  }

  const arrOfSpecSumbCode = [32, 33, 44, 45, 46, 58, 63];
  const arrOfSumb = value.split('');
  const arrOfSumbCodes = arrOfSumb.map((el) => el.charCodeAt(0));

  if (!checkTheRightSumb(arrOfSumbCodes, arrOfSpecSumbCode)) {
    return false;
  }

  return true;
}

function checkTheRightSumb(arrOfSumbCodes, arrOfSpecSumbCode) {
  for (let i = 0; i < arrOfSumbCodes.length; i++) {
    if ((arrOfSumbCodes[i] >= 65 && arrOfSumbCodes[i] <= 90) ||
      (arrOfSumbCodes[i] >= 97 && arrOfSumbCodes[i] <= 122) ||
      (arrOfSumbCodes[i] >= 48 && arrOfSumbCodes[i] <= 57) ||
      arrOfSpecSumbCode.includes(arrOfSumbCodes[i])) {
      return true;
    }
    return false;
  }
}

function checkTheFirstSumb(firstCodeSumb) {
  if (firstCodeSumb >= 65 && firstCodeSumb <= 90) {
    return true;
  }
  return false;
}

function checkLength(str) {
  if (str.length > 2 && str.length < 20) {
    return true;
  }
  return false;
}

},{}],24:[function(require,module,exports){
module.exports = (bool, input) => {
  if (bool) {
    input.style.outline = '1px solid green';
    return true;
  }

  input.style.outline = '1px solid red';
  return false;
};

},{}],25:[function(require,module,exports){
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

},{"../../helpers/dayParser":10,"../../helpers/monthSwitcher":12}],26:[function(require,module,exports){
module.exports = () => {
  return {
    attributes: {
      class: 'pagination',
    },
    childrens: [{
      attributes: {
        class: 'container',
      },
      childrens: [{
        attributes: {
          class: 'row',
        },
        childrens: [{
          attributes: {
            class: 'pagination__btns',
          },
          childrens: [{
            attributes: {
              class: 'pagination__btn',
            },
            childrens: [{
              tagName: 'text',
              textValue: '1',
            }],
            tagName: 'BUTTON',
          }, {
            attributes: {
              class: 'pagination__btn',
            },
            childrens: [{
              tagName: 'text',
              textValue: '2',
            }],
            tagName: 'BUTTON',
          }, {
            attributes: {
              class: 'pagination__btn-next',
            },
            childrens: [{
              tagName: 'text',
              textValue: 'NEXT PAGE',
            }],
            tagName: 'BUTTON',
          }],
          tagName: 'DIV',
        }],
        tagName: 'DIV',
      }],
      tagName: 'DIV',
    }],
    tagName: 'DIV',
  };
};

},{}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
/* eslint-disable max-len */
module.exports = (data) => {
  return {
    attributes: {},
    childrens: [{
      attributes: {
        class: 'about',
        id: 'about',
      },
      childrens: [{
        attributes: {
          class: 'container',
        },
        childrens: [{
          attributes: {
            class: 'row',
          },
          childrens: [{
            attributes: {
              class: 'about__header',
            },
            childrens: [{
              tagName: 'text',
              textValue: 'About Us',
            }],
            tagName: 'H2',
          }, {
            attributes: {
              class: 'about__text',
            },
            childrens: [{
              tagName: 'text',
              textValue: 'This is who we are - or at least who we strive to be...',
            }],
            tagName: 'P',
          }],
          tagName: 'DIV',
        }, {
          attributes: {
            class: 'about-content row',
          },
          childrens: [{
            attributes: {
              class: 'about-content__item',
            },
            childrens: [{
              attributes: {
                class: 'about-content__header',
              },
              childrens: [{
                tagName: 'text',
                textValue: 'If you can\'t explain it simply, you don\'t understand it well enough.',
              }],
              tagName: 'H3',
            }, {
              attributes: {
                class: 'about-content__btn btn btn--fill btn--dib',
                href: '#',
              },
              childrens: [{
                tagName: 'text',
                textValue: 'THE MORE YOU KNOW',
              }],
              tagName: 'A',
            }],
            tagName: 'DIV',
          }, {
            attributes: {
              class: 'about-content__item about-content__item--servise',
            },
            childrens: [{
              attributes: {
                class: 'about-content__item-servise',
              },
              childrens: [{
                attributes: {
                  class: 'about-content__item-servise-line',
                },
                childrens: [],
                tagName: 'SPAN',
              }, {
                attributes: {
                  class: 'about-content__service-type about-content__service-type--typo',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'TYPOGRAPHY',
                }],
                tagName: 'H3',
              }, {
                attributes: {
                  class: 'about-content__service-text',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis at, voluptatem similique tempora\n voluptate quia in ea minima earum consequatur eveniet, praesentium illum error',
                }],
                tagName: 'P',
              }],
              tagName: 'DIV',
            }],
            tagName: 'DIV',
          }, {
            attributes: {
              class: 'about-content__item about-content__item--servise',
            },
            childrens: [{
              attributes: {
                class: 'about-content__item-servise',
              },
              childrens: [{
                attributes: {
                  class: 'about-content__item-servise-line',
                },
                childrens: [],
                tagName: 'SPAN',
              }, {
                attributes: {
                  class: 'about-content__service-type about-content__service-type--ico',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'FULL ICON SET',
                }],
                tagName: 'H3',
              }, {
                attributes: {
                  class: 'about-content__service-text',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis at, voluptatem similique tempora\n voluptate quia in ea minima earum consequatur eveniet, praesentium illum error',
                }],
                tagName: 'P',
              }],
              tagName: 'DIV',
            }],
            tagName: 'DIV',
          }, {
            attributes: {
              class: 'about-content__item about-content__item--servise',
            },
            childrens: [{
              attributes: {
                class: 'about-content__item-servise',
              },
              childrens: [{
                attributes: {
                  class: 'about-content__item-servise-line',
                },
                childrens: [],
                tagName: 'SPAN',
              }, {
                attributes: {
                  class: 'about-content__service-type about-content__service-type--acc',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'ACCURATE',
                }],
                tagName: 'H3',
              }, {
                attributes: {
                  class: 'about-content__service-text',
                },
                childrens: [{
                  tagName: 'text',
                  textValue: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis at, voluptatem similique tempora\n voluptate quia in ea minima earum consequatur eveniet, praesentium illum error',
                }],
                tagName: 'P',
              }],
              tagName: 'DIV',
            }],
            tagName: 'DIV',
          }],
          tagName: 'DIV',
        }],
        tagName: 'DIV',
      }],
      tagName: 'SECTION',
    }, {
      attributes: {
        class: 'paralax',
      },
      childrens: [{
        attributes: {
          class: 'container',
        },
        childrens: [{
          attributes: {
            class: 'paralax__header',
          },
          childrens: [{
            tagName: 'text',
            textValue: 'Paralax section',
          }],
          tagName: 'H2',
        }, {
          attributes: {
            class: 'paralax__text',
          },
          childrens: [{
            tagName: 'text',
            textValue: 'Exploring the unexplored is a risky business, but a rewarding one.',
          }],
          tagName: 'P',
        }, {
          attributes: {
            class: 'row',
          },
          childrens: [{
            attributes: {
              class: 'paralax__blockquote',
            },
            childrens: [{
              tagName: 'text',
              textValue: 'Design is in everything we make, but it\'s also between those things.\n It\'s a mix of craft, science, storytelling, propaganda, and philosophy.',
            }, {
              attributes: {},
              childrens: [],
              tagName: 'BR',
            }, {
              attributes: {},
              childrens: [],
              tagName: 'BR',
            }, {
              attributes: {
                class: 'paralax__blockquote-author',
              },
              childrens: [{
                tagName: 'text',
                textValue: '— Erik Adigard',
              }],
              tagName: 'SPAN',
            }],
            tagName: 'BLOCKQUOTE',
          }],
          tagName: 'DIV',
        }],
        tagName: 'DIV',
      }],
      tagName: 'SECTION',
    }, {
      attributes: {
        class: 'case',
      },
      childrens: [{
        attributes: {
          class: 'container',
        },
        childrens: [{
          attributes: {
            class: 'row',
          },
          childrens: [{
            attributes: {
              class: 'case__item',
            },
            childrens: [{
              attributes: {
                class: 'case__item-header ti-user',
              },
              childrens: [{
                tagName: 'text',
                textValue: '1000+',
              }],
              tagName: 'H3',
            }, {
              attributes: {
                class: 'case__item-text',
              },
              childrens: [{
                tagName: 'text',
                textValue: 'Happy users',
              }],
              tagName: 'P',
            }],
            tagName: 'DIV',
          }, {
            attributes: {
              class: 'case__item',
            },
            childrens: [{
              attributes: {
                class: 'case__item-header ti-shopping-cart',
              },
              childrens: [{
                tagName: 'text',
                textValue: '200',
              }],
              tagName: 'H3',
            }, {
              attributes: {
                class: 'case__item-text',
              },
              childrens: [{
                tagName: 'text',
                textValue: 'Sold products',
              }],
              tagName: 'P',
            }],
            tagName: 'DIV',
          }, {
            attributes: {
              class: 'case__item',
            },
            childrens: [{
              attributes: {
                class: 'case__item-header ti-comments',
              },
              childrens: [{
                tagName: 'text',
                textValue: '5632',
              }],
              tagName: 'H3',
            }, {
              attributes: {
                class: 'case__item-text',
              },
              childrens: [{
                tagName: 'text',
                textValue: 'Comments',
              }],
              tagName: 'P',
            }],
            tagName: 'DIV',
          }, {
            attributes: {
              class: 'case__item',
            },
            childrens: [{
              attributes: {
                class: 'case__item-header ti-files',
              },
              childrens: [{
                tagName: 'text',
                textValue: '25000+',
              }],
              tagName: 'H3',
            }, {
              attributes: {
                class: 'case__item-text',
              },
              childrens: [{
                tagName: 'text',
                textValue: 'Lines of code',
              }],
              tagName: 'P',
            }],
            tagName: 'DIV',
          }],
          tagName: 'DIV',
        }],
        tagName: 'DIV',
      }],
      tagName: 'SECTION',
    }, {
      attributes: {
        class: 'lates-posts',
      },
      childrens: [{
        attributes: {
          class: 'container',
        },
        childrens: [{
          attributes: {
            class: 'row',
          },
          childrens: [{
            attributes: {
              class: 'lates-posts__wrapper',
            },
            childrens: [{
              attributes: {
                class: 'lates-posts__header',
              },
              childrens: [{
                tagName: 'text',
                textValue: 'Latest Blog Posts',
              }],
              tagName: 'H2',
            }, {
              attributes: {
                class: 'lates-posts__text',
              },
              childrens: [{
                tagName: 'text',
                textValue: 'Information is a source of learning. But unless it is organized, processed,\n and available to the right people in a format for decision making, it is a burden, not a benefit.',
              }],
              tagName: 'P',
            }],
            tagName: 'DIV',
          }],
          tagName: 'DIV',
        }],
        tagName: 'DIV',
      }, {
        attributes: {
          class: 'lates-post-carousel',
        },
        childrens: [{
          attributes: {
            class: 'lates-post-carousel__btn lates-post-carousel__btn--prew ti-angle-left slider__prev',
          },
          childrens: [],
          tagName: 'BUTTON',
        }, {
          attributes: {
            class: 'lates-post-carousel__btn lates-post-carousel__btn--next ti-angle-right slider__next',
          },
          childrens: [],
          tagName: 'BUTTON',
        }, {
          attributes: {
            class: 'container slider-wrapper overflow-h',
          },
          childrens: [{
            attributes: {
              class: 'row row-eq-height slider',
              id: 'laters-post-carousel',
            },
            childrens: data.map((post) => {
              return {
                attributes: {
                  class: 'lates-post slider__slide',
                },
                childrens: [{
                  attributes: {
                    class: 'lates-post__img',
                    style: post.img ? `background-image: url('${post.img}')` : '',
                  },
                  childrens: [],
                  tagName: 'DIV',
                }, {
                  attributes: {
                    class: 'lates-post__comtent',
                  },
                  childrens: [{
                    attributes: {
                      class: 'lates-post__header',
                    },
                    childrens: [{
                      attributes: {
                        class: 'lates-post__header-link',
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
                      class: 'lates-post__info',
                    },
                    childrens: [{
                      attributes: {
                        href: '#',
                        class: 'lates-post__info-el ti-user',
                      },
                      childrens: [{
                        tagName: 'text',
                        textValue: post.author,
                      }],
                      tagName: 'A',
                    }, {
                      attributes: {
                        href: '#',
                        class: 'lates-post__info-el ti-calendar',
                      },
                      childrens: [{
                        tagName: 'text',
                        textValue: `${post.day} ${post.month} ${post.year}`,
                      }],
                      tagName: 'A',
                    }, {
                      attributes: {
                        href: '#',
                        class: 'lates-post__info-el ti-comment',
                      },
                      childrens: [{
                        tagName: 'text',
                        textValue: post.commentsCount,
                      }],
                      tagName: 'A',
                    }],
                    tagName: 'DIV',
                  }, {
                    attributes: {
                      class: 'lates-post__text',
                    },
                    childrens: [{
                      tagName: 'text',
                      textValue: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis at, voluptatem similique tempora\n voluptate quia in ea minima earum consequatur eveniet, praesentium illum error delectus optio nobis\n eaque distinctio! Suscipit nostrum?',
                    }],
                    tagName: 'P',
                  }, {
                    attributes: {
                      href: '#',
                      class: 'lates-post__link btn btn--link',
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
              };
            }),
            tagName: 'DIV',
          }],
          tagName: 'DIV',
        }],
        tagName: 'DIV',
      }],
      tagName: 'SECTION',
    }, {
      attributes: {
        class: 'latest-portfolios',
        id: 'portfolios',
      },
      childrens: [{
        attributes: {
          class: 'latest-portfolios__line',
        },
        childrens: [],
        tagName: 'DIV',
      }, {
        attributes: {
          class: 'latest-portfolios__header',
        },
        childrens: [{
          tagName: 'text',
          textValue: 'Latest portfolio',
        }],
        tagName: 'H2',
      }, {
        attributes: {
          class: 'latest-portfolios__wrapper',
        },
        childrens: [{
          attributes: {
            class: 'latest-portfolio',
          },
          childrens: [],
          tagName: 'DIV',
        }, {
          attributes: {
            class: 'latest-portfolio',
          },
          childrens: [],
          tagName: 'DIV',
        }, {
          attributes: {
            class: 'latest-portfolio',
          },
          childrens: [{
            attributes: {
              class: 'latest-portfolio__wrapper',
            },
            childrens: [{
              attributes: {
                class: 'latest-portfolio__header',
              },
              childrens: [{
                tagName: 'text',
                textValue: 'Big city',
              }],
              tagName: 'H4',
            }, {
              attributes: {
                class: 'latest-portfolio__text',
              },
              childrens: [{
                tagName: 'text',
                textValue: 'Art, Photography, City',
              }],
              tagName: 'P',
            }, {
              attributes: {
                class: 'latest-portfolio__links',
              },
              childrens: [{
                attributes: {
                  class: 'latest-portfolio__link ti-link',
                  href: '',
                },
                childrens: [],
                tagName: 'A',
              }, {
                attributes: {
                  class: 'latest-portfolio__link ti-zoom-in',
                  href: '',
                },
                childrens: [],
                tagName: 'A',
              }],
              tagName: 'DIV',
            }],
            tagName: 'DIV',
          }],
          tagName: 'DIV',
        }, {
          attributes: {
            class: 'latest-portfolio',
          },
          childrens: [],
          tagName: 'DIV',
        }, {
          attributes: {
            class: 'latest-portfolio',
          },
          childrens: [],
          tagName: 'DIV',
        }, {
          attributes: {
            class: 'latest-portfolio',
          },
          childrens: [],
          tagName: 'DIV',
        }, {
          attributes: {
            class: 'latest-portfolio',
          },
          childrens: [],
          tagName: 'DIV',
        }, {
          attributes: {
            class: 'latest-portfolio',
          },
          childrens: [],
          tagName: 'DIV',
        }],
        tagName: 'DIV',
      }, {
        attributes: {
          href: '#',
          class: 'latest-portfolios__btn btn',
        },
        childrens: [{
          tagName: 'text',
          textValue: 'VIEW MORE',
        }],
        tagName: 'A',
      }],
      tagName: 'SECTION',
    }, {
      attributes: {
        class: 'partners',
      },
      childrens: [{
        attributes: {
          class: 'container',
        },
        childrens: [{
          attributes: {
            class: 'row',
          },
          childrens: [{
            attributes: {
              class: 'partners__item',
            },
            childrens: [{
              attributes: {
                class: 'partners__item-inner partners__item-inner--bg-activeden',
              },
              childrens: [],
              tagName: 'DIV',
            }],
            tagName: 'DIV',
          }, {
            attributes: {
              class: 'partners__item',
            },
            childrens: [{
              attributes: {
                class: 'partners__item-inner partners__item-inner--bg-audiojungle',
              },
              childrens: [],
              tagName: 'DIV',
            }],
            tagName: 'DIV',
          }, {
            attributes: {
              class: 'partners__item',
            },
            childrens: [{
              attributes: {
                class: 'partners__item-inner partners__item-inner--bg-codecanyon',
              },
              childrens: [],
              tagName: 'DIV',
            }],
            tagName: 'DIV',
          }, {
            attributes: {
              class: 'partners__item',
            },
            childrens: [{
              attributes: {
                class: 'partners__item-inner partners__item-inner--bg-graphicriver',
              },
              childrens: [],
              tagName: 'DIV',
            }],
            tagName: 'DIV',
          }, {
            attributes: {
              class: 'partners__item',
            },
            childrens: [{
              attributes: {
                class: 'partners__item-inner partners__item-inner--bg-photodune',
              },
              childrens: [],
              tagName: 'DIV',
            }],
            tagName: 'DIV',
          }, {
            attributes: {
              class: 'partners__item',
            },
            childrens: [{
              attributes: {
                class: 'partners__item-inner partners__item-inner--bg-themeforest',
              },
              childrens: [],
              tagName: 'DIV',
            }],
            tagName: 'DIV',
          }],
          tagName: 'DIV',
        }],
        tagName: 'DIV',
      }],
      tagName: 'DIV',
    }, {
      attributes: {
        class: 'others-say',
      },
      childrens: [{
        attributes: {
          class: 'filter',
        },
        childrens: [],
        tagName: 'DIV',
      }, {
        attributes: {
          class: 'filter-bg',
        },
        childrens: [],
        tagName: 'DIV',
      }, {
        attributes: {
          class: 'container',
        },
        childrens: [{
          attributes: {
            class: 'others-say__header',
          },
          childrens: [{
            tagName: 'text',
            textValue: 'And what do others say?',
          }],
          tagName: 'H2',
        }, {
          attributes: {
            class: 'row',
          },
          childrens: [{
            attributes: {
              class: 'testimonials-wrapper row',
            },
            childrens: [{
              attributes: {
                class: 'testimonials-container',
                id: 'testimonials-container',
              },
              childrens: [{
                attributes: {
                  class: 'testimonials',
                },
                childrens: [{
                  attributes: {
                    class: 'testimonials__avatar-img-wrapper',
                  },
                  childrens: [{
                    attributes: {
                      class: 'testimonials__avatar-img',
                    },
                    childrens: [],
                    tagName: 'DIV',
                  }],
                  tagName: 'DIV',
                }, {
                  attributes: {
                    class: 'testimonials__content',
                  },
                  childrens: [{
                    attributes: {
                      class: 'testimonials__user',
                    },
                    childrens: [{
                      tagName: 'text',
                      textValue: 'Astrid Jorgensen',
                    }],
                    tagName: 'SPAN',
                  }, {
                    attributes: {
                      class: 'testimonials__user-role',
                    },
                    childrens: [{
                      tagName: 'text',
                      textValue: 'CEO at Runway inc.',
                    }],
                    tagName: 'SPAN',
                  }, {
                    attributes: {
                      class: 'testimonials__text',
                    },
                    childrens: [{
                      tagName: 'text',
                      textValue: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis at, voluptatem similique tempora\n voluptate quia in ea minima earum consequatur',
                    }],
                    tagName: 'P',
                  }],
                  tagName: 'DIV',
                }],
                tagName: 'DIV',
              }, {
                attributes: {
                  class: 'testimonials',
                },
                childrens: [{
                  attributes: {
                    class: 'testimonials__avatar-img-wrapper',
                  },
                  childrens: [{
                    attributes: {
                      class: 'testimonials__avatar-img',
                    },
                    childrens: [],
                    tagName: 'DIV',
                  }],
                  tagName: 'DIV',
                }, {
                  attributes: {
                    class: 'testimonials__content',
                  },
                  childrens: [{
                    attributes: {
                      class: 'testimonials__user',
                    },
                    childrens: [{
                      tagName: 'text',
                      textValue: 'Dave Batista',
                    }],
                    tagName: 'SPAN',
                  }, {
                    attributes: {
                      class: 'testimonials__user-role',
                    },
                    childrens: [{
                      tagName: 'text',
                      textValue: 'HR at Runway inc.',
                    }],
                    tagName: 'SPAN',
                  }, {
                    attributes: {
                      class: 'testimonials__text',
                    },
                    childrens: [{
                      tagName: 'text',
                      textValue: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis at, voluptatem similique tempora\n voluptate quia in ea minima earum consequatur',
                    }],
                    tagName: 'P',
                  }],
                  tagName: 'DIV',
                }],
                tagName: 'DIV',
              }, {
                attributes: {
                  class: 'testimonials',
                },
                childrens: [{
                  attributes: {
                    class: 'testimonials__avatar-img-wrapper',
                  },
                  childrens: [{
                    attributes: {
                      class: 'testimonials__avatar-img',
                    },
                    childrens: [],
                    tagName: 'DIV',
                  }],
                  tagName: 'DIV',
                }, {
                  attributes: {
                    class: 'testimonials__content',
                  },
                  childrens: [{
                    attributes: {
                      class: 'testimonials__user',
                    },
                    childrens: [{
                      tagName: 'text',
                      textValue: 'Stevie T',
                    }],
                    tagName: 'SPAN',
                  }, {
                    attributes: {
                      class: 'testimonials__user-role',
                    },
                    childrens: [{
                      tagName: 'text',
                      textValue: 'COO at Runway inc.',
                    }],
                    tagName: 'SPAN',
                  }, {
                    attributes: {
                      class: 'testimonials__text',
                    },
                    childrens: [{
                      tagName: 'text',
                      textValue: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis at, voluptatem similique tempora\n voluptate quia in ea minima earum consequatur',
                    }],
                    tagName: 'P',
                  }],
                  tagName: 'DIV',
                }],
                tagName: 'DIV',
              }],
              tagName: 'DIV',
            }, {
              attributes: {
                class: 'testimonials__conntrolls markers',
              },
              childrens: [{
                attributes: {
                  class: 'testimonials__conntroll marker active',
                },
                childrens: [],
                tagName: 'SPAN',
              }, {
                attributes: {
                  class: 'testimonials__conntroll marker',
                },
                childrens: [],
                tagName: 'SPAN',
              }, {
                attributes: {
                  class: 'testimonials__conntroll marker',
                },
                childrens: [],
                tagName: 'SPAN',
              }],
              tagName: 'DIV',
            }],
            tagName: 'DIV',
          }, {
            attributes: {
              class: 'accordion-wrapper',
            },
            childrens: [{
              attributes: {
                class: 'accordion',
              },
              childrens: [{
                attributes: {
                  class: 'accordion__el',
                },
                childrens: [{
                  attributes: {
                    class: 'accordion__el-header accordion__el-header--ex',
                  },
                  childrens: [{
                    attributes: {
                      class: 'accordion__el-header-icon ti-angle-down',
                    },
                    childrens: [],
                    tagName: 'I',
                  }, {
                    tagName: 'text',
                    textValue: 'EXPANDED',
                  }],
                  tagName: 'DIV',
                }, {
                  attributes: {
                    class: 'bg-white',
                  },
                  childrens: [{
                    attributes: {
                      class: 'accordion__el-text',
                    },
                    childrens: [{
                      tagName: 'text',
                      textValue: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime perferendis voluptatum maiores\n quos\n sit unde labore sed ratione ut fugiat veniam, tempora, aliquam, tenetur in vero. Suscipit quod\n deleniti dolor. Ex quo reiciendis consectetur magnam sed neque aut pariatur, iusto harum impedit.\n Harum vitae asperiores expedita excepturi deserunt eos aspernatur omnis. In, repudiandae aliquam\n assumenda. Qui consequatur culpa, praesentium amet dolore dignissimos quam eum! Illum mollitia et\n maiores unde. Amet!',
                    }],
                    tagName: 'DIV',
                  }, {
                    attributes: {
                      class: 'accordion__el accordion__el--close',
                    },
                    childrens: [{
                      attributes: {
                        class: 'accordion__el-header',
                      },
                      childrens: [{
                        attributes: {
                          class: 'accordion__el-header-icon ti-angle-up',
                        },
                        childrens: [],
                        tagName: 'I',
                      }, {
                        tagName: 'text',
                        textValue: 'HOVER',
                      }],
                      tagName: 'DIV',
                    }, {
                      attributes: {
                        class: 'accordion__el-text',
                      },
                      childrens: [{
                        tagName: 'text',
                        textValue: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime perferendis voluptatum maiores\n quos\n sit unde labore sed ratione ut fugiat veniam, tempora, aliquam, tenetur in vero. Suscipit quod\n deleniti dolor. Ex quo reiciendis consectetur magnam sed neque aut pariatur, iusto harum impedit.\n Harum vitae asperiores expedita excepturi deserunt eos aspernatur omnis. In, repudiandae aliquam\n assumenda. Qui consequatur culpa, praesentium amet dolore dignissimos quam eum! Illum mollitia et\n maiores unde. Amet!',
                      }],
                      tagName: 'DIV',
                    }],
                    tagName: 'DIV',
                  }, {
                    attributes: {
                      class: 'accordion__el accordion__el--close',
                    },
                    childrens: [{
                      attributes: {
                        class: 'accordion__el-header accordion__el-header--inac',
                      },
                      childrens: [{
                        tagName: 'text',
                        textValue: 'INACTIVE',
                      }],
                      tagName: 'DIV',
                    }, {
                      attributes: {
                        class: 'accordion__el-text',
                      },
                      childrens: [{
                        tagName: 'text',
                        textValue: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime perferendis voluptatum maiores\n quos\n sit unde labore sed ratione ut fugiat veniam, tempora, aliquam, tenetur in vero. Suscipit quod\n deleniti dolor. Ex quo reiciendis consectetur magnam sed neque aut pariatur, iusto harum impedit.\n Harum vitae asperiores expedita excepturi deserunt eos aspernatur omnis. In, repudiandae aliquam\n assumenda. Qui consequatur culpa, praesentium amet dolore dignissimos quam eum! Illum mollitia et\n maiores unde. Amet!',
                      }],
                      tagName: 'DIV',
                    }],
                    tagName: 'DIV',
                  }],
                  tagName: 'DIV',
                }],
                tagName: 'DIV',
              }],
              tagName: 'DIV',
            }],
            tagName: 'DIV',
          }],
          tagName: 'DIV',
        }],
        tagName: 'DIV',
      }],
      tagName: 'SECTION',
    }],
    tagName: 'DIV',
  };
};

},{}],29:[function(require,module,exports){
const getMonth = require('../../helpers/monthSwitcher');
const dayParser = require('../../helpers/dayParser');

module.exports = (data) => {
  return {
    attributes: {
      class: 'row',
    },
    childrens: [{
      attributes: {
        class: 'article__date',
      },
      childrens: [{
        attributes: {
          class: 'article__date-year',
        },
        childrens: [{
          tagName: 'text',
          textValue: new Date(data.id).getFullYear(),
        }],
        tagName: 'DIV',
      }, {
        attributes: {
          class: 'article__date-month',
        },
        childrens: [{
          tagName: 'text',
          textValue: getMonth(new Date(data.id).getMonth()),
        }],
        tagName: 'DIV',
      }, {
        attributes: {
          class: 'article__date-day',
        },
        childrens: [{
          tagName: 'text',
          textValue: dayParser(new Date(data.id).getDate()),
        }],
        tagName: 'DIV',
      }],
      tagName: 'DIV',
    }, {
      attributes: {
        class: 'article__content',
      },
      childrens: [{
        attributes: {
          class: 'article__title',
        },
        childrens: [{
          tagName: 'text',
          textValue: data.title,
        }],
        tagName: 'H2',
      }, {
        attributes: {
          class: 'article__details',
        },
        childrens: [{
          attributes: {
            href: '#',
            class: 'article-preview__statistics-author ti-user',
          },
          childrens: [{
            tagName: 'text',
            textValue: data.author,
          }],
          tagName: 'A',
        }, {
          attributes: {
            href: '#',
            class: 'article-preview__statistics-comments ti-comment',
          },
          childrens: [{
            tagName: 'text',
            textValue: '3 comments',
          }],
          tagName: 'A',
        }],
        tagName: 'DIV',
      }, {
        attributes: {
          class: 'article__img',
        },
        childrens: [{
          attributes: {
            class: `article-preview__img-label article-preview__img-label--${data.category}`,
          },
          childrens: [],
          tagName: 'SPAN',
        }, {
          attributes: {
            class: 'article__img-el',
            src: data.img,
            alt: '',
            id: 'article-poster'
          },
          childrens: [],
          tagName: 'IMG',
        }],
        tagName: 'DIV',
      }, {
        attributes: {
          class: 'article__content-wrapper',
        },
        childrens: [{
          attributes: {
            class: 'article__text',
          },
          childrens: [{
            tagName: 'text',
            textValue: Array.isArray(data.text) ? data.text[0] : data.text,
          },
          {
            tagName: 'text',
            textValue: Array.isArray(data.text) ? data.text[1] : '',
          },
          {
            tagName: 'text',
            textValue: Array.isArray(data.text) ? data.text[2] : '',
          }],
          tagName: 'P',
        }, {
          attributes: {
            class: 'blockquote',
            style: data.blockquote ? '' : 'display: none',
          },
          childrens: [{
            tagName: 'text',
            textValue: data.blockquote,
          }],
          tagName: 'BLOCKQUOTE',
        }, {
          attributes: {
            class: 'article__text',
          },
          childrens: [{
            tagName: 'text',
            textValue: Array.isArray(data.text) ? data.text[2] : '',
          }],
          tagName: 'P',
        }],
        tagName: 'DIV',
      }],
      tagName: 'DIV',
    }],
    tagName: 'DIV',
  };
};

},{"../../helpers/dayParser":10,"../../helpers/monthSwitcher":12}],30:[function(require,module,exports){
module.exports = (data) => {
  return {
    attributes: {
      class: 'categories',
    },
    childrens: [{
      attributes: {
        class: 'categories__title',
      },
      childrens: [{
        tagName: 'text',
        textValue: 'Categories',
      }],
      tagName: 'H2',
    }, {
      attributes: {
        class: 'categories__list',
      },
      childrens: data.categories.map((el) => {
        return {
          attributes: {
            class: 'categories__list-item',
          },
          childrens: [{
            attributes: {
              class: 'categories__list-item-title',
            },
            childrens: [{
              tagName: 'text',
              textValue: `${el.title}`,
            }],
            tagName: 'SPAN',
          }, {
            attributes: {
              class: 'categories__list-item-amount',
            },
            childrens: [{
              tagName: 'text',
              textValue: `(${el.count})`,
            }],
            tagName: 'SPAN',
          }],
          tagName: 'LI',
        };
      }),
      tagName: 'UL',
    }],
    tagName: 'SECTION',
  };
};

},{}],31:[function(require,module,exports){
module.exports = (data) => {
  return {
    attributes: {
      class: `comment row ${data.reply ? 'comment--reply' : ''}`,
    },
    childrens: [{
      attributes: {
        class: 'comment__author-avatar',
      },
      childrens: [{
        attributes: {
          class: 'comment__author-avatar-img',
        },
        childrens: [{
          attributes: {
            class: 'comment__author-avatar-img-el',
            src: data.avatar,
            alt: 'User',
          },
          childrens: [],
          tagName: 'IMG',
        }],
        tagName: 'DIV',
      }],
      tagName: 'DIV',
    }, {
      attributes: {
        class: 'comment__content',
      },
      childrens: [{
        attributes: {
          class: 'comment__author',
        },
        childrens: [{
          tagName: 'text',
          textValue: data.user,
        }],
        tagName: 'H4',
      }, {
        attributes: {
          class: 'comment__text',
        },
        childrens: [{
          tagName: 'text',
          textValue: data.comment,
        }],
        tagName: 'P',
      }, {
        attributes: {},
        childrens: [{
          attributes: {
            class: 'comment__reply-btn',
          },
          childrens: [{
            tagName: 'text',
            textValue: 'Reply',
          }],
          tagName: 'BUTTON',
        }],
        tagName: 'DIV',
      }],
      tagName: 'DIV',
    }],
    tagName: 'DIV',
  };
};

},{}],32:[function(require,module,exports){
module.exports = () => {
  return {
    attributes: {
      class: 'reply-form row',
    },
    childrens: [{
      attributes: {
        class: 'reply-form__col',
      },
      childrens: [{
        attributes: {
          class: 'reply-form__input input',
          type: 'text',
          name: 'name',
          placeholder: 'Name',
        },
        childrens: [],
        tagName: 'INPUT',
      }, {
        attributes: {
          class: 'reply-form__input input',
          type: 'text',
          name: 'email',
          placeholder: 'Email',
        },
        childrens: [],
        tagName: 'INPUT',
      }],
      tagName: 'DIV',
    }, {
      attributes: {
        class: 'reply-form__col',
      },
      childrens: [{
        attributes: {
          class: 'reply-form__input input input--textarea',
          name: 'text',
          placeholder: 'Message',
        },
        childrens: [],
        tagName: 'TEXTAREA',
      }],
      tagName: 'DIV',
    }],
    tagName: 'FORM',
  };
};

},{}],33:[function(require,module,exports){
module.exports = (data) => {
  return {
    attributes: {
      class: 'related-posts',
    },
    childrens: [{
      attributes: {
        class: 'related-posts__title',
      },
      childrens: [{
        tagName: 'text',
        textValue: 'Related posts',
      }],
      tagName: 'H2',
    }, {
      attributes: {
        class: 'related-posts__carousel',
      },
      childrens: [{
        attributes: {},
        childrens: data.related.map((post) => {
          return {
            attributes: {
              class: 'related-posts__item',
            },
            childrens: [{
              attributes: {
                class: 'related-post__img',
                src: post.img,
                alt: 'Another Post',
              },
              childrens: [],
              tagName: 'IMG',
            }, {
              attributes: {
                class: 'related-posts__item-title',
              },
              childrens: [{
                tagName: 'text',
                textValue: post.title,
              }],
              tagName: 'H3',
            }, {
              attributes: {
                class: 'related-posts__item-actions',
              },
              childrens: [{
                attributes: {
                  class: 'related-posts__item-action-link ti-link',
                  href: '#',
                },
                childrens: [],
                tagName: 'A',
              }, {
                attributes: {
                  class: 'related-posts__item-action-link ti-comments',
                  href: '#',
                },
                childrens: [],
                tagName: 'A',
              }, {
                attributes: {
                  class: 'related-posts__item-action-link ti-email',
                  href: '#',
                },
                childrens: [],
                tagName: 'A',
              }],
              tagName: 'DIV',
            }],
            tagName: 'DIV',
          };
        }),
        tagName: 'DIV',
      }, {
        attributes: {},
        childrens: [{
          attributes: {
            class: 'related-posts__btn related-posts__btn--prev ti-angle-left',
          },
          childrens: [],
          tagName: 'BOTTON',
        }, {
          attributes: {
            class: 'related-posts__btn related-posts__btn--next ti-angle-right',
          },
          childrens: [],
          tagName: 'BOTTON',
        }],
        tagName: 'DIV',
      }],
      tagName: 'DIV',
    }],
    tagName: 'SECTION',
  };
};

},{}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
module.exports = (data) => {
  return {
    attributes: {
      class: 'tags',
    },
    childrens: [{
      attributes: {
        class: 'tags__title',
      },
      childrens: [{
        tagName: 'text',
        textValue: 'Tags',
      }],
      tagName: 'H2',
    }, {
      attributes: {
        class: 'tags__wrapper',
      },
      childrens: data.tags.map((tag) => {
        return {
          tagName: 'A',
          attributes: {
            href: '#',
            class: 'tags__item',
          },
          childrens: [{
            tagName: 'text',
            textValue: `${tag}`,
          }],
        };
      }),
      tagName: 'DIV',
    }],
    tagName: 'SECTION',
  };
};

},{}],36:[function(require,module,exports){
module.exports = (data) => {
  return {
    attributes: {
      class: 'twitter-feed',
    },
    childrens: [{
      attributes: {
        class: 'twitter-feed__title',
      },
      childrens: [{
        tagName: 'text',
        textValue: 'Twitter Feed',
      }],
      tagName: 'H2',
    }, {
      attributes: {},
      childrens: data.twitts.map((twitt) => {
        return {
          attributes: {
            class: 'twit',
          },
          childrens: [{
            attributes: {
              class: 'twit__icon',
            },
            childrens: [{
              attributes: {
                class: 'ti-twitter-alt',
              },
              childrens: [],
              tagName: 'SPAN',
            }],
            tagName: 'DIV',
          }, {
            attributes: {
              class: 'twit__author',
            },
            childrens: [{
              attributes: {
                href: '#',
              },
              childrens: [{
                tagName: 'text',
                textValue: twitt.author,
              }],
              tagName: 'A',
            }],
            tagName: 'H3',
          }, {
            attributes: {
              class: 'twit__text',
            },
            childrens: [{
              tagName: 'text',
              textValue: twitt.text,
            }, {
              attributes: {
                class: 'twit__hash',
              },
              childrens: twitt.hashs.map( (hesh) => {
                return {
                  attributes: {
                    href: '#',
                  },
                  childrens: [{
                    tagName: 'text',
                    textValue: `#${hesh}`,
                  }],
                  tagName: 'A',
                };
              }),
              tagName: 'SPAN',
            }],
            tagName: 'P',
          }, {
            attributes: {
              class: 'twit__date',
            },
            childrens: [{
              attributes: {
                href: '#',
              },
              childrens: [{
                tagName: 'text',
                textValue: twitt.date,
              }],
              tagName: 'A',
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

},{}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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
      }],
      tagName: 'DIV',
    }],
    tagName: 'DIV',
  };
};

},{}]},{},[13])

//# sourceMappingURL=bundle.js.map
