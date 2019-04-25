const jsPopup = require('../../lib/jqPopup');
jsPopup($);

module.exports = () => {
  $('#rm-article-btn').on('click', getRmApprove);
};

function getRmApprove(event) {
  const popup = $().jqPopup(
      event.target,
      () => removeAllAtricle(event, popup),
      'info',
      'promt',
      'dark',
      'Are you sure you want to delete ALL posts?'
  );
};

function removeAllAtricle(event, popup) {
  fetch('http://localhost:3000/api/list', {method: 'DELETE'})
      .then( (res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Oops something went wrong');
        }
      })
      .then( (data) => {
        popup.closePopup();
        $('.article-preview')
            .slideUp(600, () => $('.article-preview').remove());

        $().jqPopup(
            null,
            null,
            'error',
            'none',
            'dark',
            'All Articles was deleted!'
        );
      });
};
