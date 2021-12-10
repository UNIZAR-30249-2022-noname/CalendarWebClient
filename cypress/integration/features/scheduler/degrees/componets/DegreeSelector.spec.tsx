/// <reference types="cypress" />
import "cypress-react-selector";
import { fixtures } from "./fixtures";
const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/;
Cypress.on("uncaught:exception", (err) => {
  /* returning false here prevents Cypress from failing the test */
  if (resizeObserverLoopErrRe.test(err.message)) {
    return false;
  }
});
//Change tests timeout
//Cypress.config('defaultCommandTimeout', 150000)
describe("Degree Selector", () => {
  beforeEach(() => {
    cy.intercept({ pathname: "/listDegrees" }, (req) =>
      req.reply(fixtures.ResponseDegreesGood)
    );
    // Given
    cy.visit("/");
    cy.waitForReact();
  });
  //TODO: when get degrees service is implemented

  it("should show the degrees", () => {
    // Given
    const degreesSelector = cy.react("DegreesSelector");
    degreesSelector.should("exist").and("be.visible");
    // When
    degreesSelector.click();
    // Then
    fixtures.ResponseDegreesGood.map(({ name }) =>
      cy.get(".ant-select-dropdown").should("contain", name)
    );
  });
});
