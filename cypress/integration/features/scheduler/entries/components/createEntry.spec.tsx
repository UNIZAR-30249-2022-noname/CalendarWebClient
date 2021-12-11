/// <reference types="cypress" />
import "cypress-react-selector";
import "cypress-localstorage-commands";

import { fixtures } from "../../degrees/componets/fixtures";
import { SubjectKind } from "../../../../../../src/features/scheduler/entries/domain/models/Entry";

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

    cy.visit("/");
    cy.waitForReact();
    cy.wait(["@getDegrees", "@getDegreeAvailableHours"]);
    /* WHEN */
    let startSchedulerSlot = 14;
    let startTimeSlot = 0;
    cy.react("LeftDrawer")
      .react("div", { props: { draggable: true } })
      .each((e, i) => {
        const { Subject } = fixtures.ResponseGood[i];
        cy.wrap(e).trigger("dragstart");
        cy.get(".rbc-timeslot-group")
          .eq(startSchedulerSlot)
          .trigger("drop", { force: true })
          .wait(2000);
        startSchedulerSlot++;
        cy.react("Modal")
          .react("SubjectSelector")
          .should("contain", Subject.Name);
        cy.react("Modal")
          .react("KindSelector")
          .should("contain", parseKind(Subject.Kind));

        cy.react("Modal").react("WeekSelector").click();
        cy.react("Modal")
          .get(".ant-select-item-option-content")
          .contains("A")
          .click();
        cy.react("Modal").react("RoomSelector").click();
        cy.react("Modal")
          .get(".ant-select-item-option-content")
          .contains("1.34")
          .click();
        let initTimeSlot = startTimeSlot;
        cy.react("Modal")
          .react("TimeSelector")
          .get(".ant-picker-input")
          .each((e) => {
            cy.wrap(e).click();
            cy.react("Modal")
              .get(".ant-picker-time-panel-cell-inner")
              .eq(initTimeSlot)
              .click({ force: true });
            cy.react("Modal")
              .get(".ant-picker-time-panel-cell-inner")
              .eq(14)
              .click({ force: true });
            initTimeSlot++;
          });
        cy.react("Modal").react("Button").contains("Ok").click();
        cy.react("Modal")
          .react("KindSelector")
          .get(".ant-radio-button-wrapper-checked")
          .then(($btn) => {
            if ($btn.text() !== "Teoría") {
              cy.log("Dentro");
              cy.react("Modal").react("ProblemsGroupSelector").click();
              cy.react("Modal")
                .get(".ant-select-item-option-content")
                .contains("3B")
                .click();
            } else {
              cy.react("Modal")
                .react("ProblemsGroupSelector")
                .get(".ant-select-disabled")
                .should("exist");
            }
          });
        cy.react("Button").contains("Crear").click().wait(1000);
        startTimeSlot++;
        //cy.get("body").click(0, 0);
      });
    const { Subject } = fixtures.ResponseGood[0];
    cy.get(".rbc-time-content").contains(Subject.Name).click().wait(1000);
    cy.react("Modal").react("SubjectSelector").contains(Subject.Name);
    cy.react("Modal")
      .react("KindSelector")
      .get(".ant-radio-button-wrapper-checked")
      .contains(parseKind(Subject.Kind));
    cy.react("Modal").react("RoomSelector").contains("1.34");
    cy.react("Modal").react("WeekSelector").contains("A");
    cy.react("Modal")
      .react("ProblemsGroupSelector")
      .get(".ant-select-disabled")
      .should("exist");
    //cy.get("Modal").react("")
  });

  it("should create a new entry by clicking in the scheduler", () => {
    cy.setLocalStorage("selectedDegree", JSON.stringify(fixtures.Params));

    cy.intercept({ pathname: "/availableHours" }, (req) => {
      req.reply(200, fixtures.ResponseGood);
      req.query = fixtures.Params;
    }).as("getDegreeAvailableHours");

    cy.intercept({ pathname: "/listDegrees" }, (req) => {
      req.reply(200, fixtures.ResponseDegreesGood);
    }).as("getDegrees");

    cy.visit("/");
    cy.waitForReact();
    cy.wait(["@getDegreeAvailableHours"]);
    cy.get(".rbc-timeslot-group").eq(14).click({ force: true });
  });
});

const parseKind = (kind: number): string => {
  switch (kind) {
    case SubjectKind.theory: {
      return "Teoría";
    }
    case SubjectKind.problems: {
      return "Problemas";
    }
    case SubjectKind.practices: {
      return "Práctica";
    }
  }
};
