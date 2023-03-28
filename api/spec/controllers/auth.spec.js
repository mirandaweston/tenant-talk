const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../../app");
require("../mongodb_helper");
const User = require("../../models/user");

describe("/user", () => {
  beforeAll(async () => {
    const user = await new User({
      firstName: "User",
      lastName: "One",
      email: "test@test.com",
      password: bcrypt.hashSync("12345678", bcrypt.genSaltSync()),
    });
    await user.save();
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  test("a token is returned when login credentials are valid", async () => {
    const response = await request(app)
      .post("/user/login")
      .send({ email: "test@test.com", password: "12345678" });
    expect(response.status).toEqual(201);
    expect(response.body.token).not.toEqual(undefined);
    expect(response.body.message).toEqual("Login Successful");
  });

  test("a token is not returned when password is invalid", async () => {
    const response = await request(app)
      .post("/user/login")
      .send({ email: "test@test.com", password: "1234" });
    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual("Username or password is incorrect");
  });

  test("a token is not returned when email is invalid", async () => {
    const response = await request(app)
      .post("/user/login")
      .send({ email: "test1@test.com", password: "12345678" });
    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual("Username or password is incorrect");
  });
});
