const mongoose = require("mongoose");
const Review = require("../../models/review");

describe("Review Model", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/test-db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should create a new review with valid fields", async () => {
    const id = new mongoose.Types.ObjectId();
    const review = new Review({
      author: id,
      comment: "Great apartment!",
      overallRating: 4,
      landlordRating: 4,
      conditionRating: 5,
      neighbourRating: 4,
      areaRating: 5,
      warmthRating: 4,
      parkingRating: 3,
      petsAllowed: true,
      depositReturned: false,
      image: "https://example.com/image.jpg",
    });

    const savedReview = await review.save();
    expect(savedReview._id).toBeDefined();
    expect(savedReview.createdAt).toBeDefined();
    expect(savedReview.author).toEqual(review.author);
    expect(savedReview.comment).toEqual(review.comment);
    expect(savedReview.overallRating).toEqual(review.overallRating);
    expect(savedReview.landlordRating).toEqual(review.landlordRating);
    expect(savedReview.conditionRating).toEqual(review.conditionRating);
    expect(savedReview.neighbourRating).toEqual(review.neighbourRating);
    expect(savedReview.areaRating).toEqual(review.areaRating);
    expect(savedReview.warmthRating).toEqual(review.warmthRating);
    expect(savedReview.parkingRating).toEqual(review.parkingRating);
    expect(savedReview.petsAllowed).toEqual(review.petsAllowed);
    expect(savedReview.depositReturned).toEqual(review.depositReturned);
    expect(savedReview.image).toEqual(review.image);
  });

  it("should not create a new review with invalid fields", async () => {
    const review = new Review({
      comment: "Great apartment!",
      overallRating: 6,
      landlordRating: -1,
      conditionRating: 3,
      neighbourRating: 4,
      areaRating: 5,
      warmthRating: 4,
      parkingRating: 3,
      petsAllowed: true,
      depositReturned: false,
      image: "https://example.com/image.jpg",
    });

    let error = null;
    try {
      await review.save();
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.errors).toBeDefined();
    expect(error.errors.overallRating).toBeDefined();
    expect(error.errors.overallRating.kind).toEqual("max");
    expect(error.errors.landlordRating).toBeDefined();
    expect(error.errors.landlordRating.kind).toEqual("min");
  });
});
