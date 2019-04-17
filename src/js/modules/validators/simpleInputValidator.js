module.exports = (bool, input) => {
  if (bool) {
    input.style.outline = '1px solid green';
    return true;
  }

  input.style.outline = '1px solid red';
  return false;
};
