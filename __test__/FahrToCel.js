function fToC(fahrenheit) {
  const fTemp = fahrenheit;
  //C = 5/9 x (F-32)
  const fToCel = (5 / 9) * (fTemp - 32);
  // ((fTemp - 32) * 5) / 9;
  return fToCel;
}
module.export = fToC;
