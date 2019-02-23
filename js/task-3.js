function checkNumber(numb) {
  const _numb = parseFloat(numb);

  if (isNaN(_numb) ) {
    throw new Error('It must be a number');
  }
  return [isSimple(_numb), isEven(_numb), isMultipleofTen(_numb)];
}

function isSimple(numb) {
  if (numb <= 1) {
    return false;
  }

  if ((Math.ceil(numb) - Math.floor(numb) === 1)) {
    return false;
  }

  if (numb < 4) {
    return true;
  }

  if ((numb % 2 === 0) && (numb !== 2)) {
    return false;
  }

  for (let i = 3; i < numb; i++) {
    if (numb % i === 0) {
      return false;
    } else return true;
  }
}

function isEven(numb) {
  if (numb%2 === 0) {
    return true;
  } else return false;
}

function isMultipleofTen(numb) {
  if (numb % 10 === 0) {
    return true;
  } else return false;
}

checkNumber(7);
checkNumber(-10);
