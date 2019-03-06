function getPow (x, n) {
  return n !== 1 ?
  x * getPow(x, n - 1)
  :
  x
}

let cachedFunction = cache(getPow);

function cache(func) {
  const cacheObj = {};

  return function (...rest) {
    let argId = rest.join('');
    if( cacheObj[argId] ) {
      return cacheObj[`${argId}_result`]
    } else {
      let result = func(...rest);
      cacheObj[argId] = argId; 
      cacheObj[`${argId}_result`] = result;
      return result;
    }
  }
}

cachedFunction(1, 2);
cachedFunction(2, 2);
cachedFunction(1, 2);
cachedFunction(3, 3);
cachedFunction(1, 2);
cachedFunction(3, 3);
