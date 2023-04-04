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

  it("displays search button", () => {
    cy.get("div").contains("Search").should("exist");
  });

  it("displays text", () => {
    cy.get("h1").contains("Welcome to Tenant Talk").should("exist");
    cy.get("p")
      .contains(
        "Search for an address to find reviews for your prospective home"
      )
      .should("exist");
  });

  it("displays background image", () => {
    cy.get("img").should(
      "have.attr",
      "src",
      "https://source.unsplash.com/nrSzRUWqmoI/5184x3456"
    );
  });

  it("displays logo", () => {
    cy.get("svg").should("have.attr", "xmlns", "http://www.w3.org/2000/svg");
  });
});
