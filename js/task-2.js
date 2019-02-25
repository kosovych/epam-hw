function sum(_arg1, _arg2) {
  const args = [...arguments];
  let arg1Str;
  let arg2Num;

  if (!args.every(validateAgr) || typeof _arg1 === typeof _arg2) {
    throw new Error('Incorrect input data');
  }

  if (typeof _arg1 === 'string') {
    arg1Str= _arg1;
    arg2Num = _arg2;
  } else {
    arg1Str= _arg2;
    arg2Num = _arg1;
  }

  if ( arg2Num % 15 === 0) {
    arg2Num *= -1;
  }

  return +arg1Str + +arg2Num;
}


function validateAgr(arg) {
  if (typeof arg === 'number' || typeof arg === 'string') {
    return true;
  }
  return false;
}

console.log(sum('25', 15));
console.log(sum(41, '3'));
console.log(sum('3', 45));
console.log(sum('15', 15));
