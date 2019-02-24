function findTitle(arr, str) {
  let result = [];

  arr.forEach( (obj) => {
    if ( obj.title && obj.title.toLocaleLowerCase().split(str).length > 1) {
      result.push(obj);
    }
  });
  return result;
}

let arr = [{
  title: 'Some title1',
}, {
  title: 'I like JS',
}, {
  user: 'This obj doesn\’t have key title js',
}, {
  title: 'Js - is the best!',
}];

findTitle(arr, 'js');
console.log(arr);
