module.exports = (numb) => {
  let month;
  switch (numb) {
    case 0:
      month = 'Jan'.toUpperCase();
      break;

    case 1:
      month = 'Feb'.toUpperCase();
      break;

    case 2:
      month = 'Mar'.toUpperCase();
      break;

    case 3:
      month = 'Apr'.toUpperCase();
      break;

    case 4:
      month = 'May'.toUpperCase();
      break;

    case 5:
      month = 'Jun'.toUpperCase();
      break;

    case 6:
      month = 'Jul'.toUpperCase();
      break;

    case 7:
      month = 'Aug'.toUpperCase();
      break;

    case 8:
      month = 'Sept'.toUpperCase();
      break;

    case 9:
      month = 'Oct'.toUpperCase();
      break;

    case 10:
      month = 'Nov'.toUpperCase();
      break;

    case 11:
      month = 'Dec'.toUpperCase();
      break;

    default:
      break;
  }
  return month;
};
