/// <reference types="cypress" />
import "cypress-react-selector";
import "cypress-localstorage-commands";

//Change tests timeout
//Cypress.config('defaultCommandTimeout', 150000)
describe("Left Drawer", () => {
  var leftDrawerState: string;

  before(() => {
    cy.saveLocalStorage();
  });

  beforeEach(() => {});

  after(() => {
    cy.restoreLocalStorage();
    window.localStorage.setItem("leftDrawerState", leftDrawerState);
  });

  describe("local", () => {
    it("should open the left drawer correctly", () => {
      // Given
      cy.setLocalStorage("leftDrawerState", "opened");
      cy.visit("/");
      cy.waitForReact();
      cy.get(".anticon-left-circle").should("not.exist");
      cy.get(".anticon-right-circle").should("exist");
      // When
      cy.get(".anticon-right-circle").click();
      // Then
      cy.get(".anticon-left-circle").should("exist");
      cy.get(".anticon-right-circle").should("not.exist");
      cy.react("LeftDrawer").should("exist").and("be.visible");
    });

    it("should close the left drawer correctly", () => {
      // Given
      cy.setLocalStorage("leftDrawerState", "closed");
      cy.visit("/");
      cy.waitForReact();
      cy.get(".anticon-left-circle").should("exist");
      cy.get(".anticon-right-circle").should("not.exist");
      // When
      cy.get(".anticon-left-circle").click();
      // Then
      cy.get(".anticon-left-circle").should("not.exist");
      cy.get(".anticon-right-circle").should("exist");
      cy.get(".pro-sidebar").invoke("width").should("be.lt", 5);
    });
  });
});
