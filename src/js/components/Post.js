class Post {
  constructor($article, src) {
    this.article = $article;
    this.poster =  $article.querySelector('#article-poster');
    this.src = src;
  }
}

module.exports = Post;