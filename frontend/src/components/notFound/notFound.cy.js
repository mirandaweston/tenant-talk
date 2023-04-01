import React from "react";
import NotFound from "./notFound";
import { BrowserRouter } from "react-router-dom";

describe("NotFound", () => {
  it("displays a 404 error message", () => {
    cy.mount(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    cy.contains("404");
    cy.contains("Page not found");
    cy.contains("Sorry, we couldn't find the page you're looking for.");
  });

  it("has a link to the home page", () => {
    cy.mount(<NotFound />);
    cy.get("a").should("have.attr", "href", "/");
  });

  it("displays the background image", () => {
    cy.mount(<NotFound />);
    cy.get("img").should(
      "have.attr",
      "src",
      "https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75"
    );
  });
});
