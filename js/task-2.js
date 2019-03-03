function getSum(numb1, numb2) {
  const resultArr = [];
  resultArr.length = 1 + Math.max(numb1.length, numb2.length);

  let N1MoreN2 = 0;
  let N2MoreN2 = 0;

  if (numb1.length > numb2.length) {
    N1MoreN2 = numb1.length - numb2.length;
  } else if (numb1.length < numb2.length) {
    N2MoreN2 = numb2.length - numb1.length;
  }

  let delta = 0;
  for (let i = resultArr.length; i >= 0; i--) {
    const operand1 = +numb1[i - 1 - N2MoreN2] || 0;
    const operand2 = +numb2[i - 1 - N1MoreN2] || 0;

    sum = operand1 + operand2 + delta;

    if (sum > 9) {
      delta = 1;
      sum = sum - 10;
    } else {
      delta = 0;
    }

    if (sum === 0 && delta === 0) {
      continue;
    } else resultArr[i] = sum;
  }

  return resultArr.join('');
}

getSum('123', '123321321');
