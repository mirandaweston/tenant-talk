import React, { Fragment } from "react";
import HomeNav from "./homeNav";
import Home from "../home/Home";
import { BrowserRouter } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";

describe("<HomeNav />", () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <Home>
          <homeNav />
        </Home>
      </BrowserRouter>
    );
  });

  it("displays the menu icon", () => {
    cy.get("svg").should("have.attr", "xmlns", "http://www.w3.org/2000/svg");
  });

  it("opens the menu when clicked", () => {
    cy.get('[data-testid="menu-button"]').click();

    cy.get('[data-testid="menu-item-login"]').should(
      "have.attr",
      "href",
      "/login"
    );
    cy.get('[data-testid="menu-item-properties"]').should(
      "have.attr",
      "href",
      "/properties"
    );
    cy.get('[data-testid="menu-item-about"]').should(
      "have.attr",
      "href",
      "/about"
    );
  });
});
