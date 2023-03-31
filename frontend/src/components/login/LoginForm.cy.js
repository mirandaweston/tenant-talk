import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../../contexts/AuthContext";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <AuthContextProvider>
          <LoginForm />
        </AuthContextProvider>
      </BrowserRouter>
    );
  });

  it("calls the /login endpoint and receives token", () => {
    cy.intercept("POST", "user/login", { token: "fakeToken" }).as(
      "loginRequest"
    );

    cy.get('[data-cy="email"]').type("test@test.com");
    cy.get('[data-cy="password"]').type("password");
    cy.get('[data-cy="submit"]').click();
    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.body.token).to.eq("fakeToken");
    });
  });

  it('should navigate to the signup page when "Sign up" link clicked', () => {
    cy.get('[data-cy="signup-link"]').click();
    cy.url().should("include", "/signup");
  });
});
