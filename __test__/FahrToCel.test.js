const fToC = require("./FahrToCel");
test("convert 32 Fahrenheit to 0 celsius", () => {
  expect(fToC(32)).toBe(0);
});
