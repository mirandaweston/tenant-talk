const mongoose = require("mongoose");

require("../mongodb_helper");
const Property = require("../../models/property");

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

describe("Property model", () => {
  // beforeEach(async () => {
  //   await dropProperties();
  // });

  // afterAll(async () => {
  //   await dropProperties();
  // });

  it("has an address", () => {
    const property = new Property({
      address: "Fake address",
    });

    expect(property.address).toEqual("Fake address");
  });
});
