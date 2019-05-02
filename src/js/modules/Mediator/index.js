const jqPopup = $().jqPopup;

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
        console.log(storage);
      })
      .catch((err) => {
        console.error(err);
      });
  ;
};
