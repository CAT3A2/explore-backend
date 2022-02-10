const request = require("supertest");
const profile = require("../routes/profile");


describe("GET /:id/posts", () => {
  test("should response user's all posts", async () => {
    const response = await request(profile).get("/:id/posts").send({

    })
  })
});