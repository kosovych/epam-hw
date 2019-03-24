module.exports = (numb) => {
  return `${numb}`.length >= 2 ?
  `${numb}`
  :
  `0${numb}`;
};
