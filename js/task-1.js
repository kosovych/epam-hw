const cashbox = {
  25: 0,
  50: 0,
  100: 0,
  bills: [100, 50, 25],
  ticketCost: 25,
  cash: 0,
  addMany(bill) {
    this[bill] += 1;
    this.cash += bill;
  },
  takeManey(bill, amount) {
    this[bill] -= amount;
    this.cash -= bill * amount;
  },
};

tickets([25, 25, 50]);
// console.log(tickets([25, 25, 50]));
// console.log(tickets([25, 100]));
// console.log(tickets([25, 25, 50, 100]));
// console.log(tickets([25, 50, 100]));
// console.log(tickets(['25', '25', '50', '100']));
// console.log(tickets(['25', '50', '100']));

function tickets(person) {
  person = arguments.length > 1 ?
    validatePerson(...arguments) :
    validatePerson(person);

  for (let index = 0; index < person.length; index++) {
    if (calcChange(person[index]) === false) {
      return `No. Can\'t give a chenge for ${person[index]}`;
    }
  }
  return `Yes! Can give a chenge`;
}

function calcChange(bill) {
  let manyForChange = bill - cashbox.ticketCost;
  const changeObj = {};
  cashbox.bills.map((bill) => changeObj[bill] = 0);

  if (cashbox.cash === 0 && manyForChange > 0) {
    return false;
  }

  if (manyForChange === 0) {
    cashbox.addMany(bill);
    return true;
  }

  for (let i = 0; i < cashbox.bills.length; i++) {
    const billAmount = Math.floor(manyForChange / cashbox.bills[i]);

    if (billAmount <= cashbox[cashbox.bills[i]] && billAmount > 0) {
      changeObj[cashbox.bills[i]] += billAmount;
      manyForChange = manyForChange - billAmount * cashbox.bills[i];
    } else {
      continue;
    }
  }

  const cashInChange = Object.values(changeObj)
      .reduce((cash, bill) => cash + bill);

  if (cashInChange < manyForChange) {
    return false;
  }
  return giveChange(changeObj, bill);
}

function giveChange(changeObj, bill) {
  if (Object.values(changeObj).every((value) => value === 0)) {
    return false;
  }

  cashbox.bills.map((bill) => {
    cashbox.takeManey(bill, changeObj[bill]);
  });

  cashbox.addMany(bill);
  return true;
}


// Validation

function validatePerson(person) {
  if (arguments.length > 1) {
    person = Array.from(arguments);
  }

  if (isValidNumber(person)) {
    person = +person;
    return [person];
  }

  if (isValidArrOfNumbers(person)) {
    return person.map((el) => +el);
  }
  throw new Error('Incorrect data input');
}

function isValidArrOfNumbers(arr) {
  if (Array.isArray(arr) && arr.every(isValidNumber)) {
    return true;
  } else {
    return false;
  }
}

function isValidNumber(num) {
  if ((typeof num === 'number' || !isNaN(num)) && num % 25 === 0) {
    return true;
  } else {
    return false;
  }
}
