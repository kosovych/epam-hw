function getNextPalindrome(number) {
  let result;

  result = validateNumb(number) + 1;

  if (result <= 11) {
    console.log(11);
    return 11;
  }

  while (reverseStr(result) !== `${result}`) {
    if (`${result}`.length < 2) {
      continue;
    }
    result++;
  }


  console.log(result);
  return result;
}

getNextPalindrome('325458212554785');

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

function reverseStr(number) {
  return `${number}`.split('').reverse().join('');
}
