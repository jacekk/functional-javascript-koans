describe("Filter", () => {
  describe("Implement a predicate function to select even numbers", () => {

    /********************* YOUR IMPLEMENTATION *********************/

    // predicate :: Number → Boolean
    const predicate = (item) => item % 2 === 0;

    /***************************************************************/

    test("selects only even numbers", () => {
      expect([1, 2, 3, 4, 5, 6].filter(predicate)).toEqual([2, 4, 6]);
      expect([10, 12, 13, 14, 15, 16].filter(predicate)).toEqual([10, 12, 14, 16]);
    });
  });

  describe("Implement a predicate function to drop palindromes", () => {

    // palindrome - word which reads the same backward as forward

    /********************* YOUR IMPLEMENTATION *********************/

    // predicate :: String → Boolean
    const predicate = (str) => {
      const reversed = str.split('').reverse().join('');

      return str.toLowerCase() !== reversed.toLowerCase();
    }

    /***************************************************************/

    test("selects only non-palindromes", () => {
      expect(["Hannah", "car", "kayak", "John"].filter(predicate)).toEqual(["car", "John"]);
      expect(["steps", "level", "madam", "example"].filter(predicate)).toEqual(["steps", "example"]);
    });
  });

  describe("Implement your own filter function using a for loop", () => {
    /********************* YOUR IMPLEMENTATION *********************/

    // filter :: ((a → Boolean), [a]) → [a]
    const filter = (project, list) => {
      const filtered = [];

      for (let i = 0; i < list.length; i++) {
        if (project(list[i])) {
          filtered.push(list[i]);
        }
      }

      return filtered;
    };

    /***************************************************************/

    test("accepts predicate and returns new array", () => {
      expect(filter(i => i < 5, [1, 6, 2, 5])).toEqual([1, 2]);
      expect(filter(i => i.length >= 5, ["car", "cryon", "laptop"])).toEqual(["cryon", "laptop"]);
    });
  });
});

// Now you can switch to 01_closures.js and come back when you are done with unique function

describe("Map", () => {
  describe("Implement iterative (with loop) fibonacci function to map n-th element to its value", () => {
    /********************* YOUR IMPLEMENTATION *********************/

    // fibonacci :: Number → Number
    const fibonacci = (n) => {
      let prev = 1;
      let curr = 0;

      for (let i = 0; i < n; i++) {
        curr += prev;
        prev = curr - prev;
      }

      return curr;
    }
    
    /* functional approach
    const fibonacci = (n) => {
      if (n === 0) {
        return 0;
      }
      if (n === 1) {
        return 1;
      }

      return fibonacci(n - 1) + fibonacci(n - 2);
    }
    */

    /***************************************************************/

    test("maps n-th element to it's value", () => {
      expect([0, 1, 2, 3].map(fibonacci)).toEqual([0, 1, 1, 2]);
      expect([15, 20, 25, 30].map(fibonacci)).toEqual([610, 6765, 75025, 832040]);
    });
  });

  describe("Implement your own map function using a for loop", () => {
    /********************* YOUR IMPLEMENTATION *********************/

    // map :: ((a → b), [a]) → [b]
    const map = (predicate, list) => {
      const mapped = [];

      for (let i = 0; i < list.length; i++) {
        mapped.push(predicate(list[i]));
      }

      return mapped;
    }

    /***************************************************************/

    test("accepts project function and returns new array", () => {
      expect(map(i => i * 5, [1, 6, 2, 5])).toEqual([5, 30, 10, 25]);
      expect(map(i => i.length, ["car", "cryon", "laptop"])).toEqual([3, 5, 6]);
    });
  });

  describe("Implement a range function", () => {
    /********************* YOUR IMPLEMENTATION *********************/

    // HINT: You can do it in one line using Array.from (or spread operator), array constructor and built-in map function

    // range :: (Number, Number) → [Number]
    const range = (from, to) => {
      const out = [];

      for (let i = from; i <= to; i++) {
        out.push(i);
      }

      return out;
    }

    /***************************************************************/

    test("renders range from natural numbers", () => {
      expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
      expect(range(0, 5)).toEqual([0, 1, 2, 3, 4, 5]);
    });

    test("renders range from whole numbers", () => {
      expect(range(-3, 3)).toEqual([-3, -2, -1, 0, 1, 2, 3]);
    });
  });
});

describe("Reduce", () => {
  describe("Implement fromPairs (https://lodash.com/docs#fromPairs) function using reduce", () => {
    /********************* YOUR IMPLEMENTATION *********************/

    // fromPairs :: ({ [a]: b }) → [{a, b}]
    const fromPairs = (pairs) => {
      const reducer = (memo, item) => {
        const [key, value] = item;
        memo[key] = value;
        return memo;
      };

      return pairs.reduce(reducer, {});
    }

    /***************************************************************/

    test("transforms array of 2-element arrays with a key and a value to an object", () => {
      expect(fromPairs([["foo", "bar"], ["foz", 1]])).toEqual({ foo: "bar", foz: 1 });
    });
  });

  describe("Implement your own map function using Array.prototype.reduce", () => {
    /********************* YOUR IMPLEMENTATION *********************/

    // map :: ((a → b), [a]) → [b]
    const map = (predicate, list) => {
      return list.reduce((memo, item) => {
        memo.push(predicate(item));
        return memo;
      }, []);
    }

    /***************************************************************/

    test("accepts project function and returns new array", () => {
      expect(map(i => i * 5, [1, 6, 2, 5])).toEqual([5, 30, 10, 25]);
      expect(map(i => i.length, ["car", "cryon", "laptop"])).toEqual([3, 5, 6]);
    });
  });

  describe("Implement your own filter function using Array.prototype.reduce", () => {
    /********************* YOUR IMPLEMENTATION *********************/

    // filter :: ((a → Boolean), [a]) → [a]
    const filter = (predicate, list) => {
      return list.reduce((memo, item) => {
        if (predicate(item)) {
          memo.push(item);
        }
        return memo;
      }, [])
    };

    /***************************************************************/

    test("accepts predicate and returns new array", () => {
      expect(filter(i => i < 5, [1, 6, 2, 5])).toEqual([1, 2]);
      expect(filter(i => i.length >= 5, ["car", "cryon", "laptop"])).toEqual(["cryon", "laptop"]);
    });
  });
});

// BONUS: Try to understand what Applicative Functor is and how it works
//        https://github.com/hemanth/functional-programming-jargon#applicative-functor
//        Do you know the result of [(a) => a + 1, (a) => a * a].ap([1, 2]) without executing?
