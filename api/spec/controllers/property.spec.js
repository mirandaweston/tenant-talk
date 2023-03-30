const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("../mongodb_helper");
const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../../app");
const Property = require("../../models/property");
const User = require("../../models/user");
const Review = require("../../models/review");

let token;

const generateBackdatedToken = (userId) =>
  jwt.sign(
    {
      userId,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    process.env.JWT_SECRET
  );

const dropProperties = async () => {
  const collection = mongoose.connection.collections.properties;
  try {
    await collection.drop();
  } catch (error) {
    if (error.message === "ns not found") return;
    if (error.message.includes("a background operation is currently running"))
      return;
    console.log(error.message);
  }
};

describe("/property", () => {
  beforeAll(async () => {
    const user = new User({
      firstName: "poppy ",
      lastName: "pop",
      email: "poppy@poppy.com",
      password: bcrypt.hashSync("12345678", bcrypt.genSaltSync()),
    });
    await user.save();
    token = generateBackdatedToken(user.id);
  });

  beforeEach(async () => {
    await dropProperties();
  });

  afterAll(async () => {
    await dropProperties();
  });

  describe("GET, when token is present", () => {
    it("response code is 200", async () => {
      const review = new Review({
        author: "64246d86e7b79afa05b06b21",
        comment: "I really enjoyed my stay at this property",
        overallRating: 5,
      });
      const property = new Property({
        address: "123 Tenant Lane",
        reviews: [
          {
            review,
          },
        ],
      });
      await property.save();
      token = generateBackdatedToken(user.id);

      const response = await request(app)
        .get("/property")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(200);
    });

    // it.skip("returns the corresponding property", async () => {
    //   const property = new Property({
    //     address: "123 Tenant Lane",
    //     reviews: [],
    //   });
    //   await property.save();
    //   token = generateBackdatedToken(user.id);

    //   const response = await request(app)
    //     .get("/property")
    //     .set("Authorization", `Bearer ${token}`);
    //   expect(response.body.property).toMatchObject({
    //     address: "123 Tenant Lane",
    //     review: [],
    //   });
    // });
  });
});
