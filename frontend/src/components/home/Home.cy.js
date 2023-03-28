import React from "react";
import Home from "./Home";

describe("<Home />", () => {
  it("renders", () => {
    cy.mount(<Home />);
  });
});
