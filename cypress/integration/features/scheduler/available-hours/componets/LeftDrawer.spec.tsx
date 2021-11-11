/// <reference types="cypress" />
import "cypress-react-selector";
import "cypress-localstorage-commands";
import { fixtures } from "./fixtures";

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

  describe("Responsive layout", () => {
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
      cy.get(".ant-layout-sider").invoke("width").should("be.lt", 1);
    });

    const mobileSizes: Cypress.ViewportPreset[] = [
      "iphone-6+",
      "iphone-7",
      "iphone-8",
      "iphone-x",
    ];
    mobileSizes.forEach((size) => {
      it("should not be visible when mobile version", () => {
        // Given
        cy.viewport(size);
        cy.setLocalStorage("leftDrawerState", "closed");
        cy.visit("/");
        cy.waitForReact();
        // Then
        cy.get(".anticon-left-circle").should("not.exist");
        cy.get(".anticon-right-circle").should("not.exist");
        cy.get(".ant-layout-sider").should("not.exist");
      });
    });
  });

  describe("local", () => {
    it("should fetch degree information correctly", () => {
      // Given
      cy.setLocalStorage("leftDrawerState", "closed");

      cy.intercept(
        {
          pathname: "/availableHours",
          method: "GET",
        },
        (req) => {
          req.reply(fixtures.ResponseGood);
          req.query = fixtures.Params;
        }
      ).as("getDegreeAvailableHours");

      cy.visit("/");
      cy.waitForReact();
      // When
      cy.wait(["@getDegreeAvailableHours"]);
      // Then
      cy.react("LeftDrawer").should("be.visible");
      cy.react("LeftDrawer")
        .react("Title")
        .should("contain", fixtures.Params.titulacion);
      fixtures.ResponseGood.forEach((subject, i) => {
        cy.react("LeftDrawer")
          .react("Badge")
          .should("contain", subject.Remaining);
        cy.react("LeftDrawer")
          .react("Button")
          .should("contain", subject.Subject);
        cy.react("LeftDrawer")
          .react("Button")
          .should("have.css", "background-color")
          .and("eq", "rgb(166, 236, 134)");
      });
    });

    it("should fetch degree information correctly through [Buscar] button", () => {
      // Given
      cy.setLocalStorage("leftDrawerState", "closed");

      cy.intercept(
        {
          pathname: "/availableHours",
          method: "GET",
        },
        (req) => {
          req.reply(fixtures.ResponseGood);
          req.query = fixtures.Params;
        }
      );

      cy.visit("/");
      cy.waitForReact();
      // When
      cy.react("DegreesSelector").click();
      cy.get(".ant-select-item-option").contains("Arquitectura").click();
      cy.intercept(
        {
          pathname: "/availableHours",
          method: "GET",
        },
        (req) => {
          req.reply(fixtures.ResponseGood);
          req.query = fixtures.Params2;
        }
      ).as("getDegreeAvailableHours");
      cy.react("Button").contains("Buscar").click();
      cy.wait(["@getDegreeAvailableHours"]);
      cy.clock();
      cy.tick(1000);
      // Then
      cy.react("LeftDrawer").should("be.visible");
      cy.react("LeftDrawer")
        .react("Title")
        .should("contain", fixtures.Params2.titulacion);
      fixtures.ResponseGood.forEach((subject, i) => {
        cy.react("LeftDrawer")
          .react("Badge")
          .should("contain", subject.Remaining);
        cy.react("LeftDrawer")
          .react("Button")
          .should("contain", subject.Subject);
        cy.react("LeftDrawer")
          .react("Button")
          .should("have.css", "background-color")
          .and("eq", "rgb(166, 236, 134)");
      });
    });

    it("should give and error and fetch degree information correctly through [Buscar] button", () => {
      // Given
      cy.setLocalStorage("leftDrawerState", "closed");

      cy.intercept(
        {
          pathname: "/availableHours",
          method: "GET",
        },
        (req) => {
          req.reply(404, fixtures.ResponseGood);
          req.query = fixtures.Params;
        }
      );

      cy.clock();
      cy.visit("/");
      cy.waitForReact();
      // When
      cy.intercept(
        {
          pathname: "/availableHours",
          method: "GET",
        },
        (req) => {
          req.reply(fixtures.ResponseGood);
          req.query = fixtures.Params;
        }
      ).as("getDegreeAvailableHours");
      cy.react("Button").contains("Buscar").click();
      cy.wait(["@getDegreeAvailableHours"]);
      cy.tick(1000);
      // Then
      cy.react("LeftDrawer").should("be.visible");
      cy.react("LeftDrawer")
        .react("Title")
        .should("contain", fixtures.Params.titulacion);
      fixtures.ResponseGood.forEach((subject, i) => {
        cy.react("LeftDrawer")
          .react("Badge")
          .should("contain", subject.Remaining);
        cy.react("LeftDrawer")
          .react("Button")
          .should("contain", subject.Subject);
      });
    });

    it("should not fetch degree information", () => {
      // Given
      cy.setLocalStorage("leftDrawerState", "closed");

      cy.intercept(
        {
          pathname: "/availableHours",
          method: "GET",
        },
        (req) => {
          req.reply(404, fixtures.ResponseGood);
          req.query = fixtures.Params;
        }
      ).as("getDegreeAvailableHours");

      cy.visit("/");
      cy.waitForReact();
      // When
      cy.wait(["@getDegreeAvailableHours"]);
      // Then
      cy.react("LeftDrawer").should("be.visible");
      cy.get(".ant-notification-notice-message").should("be.visible");
      fixtures.ResponseGood.forEach((subject, i) => {
        cy.react("LeftDrawer").react("Badge").should("not.exist");
        cy.react("LeftDrawer").react("Button").should("not.exist");
      });
    });
  });
});
