import { isTSAnyKeyword } from "@babel/types";

describe("test1", () => {
  it("Visiting Site", () => {
    cy.visit("http://localhost:3000/#/");
  });
});
describe("test2", () => {
  it("test login input email", () => {
    const email = "n";
    cy.get(".login-input")
      .first()
      .should("exist")
      .type(email);
  });
});
describe("test3", () => {
  it("test login input password", () => {
    const email = "n";
    cy.get(".pass-input")
      .first()
      .should("exist")
      .type(email);
  });
});
describe("test4", () => {
  it("click enter to submit username password", () => {
    const email = "n";
    cy.get(".loginSubmit").click();
  });
});
describe("test5", () => {
  it("go to dashboard", () => {
    cy.visit("http://localhost:3000/#/dashboard");
  });
});