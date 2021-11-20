/// <reference types="cypress" />
import "cypress-react-selector";

//Change tests timeout
//Cypress.config('defaultCommandTimeout', 150000)
describe("Degree Selector", () => {
  beforeEach(() => {
    // Given
    cy.visit("/");
    cy.waitForReact();
  });
  //TODO: when get degrees service is implemented

  it("should show the degrees", () => {
    // Given
    const degrees = ["Arquitectura", "Ingeniería informática", "Matemáticas"];
    cy.react("DegreesSelector").should("exist").and("be.visible");
    // When
    cy.react("DegreesSelector").click();
    // Then
    degrees.map((degree, i) => cy.contains(degree));
  });

  it("should not show any degrees", () => {
    // Given
    cy.react("DegreesSelector").should("exist").and("be.visible");
    // When
    cy.react("DegreesSelector").click();
    // Then
  });
});
