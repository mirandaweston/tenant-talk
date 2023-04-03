import React from "react";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";

describe("<Home />", () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });

  it("displays placeholder text within search input", () => {
    cy.get("input").should("have.attr", "placeholder", "Search for an address");
  });

  it("displays log in and sign up buttons", () => {
    cy.get("div").contains("Log in").should("exist");
    cy.get("div").contains("Sign up").should("exist");
  });

  it("displays search button", () => {
    cy.get("div").contains("Search").should("exist");
  });

  it("displays text", () => {
    cy.get("h1").contains("Welcome to Tenant T").should("exist");
  });
});
