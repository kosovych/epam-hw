function countCharacters(string) {
  let result = {};
  if (typeof string !== 'string') {
    throw new Error('Incorrect data input');
  }

  let arrOfChar = string.split('');

  arrOfChar.filter((sumb) => (
    sumb.toLocaleLowerCase().charCodeAt() >= 97
     && sumb.toLocaleLowerCase().charCodeAt() <= 122))
      .forEach((currentSunm) => {
        if (!result[currentSunm]) {
          result[currentSunm] = 1;
        } else {
          result[currentSunm] = result[currentSunm] + 1;
        }
      });

  return result;
}

countCharacters('qewrty wert wt');
