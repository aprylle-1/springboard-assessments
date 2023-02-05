const addCommas = require("./addCommas");

describe("#addCommas", () => {
  test("it is a function", () => {
    expect(typeof addCommas).toBe("function");
  });
});

describe("#addCommas no decimal points", () => {
  test("should work for 1234", () => {
    const res = addCommas(1234)

    expect(res).toBe("1,234")
  });

  test("should work for 1000000", () => {
    const res = addCommas(1000000)

    expect(res).toBe("1,000,000")
  });

  test("should work for 9876543210", () => {
    const res = addCommas(9876543210)

    expect(res).toBe("9,876,543,210")
  });

  test("should work for 6", () => {
    const res = addCommas(6)

    expect(res).toBe("6")
  });
});

describe("#addCommas no decimal points -- negative numbers", () => {
  test("should work for -10", () => {
    const res = addCommas(-10)

    expect(res).toBe("-10")
  });

  test("should work for -500678", () => {
    const res = addCommas(-500678)

    expect(res).toBe("-500,678")
  });
});

describe("#addCommas with decimal points", () => {
  test("should work for 12345.678", () => {
    const res = addCommas(12345.678)

    expect(res).toBe("12,345.678")
  });

  test("should work for -3141592.65", () => {
    const res = addCommas(-3141592.65)

    expect(res).toBe("-3,141,592.65")
  });
});


