/// <reference types="cypress" />
import "cypress-react-selector";
import "cypress-localstorage-commands";

import { fixtures } from "../../degrees/componets/fixtures";
import { fixtures1 } from "./fixtures";

const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/;
Cypress.on("uncaught:exception", (err) => {
  /* returning false here prevents Cypress from failing the test */
  if (resizeObserverLoopErrRe.test(err.message)) {
    return false;
  }
});

describe("create scheduler entry", () => {
  before(() => {
    cy.saveLocalStorage();
  });

  after(() => {
    cy.restoreLocalStorage();
  });

  it("should drag and drop a subject into the scheduler and create a new entry", () => {
    /* GIVEN */
    // Ensure left drawer is opened
    cy.setLocalStorage("leftDrawerState", "closed");
    cy.setLocalStorage("selectedDegree", JSON.stringify(fixtures.Params));
    // Mock api call to get the subjects we want
    cy.intercept({ pathname: "/availableHours" }, (req) => {
      req.reply(200, fixtures.ResponseGood);
      req.query = fixtures.Params;
    }).as("getDegreeAvailableHours");

    cy.intercept({ pathname: "/listDegrees" }, (req) => {
      req.reply(200, fixtures.ResponseDegreesGood);
    }).as("getDegrees");

    cy.intercept({ pathname: "/getEntries" }, (req) => {
      req.reply(200, fixtures1.fetchEntriesListDTOD_Delete);
      req.query = fixtures.Params;
    });

    cy.visit("/");
    cy.waitForReact();
    cy.wait(["@getDegrees", "@getDegreeAvailableHours"]);
    /* WHEN */
    const entryToDelete = fixtures1.fetchEntriesListDTOD_Delete[0];
    cy.react("EntryContent")
      .contains(entryToDelete.subject)
      .get("#delete-entry-button")
      .click();

    const entryListWithoutDeletedEntry =
      fixtures1.fetchEntriesListDTOD_Delete.filter(
        (e) => e.subject !== entryToDelete.subject
      );
    entryListWithoutDeletedEntry.forEach((entry) => {
      cy.react("EntryContent").should("contain", entry.subject);
    });
  });
});
