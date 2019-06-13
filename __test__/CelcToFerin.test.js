const cToF = require("./CelcToFerin");
test("convert 0 celsius to 32 Fahrenheit", () => {
  expect(cToF(0)).toBe(32);
});
