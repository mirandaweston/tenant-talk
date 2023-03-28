const jwt = require("jsonwebtoken");
const generateToken = require("../../models/token_generator");

describe("generateToken", () => {
  it("should return a valid token containing userId that is valid for 10 minutes", () => {
    // mock user ID for testing
    const userId = "123";

    // generate token
    const token = generateToken(userId);

    // decode token to verify its contents
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // assert that the decoded token contains the correct user ID and expiration time
    expect(decodedToken.userId).toEqual(userId);
    expect(decodedToken.exp - decodedToken.iat).toEqual(10 * 60);
  });
});
