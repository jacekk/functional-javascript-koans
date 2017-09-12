describe("Partial application", () => {
  describe("Implement partially applied sum(a, b) function", () => {
    /********************* YOUR IMPLEMENTATION *********************/

    // sum :: Number → Number → Number
    const sum = (...args) => {
      if (args.length === 2) {
        return args[0] + args[1];
      }
      return b => args[0] + b;
    };

    // OR

    const sum2 = (a, b) => {
      if (b) {
        return a + b;
      }

      return b => a + b;
    };

    /***************************************************************/

    test("sum returns a function after applying a first argument", () => {
      expect(typeof sum(2)).toEqual("function");
      expect(typeof sum2(2)).toEqual("function");
    });

    test("returns correct result", () => {
      expect(sum(2)(1)).toEqual(3);
      expect(sum2(2)(1)).toEqual(3);
    });

    test("both arguments can be applied within a first call", () => {
      expect(sum(2, 3)).toEqual(5);
      expect(sum2(2, 3)).toEqual(5);
    });
  });

  describe("Implement partially applied map(fn, list) function", () => {
    /********************* YOUR IMPLEMENTATION *********************/

    // map :: (a → b) → [a] → [b]
    const map = (predicate, list) => {
      return list ?
        list.map(predicate) :
        delayedList => delayedList.map(predicate);
    };

    /***************************************************************/

    test("sum returns a function after applying a first argument", () => {
      expect(typeof map(x => x * x)).toEqual("function");
    });

    test("returns correct result", () => {
      expect(map(x => x * x)([1, 2, 3, 4])).toEqual([1, 4, 9, 16]);
    });

    test("both arguments can be applied within a first call", () => {
      expect(map(x => x * x, [1, 2, 3, 4])).toEqual([1, 4, 9, 16]);
    });
  });
});
