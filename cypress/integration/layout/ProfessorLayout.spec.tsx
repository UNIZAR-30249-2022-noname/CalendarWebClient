/// <reference types="cypress" />
import "cypress-react-selector";
//Change tests timeout
//Cypress.config('defaultCommandTimeout', 150000)
describe("Professor layout", () => {
  beforeEach(() => {
    // Given
    cy.visit("/");
    cy.waitForReact();
  });

  describe("Responsive layout", () => {
    const mobileSizes: Cypress.ViewportPreset[] = [
      "iphone-6+",
      "iphone-7",
      "iphone-8",
      "iphone-x",
    ];
    mobileSizes.forEach((size) => {
      it(`should show mobile version tab when screen is ${size}`, () => {
        // When
        cy.viewport(size);
        // Then
        cy.react("NavbarMobile").should("exist");
        cy.react("RightSidebar").should("exist");
      });
    });

    it("should show web version tab when screen is web", () => {
      // Then
      cy.react("NavbarWeb").should("exist");
      cy.react("RightSidebar").should("exist");
      cy.contains("Horario");
      cy.contains("Salir");
      cy.contains("Datos");
      cy.contains("Calendario");
      // cy.get("ul").children().should("not.exist");
      // cy.react("Alert", { props: { type: "error" } }).should("not.exist");
    });
  });

  //TODO: [Logout] tests
  describe("Pages render correctly when select tabs", () => {
    const pages = [
      { name: "Horario", compName: "SchedulerPage" },
      { name: "Calendario", compName: "CalendarPage" },
      { name: "Datos", compName: "DataPage" },
    ];

    describe("Web version", () => {
      pages.forEach((page) => {
        it(`should visit ${page.name} correctly`, () => {
          // Given
          cy.react("NavbarWeb").should("exist");
          // When
          cy.react("Tabs").contains(page.name).click();
          // Then
          cy.react(page.compName).should("exist");
          // [page.name] should be active in the topTabBar
          cy.get(".ant-tabs-tab-active").should("contain", page.name);
        });
      });

      it(`should get back to Scheduler when clicking in logo`, () => {
        // Given
        cy.react("Tabs").contains("Datos").click();
        cy.react("DataPage").should("exist");
        // When
        cy.get("#mainLogo").click();
        // Then
        cy.react("SchedulerPage").should("exist");
      });
    });

    describe.only("Mobile version", () => {
      pages.forEach((page) => {
        it(`should visit ${page.name} correctly`, () => {
          // When
          cy.viewport("iphone-6");
          cy.react("Menu").should("exist");
          // Then
          cy.get(".ant-menu").click();
          cy.get(".ant-menu-submenu-popup").contains(page.name).click();
          cy.react(page.compName).should("exist");
        });
      });
      it(`should get back to Scheduler when clicking in logo`, () => {
        //When
        cy.react("Tabs").contains("Datos").click();
        cy.react("DataPage").should("exist");
        // Then
        cy.get(".anticon-calendar").click();
        cy.react("SchedulerPage").should("exist");
      });
    });

    /*TODO: mejorar */
    describe("Drawer", () => {
      it(`should open drawer and close it correctly by clicking 'X'`, () => {
        //cy.react("Drawer").should("not.be.visible");
        // Given
        cy.get(".anticon-profile").should("exist");
        // When
        cy.get(".anticon-profile").click();
        // Then
        cy.react("Drawer").should("be.visible");
        cy.get(".ant-drawer-close").click();
        //cy.react("Drawer").should("not.be.visible");
      });

      it(`should open drawer and close it correctly by clicking outside it`, () => {
        cy.react(".ant-drawer-content").should("not.exist");
        // Given
        cy.get(".anticon-profile").should("exist");
        // When
        cy.get(".anticon-profile").click();
        // Then
        cy.react("Drawer").should("be.visible");
        cy.get("body").click(0, 0);
      });
    });
  });
});
