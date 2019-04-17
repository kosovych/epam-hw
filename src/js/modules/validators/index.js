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
