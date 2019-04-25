import { fooBuzz } from './test';

describe('fooBuz', function() {
  it('return FooBuzz if div by 3 and 5', function() {
    expect(fooBuzz(15)).toBe('FooBuzz');
    expect(fooBuzz(30)).toBe('FooBuzz');
    expect(fooBuzz(300)).toBe('FooBuzz');
  });

  it('return Foo if div by 3', function() {
    expect(fooBuzz(3)).toBe('Foo');
    expect(fooBuzz(6)).toBe('Foo');
    expect(fooBuzz(9)).toBe('Foo');
  });

  it('return Buzz if div by 5', function() {
    expect(fooBuzz(20)).toBe('Buzz');
    expect(fooBuzz(5)).toBe('Buzz');
    expect(fooBuzz(10)).toBe('Buzz');
  });

  it('return it self if not div by 3 or 5', function() {
    expect(fooBuzz(2)).toBe(2);
    expect(fooBuzz(4)).toBe(4);
    expect(fooBuzz(8)).toBe(8);
  });
});
