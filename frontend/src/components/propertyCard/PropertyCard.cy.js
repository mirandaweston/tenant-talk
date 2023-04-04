import React from "react";
import { MemoryRouter } from "react-router-dom";
import { CloudinaryContext } from "../../contexts/CloudinaryContext";
import PropertyCard from "./PropertyCard";

describe("PropertyCard", () => {
  const property = {
    _id: "123",
    address: "123 Main St",
    reviews: [
      { overallRating: 4, image: "public_id_1" },
      { overallRating: 5, image: "public_id_2" },
    ],
  };
  const cld = {
    image: () => ({
      resize: () => ({
        gravity: () => ({ toString: () => "cloudinary_url" }),
        toString: () => "cloudinary_url",
      }),
    }),
  };

  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <CloudinaryContext.Provider value={cld}>
          <PropertyCard property={property} />
        </CloudinaryContext.Provider>
      </MemoryRouter>
    );
  });

  it("displays the property address", () => {
    cy.contains(property.address).should("be.visible");
  });

  it("displays the number of reviews", () => {
    cy.contains(`Reviews: ${property.reviews.length}`).should("be.visible");
  });

  it("displays the star rating", () => {
    const averageRating = (4 + 5) / 2;
    cy.contains(`${averageRating} out of 5 stars`).should("be.visible");
  });

  // it("displays the property image", () => {
  //   // const publicId = property.reviews[property.reviews.length - 1].image;
  //   // cy.get('[data-cy="image"]').should("be.visible");
  //   // cy.get('[data-cy="image"] img')
  //   //   .should("have.attr", "src")
  //   //   .should("contain", "cloudinary_url");
  //   cy.get('[data-cy="image"]').should("have.attr", "src");
  //   // cy.get('[data-cy="image"]')
  //   //   .invoke("attr", "src")
  //   //   .should("contain", "https://res.cloudinary.com/dfawheswi/image/upload/");
  // });
});
