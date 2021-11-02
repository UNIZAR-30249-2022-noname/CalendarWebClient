import { StringMatcher } from "cypress/types/net-stubbing";

//TODO: complete
export const mock = {
  get: (
    url: StringMatcher,
    response?: Object,
    query?: Record<string, string | number>
  ) => {
    return cy.intercept(
      {
        pathname: url,
        method: "GET",
      },
      (req) => {
        req.reply(203, response);
        req.query = query ?? {};
      }
    );
  },
};
