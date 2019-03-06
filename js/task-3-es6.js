const sum = {
  meth (...arr) {
    let result = arr.reduce((sum, curent) => {
      return sum + curent;
    });
    return result;
  }
}

const mul = {
  meth (...arr) {
    let result = arr.reduce((sum, curent) => {
      return sum * curent;
    });
    return result;
  }
}

function applayAll(context, ...rest) {
  return context.meth.apply(context, rest);
}

applayAll(sum, 1, 2, 3);
applayAll(mul, 1, 2, 3, 4);