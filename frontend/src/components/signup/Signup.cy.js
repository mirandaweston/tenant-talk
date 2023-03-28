import React from "react";
import { BrowserRouter } from "react-router-dom";
import Signup from "./Signup";
import { AuthContextProvider } from "../../contexts/AuthContext";

describe("<Signup />", () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <AuthContextProvider>
          <Signup />
        </AuthContextProvider>
      </BrowserRouter>
    );
  });

  describe("once the submit button is clicked", () => {
    beforeEach(() => {
      cy.intercept(
        "POST",
        "/user/signup",
        (req) => {
          req.reply({
            statusCode: 201,
            body: { message: "OK" },
          });
        },
        {
          delay: 1000,
        }
      ).as("signup");
    });

    it("clears the input", () => {
      cy.get('[data-cy="first_name"]').type("Test");
      cy.get('[data-cy="last_name"]').type("User");
      cy.get('[data-cy="email"]').type("test@user.com");
      cy.get('[data-cy="password"]').type("password");

      cy.get('[data-cy="submit"]').click();
      cy.get('[data-cy="submit"]').should("have.attr", "disabled");

      cy.wait("@signup").then(() => {
        cy.get('[data-cy="first_name"]').should("have.value", "");
        cy.get('[data-cy="last_name"]').should("have.value", "");
        cy.get('[data-cy="email"]').should("have.value", "");
        cy.get('[data-cy="password"]').should("have.value", "");
        cy.get('[data-cy="submit"]').should("not.have.attr", "disabled");
      });
    });
  });
});
