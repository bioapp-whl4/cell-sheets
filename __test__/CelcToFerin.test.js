const cToF = require("./CelcToFerin");
test("convert 60 celsius to 140 Fahrenheit", () => {
  expect(cToF(60)).toBe(140);
});
