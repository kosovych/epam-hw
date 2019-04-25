export function fooBuzz(num) {
  if (num % 15 == 0) {
    return 'FooBuzz';
  }

  if (num % 3 == 0) {
    return 'Foo';
  }

  if (num % 5 == 0) {
    return 'Buzz';
  }

  return num;
};
