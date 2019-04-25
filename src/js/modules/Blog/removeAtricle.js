module.exports = function(event, popup) {
  // eslint-disable-next-line prefer-const
  const $eventTarget = $(event.target);
  const articleId = $eventTarget.parent()
      .find('.article-preview__link')
      .prop('hash')
      .slice(1);

  fetch(`http://localhost:3000/api/list/${articleId}`, {method: 'DELETE'})
      .then( (res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Article you want to delete is not exist');
        }
      })
      .then( (data) => {
        const post =$eventTarget.parent().parent().parent();
        post.slideUp(300, () => post.remove());
        popup.closePopup();
      })
      .catch( (err) => {
        $().jqPopup(
            null,
            null,
            'error',
            'none',
            'dark',
            'Article you want to delete is not exist'
        );
      });
};
