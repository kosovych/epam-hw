// import { fooBuzz } from './test';

// describe('fooBuz', function() {
//   it('return FooBuzz if div by 3 and 5', function() {
//     expect(fooBuzz(15)).toBe('FooBuzz');
//     expect(fooBuzz(30)).toBe('FooBuzz');
//     expect(fooBuzz(300)).toBe('FooBuzz');
//   });

//   it('return Foo if div by 3', function() {
//     expect(fooBuzz(3)).toBe('Foo');
//     expect(fooBuzz(6)).toBe('Foo');
//     expect(fooBuzz(9)).toBe('Foo');
//   });

//   it('return Buzz if div by 5', function() {
//     expect(fooBuzz(20)).toBe('Buzz');
//     expect(fooBuzz(5)).toBe('Buzz');
//     expect(fooBuzz(10)).toBe('Buzz');
//   });

//   it('return it self if not div by 3 or 5', function() {
//     expect(fooBuzz(2)).toBe(2);
//     expect(fooBuzz(4)).toBe(4);
//     expect(fooBuzz(8)).toBe(8);
//   });
// });

// --------------------------------

// import {
//   fun,
// } from './test';

// describe('fun', function() {
//   it('shoud be 1', function() {
//     expect(fun()).toBe(1);
//   });
// });

// --------------------------------

// import {fun} from './test';

// describe('fun', function() {
//   let n1 = 25;
//   let n2 = 12;

//   beforeEach(function() {
//     n1 = 25;
//     n2 = 12;
//   });

//   it('should return 25 if n1 > n2', function() {
//     expect(fun(n1, n2)).toBe(25);
//   });

//   it('should not return 0 if n1 > n2', function() {
//     expect(fun(n1, n2)).not.toBe(0);
//   });

//   it('should return 0 if n1 < n2', function() {
//     n1 = 12;
//     n2 = 25;
//     expect(fun(n1, n2)).toBe(0);
//   });

//   it('should not return 25 if n1 < n2', function() {
//     n1 = 12;
//     n2 = 25;
//     console.log(n1, n2);
//     expect(fun(n1, n2)).not.toBe(25);
//   });

//   it('should return 0 if n1 === n2', function() {
//     n1 = 25;
//     n2 = 25;
//     expect(fun(n1, n2)).toBe(0);
//   });

//   it('should not return 25 if n1 === n2', function() {
//     n1 = 25;
//     n2 = 25;
//     expect(fun(n1, n2)).not.toBe(25);
//   });
// });


// import {fun} from './test';

// describe('fun shoud return 25', function() {
//   let n1, n2, n3;
//   beforeEach(function() {
//     n1 = 9;
//     n2 = 3;
//   });
  
//   it('should return 25 if n1 > n2', function() {

//   })
// })

import ToDo from './test';

describe('ToDo', function() {
  let todo;
  let item1;
  let item2;

  beforeEach( function() {
    todo = new ToDo();

    item1 = {
      id: "1",
      title: "title 1",
      complete: false
    };

    item2 = {
      id: "2",
      title: "title 2",
      complete: false
    };
  });

  it('shoud add item', () => {
    let todo = new ToDo();
    let item1 = {
      id: "1",
      title: "title 1",
      complete: false
    };

    const done = todo.addTodo(item1);
    expect(todo.getItems().length).toBe(1)
  });

  it('shoud rm item', () => {
    todo.addTodo(item1);
    todo.addTodo(item2);

    todo.delete(2);
    expect(todo.getItems()[todo.getItems().length - 1].id).toBe(1);
  });

  it('shoud mark complete', () => {
    todo.addTodo(item1);
    todo.addTodo(item2);
    todo.complete(2);

    expect(todo.getItems().find( item => item.id === 2 ).complete).toBe(true)
  })
})