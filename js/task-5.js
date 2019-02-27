function getNextPalindrome(number) {
  let result;
  number = validateNumb(number);
  let strFromNumb = `${number}`;
  let arrFromNumb;

  if (number < 11) {
    result = 11;
    return result;
  }

  if (number < 99) {
    result = Array(2).fill(+strFromNumb[0] + 1).join('');
    return +result;
  }

  if (isPolindrom(number)) {
    number = number + 1;
    strFromNumb = `${number}`;
  }

  if (`${number + 1}`.length > strFromNumb.length) {
    result = number + 2;
    return result;
  }

  if (strFromNumb.length % 2 !== 0) {
    arrFromNumb = strFromNumb.split('');
    return getPolindromFromOdd(arrFromNumb);
  }

  if (strFromNumb.length % 2 === 0) {
    arrFromNumb = strFromNumb.split('');
    return getPolindromFromEven(arrFromNumb);
  }
}


function validateNumb(numb) {
  const numbFloat = parseFloat(numb);

  if (typeof numbFloat !== 'number' ||
    isNaN(numbFloat)) {
    throw new Error('Incorect data input: argument nust be a number');
  }

  if (numbFloat - parseInt(numb) > 0) {
    throw new Error('Incorect data input: argument must be a integer');
  }

  if (numbFloat < 0) {
    throw new Error('Incorect data input: argument must be more than 0');
  }

  return numbFloat;
}


function getPolindromFromOdd(arr) {
  console.log(arr);
  let result;
  let firstArr = arr.slice(0, (arr.length - 1) / 2);
  let secondArr = arr.slice((arr.length + 1) / 2, arr.length);
  let middleNumb = arr[(arr.length - 1) / 2];

  if (+middleNumb + 1 === 10) {
    firstArr[firstArr.length - 1] = +firstArr[firstArr.length - 1] + 1;
    middleNumb = -1;
  }

  if (+firstArr.join('') < +secondArr.join('')) {
    middleNumb = 0;
    result = Array(arr.length).fill(+arr[0] + 1).join('');
    return +result;
  }

  if (+firstArr.join('') > +secondArr.join('')) {
    result = [...firstArr, +middleNumb + 1, ...firstArr.reverse()];
    return +result.join('');
  }

  if (+firstArr.join('') === +secondArr.join('')) {
    if (+middleNumb === 9) {
      result = Array(arr.length).fill(+arr[0] + 1).join('');
      return +result;
    }
    middleNumb++;
    result = [...firstArr, middleNumb, ...secondArr];
    return +result.join('');
  }
}


function getPolindromFromEven(arr) {
  let result;
  let firstArr = arr.slice(0, arr.length / 2);
  let secondArr = arr.slice(arr.length / 2, arr.length);

  if (+firstArr.join('') < +secondArr.join('')
  && +firstArr[firstArr.length - 1] < 9) {
    firstArr[firstArr.length - 1] = +firstArr[firstArr.length - 1] + 1;
    result = [...firstArr, ...firstArr.reverse()];
    console.log(result.join(''));
    return +result.join('');
  } else if (+firstArr.join('') < +secondArr.join('')) {
    result = [+firstArr[0] + 1,
      ...Array(arr.length - 2).fill(0).join(''),
      +firstArr[0] + 1];
    return +result.join('');
  }

  if (+firstArr.join('') > +secondArr.join('')) {
    let _firstArr = firstArr.map( (el) => el );
    _firstArr[_firstArr.length - 1] = +_firstArr[_firstArr.length - 1] + 1;
    result = [..._firstArr, ..._firstArr.reverse()];
    console.log(result);
    return +result.join('');
  }

  if (+firstArr.join('') === +secondArr.join('')) {
    result = Array(arr.length).fill(+arr[0] + 1).join('');
    return +result;
  }
}

function isPolindrom(number) {
  let arr = `${number}`.split('');
  if ( arr.join('') === arr.reverse().join('') ) {
    return true;
  } else return false;
}

console.log(getNextPalindrome(321123));
