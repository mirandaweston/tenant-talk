const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

const dropUsers = async () => {
  const collection = mongoose.connection.collections.users;
  try {
    await collection.drop();
  } catch (error) {
    if (error.message === "ns not found") return;
    if (error.message.includes("a background operation is currently running"))
      return;
    console.log(error.message);
  }
};

describe("User model", () => {
  // beforeEach(async () => {
  //   await dropUsers();
  // });

  afterAll(async () => {
    await dropUsers();
  });

  const user1 = new User({
    firstName: "User",
    lastName: "One",
    email: "user@one.com",
    password: "password",
  });

  it("has a firstName", () => {
    expect(user1.firstName).toEqual("User");
  });

  it("has a lastName", () => {
    expect(user1.lastName).toEqual("One");
  });

  it("has an email address", () => {
    expect(user1.email).toEqual("user@one.com");
  });

  it("has a password", () => {
    expect(user1.password).toEqual("password");
  });

  it("can list all users", async () => {
    const users = await User.find();
    expect(users).toEqual([]);
  });

  it("can save a user", async () => {
    await user1.save();

    const users = await User.find();

    expect(users[0]).toMatchObject({
      firstName: "User",
      lastName: "One",
      email: "user@one.com",
      password: "password",
    });
  });

  it("Throws an error when a user with a username that exists already", async () => {
    const user2 = new User({
      firstName: "Same",
      lastName: "User",
      email: "same@user.com",
      password: "password",
    });

    const user3 = new User({
      firstName: "Same",
      lastName: "User",
      email: "same@user.com",
      password: "password",
    });

    await user2.save();

    await expect(user3.save()).rejects.toThrow(
      'E11000 duplicate key error collection: tenant_talk_test.users index: email_1 dup key: { email: "same@user.com" }'
    );
  });
});
