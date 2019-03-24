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
