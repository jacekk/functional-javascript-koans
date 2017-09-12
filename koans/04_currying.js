describe("Currying", () => {
  describe("Implement curry function", () => {
    /********************* YOUR IMPLEMENTATION *********************/

    // curry :: (* → a) → (* → a)
    const curry = function (fn) {
      return function curried(...outer) {
        if (outer.length >= fn.length) {
          return fn(...outer);
        }
        return (...inner) => curried(...outer, ...inner);
      };
    };

    /***************************************************************/

    test("curried function returns a function after applying a first argument", () => {
      const sum = (a, b) => a + b;
      const curriedSum = curry(sum);
      expect(typeof curriedSum(sum)).toEqual("function");
    });

    test("curried function returns correct result after applying all arguments", () => {
      const sum = (a, b) => a + b;
      const curriedSum = curry(sum);
      expect(curriedSum(2)(3)).toEqual(5);
    });

    // BONUS:
    //
    // HINT: Function.prototype.length specifies function arity
    //
    // test("curried function's arguments can be applied within a first call", () => {
    //   const sum = (a, b) => a + b;
    //   const curriedSum = curry(sum);
    //   expect(curriedSum(2, 3)).toEqual(5);
    // });
  });
});
