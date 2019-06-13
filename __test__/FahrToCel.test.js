const fToC = require("./CelcToFerin");
test("convert 32 Fahrenheit to 0 celsius", () => {
  expect(fToC(-17)).toBe(0);
});
