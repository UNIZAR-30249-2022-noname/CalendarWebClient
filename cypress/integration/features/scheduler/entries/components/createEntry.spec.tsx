/// <reference types="cypress" />
import "cypress-react-selector";
import "cypress-localstorage-commands";
import "@4tw/cypress-drag-drop";

import { fixtures } from "../../degrees/componets/fixtures";
import { SubjectKind } from "../../../../../../src/features/scheduler/entries/domain/models/Entry";

describe("create scheduler entry", () => {
  var leftDrawerState: string;

  before(() => {
    cy.saveLocalStorage();
  });

  after(() => {
    cy.restoreLocalStorage();
    window.localStorage.setItem("leftDrawerState", leftDrawerState);
  });

  it("should drag and drop a subject into the scheduler", () => {
    /* GIVEN */
    // Ensure left drawer is opened
    cy.setLocalStorage("leftDrawerState", "closed");
    // Mock api call to get the subjects we want
    cy.intercept(
      {
        pathname: "/availableHours",
        method: "GET",
      },
      (req) => {
        req.reply(200, fixtures.ResponseGood);
        req.query = fixtures.Params;
      }
    ).as("getDegreeAvailableHours");

    cy.visit("/");
    cy.waitForReact();
    cy.wait(["@getDegreeAvailableHours"]);
    /* WHEN */
    let startSchedulerSlot = 14;
    cy.react("LeftDrawer")
      .react("div", { props: { draggable: true } })
      .each((e, i) => {
        const { Subject, Kind } = fixtures.ResponseGood[i];
        cy.wrap(e).trigger("dragstart");
        cy.get(".rbc-timeslot-group")
          .eq(startSchedulerSlot)
          .trigger("drop", { force: true });
        startSchedulerSlot++;
        cy.react("Modal").react("SubjectSelector").should("contain", Subject);
        cy.react("Modal")
          .react("KindSelector")
          .should("contain", parseKind(Kind));
        cy.get("body").click(0, 0);
      });
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
