function getNumber(array) {
  let result;

  let sordetArray = array.sort((el) => {
    if (el % 2 === 0) {
      return -1;
    } else {
      return 1;
    }
  });

  if (sordetArray[0] % 2 === 0 && sordetArray[1] % 2 === 0) {
    result = sordetArray[(sordetArray.length - 1)];
  } else {
    result = sordetArray[0];
  }

  return result;
}

getNumber([1, 5, 7, 9, 15, 19, 777, -15, -11, 4, 9, 23, -17]);

getNumber([0, 2, 8, -4, 0, -122, 13, -4, 28, 12]);
