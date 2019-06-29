function cToF(celsius) {
  const cTemp = celsius;
  const cToFahr = (cTemp * 9) / 5 + 32;
  return cToFahr;
}
module.exports = cToF;
