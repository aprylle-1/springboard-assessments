const {unroll, SquareError} = require("./unroll");
describe("#unroll", function () {

  it("is a function", function () {
    expect(typeof unroll).toEqual("function");
  });

  it("will throw an error if not a square array", function(){
    const arr = [
      [1,2,3],
      [4,5,6],
      [7,8]
    ]
    expect(unroll(arr)).toBe("Not a square array")
  })

  it("works with square arrays -- length is not an even number", function () {
    const arr = [
      [1,2,3],
      [4,5,6],
      [7,8,9]
    ]
    expect(unroll(arr)).toBe("1 2 3 6 9 8 7 4 5")
  })

  it("works with square arrays -- length is an even number", function(){
    const arr = [
      [1,2,3,4],
      [4,5,6,8],
      [7,8,9,6],
      [2,8,4,5]
    ]
    expect(unroll(arr)).toBe("1 2 3 4 8 6 5 4 8 2 7 4 5 6 9 8")
  })
});
