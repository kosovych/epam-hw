function getCookingTime(eggsAmount) {
  let result;
  eggsAmountFloat = validateNumb(eggsAmount);
  const capacity = 5;
  const time = 5;

  const delta = eggsAmountFloat % capacity === 0 ?
    0
    :
    1;

  result = (parseInt(eggsAmountFloat / capacity)) * time + delta * time;


  return result;
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

getCookingTime('12');
