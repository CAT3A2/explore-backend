const request = require("supertest");
const app = require("../app");
const dbConnection = require("../config/dbConnection");

describe("App tests", () => {
  beforeAll(async () => {
    await dbConnection();
  });

  let token = null;

  beforeEach(() => {
    request(app)
      .post("/auth/signup")
      .send({
        username: "username",
        password: "password",
        email: "test@test.com",
        avatar: "",
      })
      .end((err, res) => {
        token = res.body.token;
      });
  });



  test("GET /posts/all", async () => {
    const res = await request(app).get("/posts/all");
    expect(res.statusCode).toBe(201);

    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          post_id: expect.any(Number),
          user_id: expect.any(Number),
          title: expect.any(String),
          destination: expect.any(String),
          description: expect.any(String),
          image_url: expect.any(String),
          user: expect.any(Object),
          comments: expect.any(Array),
          tags: expect.any(Array),
          likes: expect.any(Array),
        }),
      ])
    );
  });
});

describe("Profile test", () => {});
