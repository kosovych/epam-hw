const jqPopup = $().jqPopup;

const mediator = {
  authors: [],
  storage: null,

  isClickedOnAuthor(event) {
    const eventTarget = event.target;
    let selectedAutors = [];
    selectedAutors = this.authors.filter( (author) => {
      // eslint-disable-next-line max-len
      return author.$template[0].children[0].innerText === eventTarget.innerText;
    });

    if (selectedAutors.length > 0) {
      event.stopPropagation();
      console.log(selectedAutors);
      this.authors.map( (author) => {
        author.hideArticles();
      });
      selectedAutors.map( (author) => {
        author.showArticles();
      });
      return;
    }
    return;
  },

  isClickedOnPost(event) {
    console.log(isClickedOnPost);
  },

  init() {
    document.body.addEventListener('click', this.isClickedOnAuthor.bind(this));
    document.body.addEventListener('click', this.isClickedOnPost.bind(this));
  },
};

class Storage {
  constructor(data) {
    this.store = data;
  }

  getPostsByAuthor(author) {
    return this.store.filter( (post) => {
      return post.author === author;
    });
  }

  getAllAuthors() {
    return this.store.reduce( (authors, post) => {
      if (!authors.includes(post.author)) {
        authors.push(post.author);
      }
      return authors;
    }, []);
  }

  getPostById(id) {
    id = +id;
    return this.store.find( (post) => {
      return post.id === id;
    });
  }
}

class Author {
  constructor($template, author) {
    this.$template = $template;
    this.name = author;
    this.posts = renderAuthorsPosts(storage.getPostsByAuthor(this.name));

    $template.append(this.posts);
    this.posts.hide();
  }

  showArticles() {
    this.posts.show(450);
  }

  hideArticles() {
    this.posts.hide(450);
  }
}

let storage;

module.exports = () => {
  fetch('http://localhost:3000/api/list', {method: 'Get'})
      .then( (res) => {
        if (!res.ok) {
          jqPopup(null, null, 'error', 'none', 'none', 'Oops, Server Error');
          throw new Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then( (data) => {
        storage = new Storage(data);
        mediator.storage = storage;
        storage.getAllAuthors().map( (author) => {
          mediator.authors
              .push(new Author(renderAuthors('author-tabs', author), author));
          mediator.authors
              .push(new Author(renderAuthors('filter-aside', author), author));
        });
        mediator.init();
        console.log(storage);
        console.log(mediator);
      })
      .catch((err) => {
        console.error(err);
      });
  ;
};

function renderAuthors($parent, authorName) {
  return $('<div/>', {'class': `${$parent}__el-wrapper`})
      .append($('<button/>', {'class': `${$parent}__el`}).text(authorName))
      .appendTo(`#${$parent}`);
};

function renderAuthorsPosts(posts) {
  const postsUl = $('<ul/>', {'class': 'posts-list'});
  posts.map( (post) => {
    // eslint-disable-next-line max-len
    $('<li/>', {'class': 'posts-list__el', 'text': post.title, 'data-id': post.id})
        .appendTo(postsUl);
  });

  return postsUl;
};
