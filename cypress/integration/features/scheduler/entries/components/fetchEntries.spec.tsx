/// <reference types="cypress" />
import "cypress-react-selector";
import "cypress-localstorage-commands";
import { fixtures1 } from "./fixtures";
import { fixtures } from "../../degrees/componets/fixtures";
describe("fetch scheduler entries", () => {
  before(() => {
    cy.saveLocalStorage();
  });

  after(() => {
    cy.restoreLocalStorage();
  });

  it("should load the entries correctly", () => {
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
    }).as("listDegrees");

    cy.intercept({ pathname: "/getEntries" }, (req) => {
      req.reply(200, fixtures1.fetchEntriesListDTO);
      req.query = fixtures.Params;
    }).as("getEntries");

    /* WHEN */
    cy.visit("/");
    cy.waitForReact();
    cy.wait(["@listDegrees", "@getDegreeAvailableHours", "@getEntries"]);
  });
});
