// export function fooBuzz(num) {
//   if (num % 15 == 0) {
//     return 'FooBuzz';
//   }

//   if (num % 3 == 0) {
//     return 'Foo';
//   }

//   if (num % 5 == 0) {
//     return 'Buzz';
//   }

//   return num;
// };

// --------------------------------

// export function fun(n1, n2) {
//   let result;

//   if (n1 > n2) {
//     result = 25;
//   } else {
//     result = 0;
//   }
//   return result;
// };

// --------------------------------

export function fun(n1, n2, n3) {
  let result;

  if (n1 > n2) {
    result = 25;
  } else if (n2 > n3 ) {
    result = 0;
  } else {
    result = 100
  }
  return result;
};