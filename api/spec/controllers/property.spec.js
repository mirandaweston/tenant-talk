const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const Property = require("../../models/property");
const generateToken = require("../../models/token_generator");

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
  beforeEach(async () => {
    await dropProperties();
  });

  afterAll(async () => {
    await dropProperties();
  });

  describe("GET, when token is present", () => {
    it("response code is 200", async () => {
      const property = new Property({
        address: "123 Tenant Lane",
        reviews: [],
      });
      await property.save();
      token = generateBackdatedToken(user.id);

      const response = await request(app)
        .get("/property")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(200);
    });

    xit("returns the corresponding property", async () => {
      const property = new Property({
        address: "123 Tenant Lane",
        reviews: [],
      });
      await property.save();
      token = generateBackdatedToken(user.id);

      const response = await request(app)
        .get("/property")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.property).toMatchObject({
        address: "123 Tenant Lane",
        review: [],
      });
    });
  });
});
