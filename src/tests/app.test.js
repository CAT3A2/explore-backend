const req = require("express/lib/request");
const request = require("supertest");
const app = require("../app");
const dbConnection = require("../config/dbConnection");

jest.mock("../utils/cloudinary", () => {
  return {
    uploadFile: jest.fn(() => "www.fakeimage.com"),
  };
});

const PASSWORD = "password";

describe("Test Auth Routes", () => {
  let token = null;
  let username = null;
  let userId = null;
  let postId = null;

  beforeAll(async () => {
    await dbConnection();
  });

  test("POST /auth/signup", async () => {
    const res = await request(app)
      .post("/auth/signup")
      .send({
        username: `${new Date().getTime()}`,
        password: PASSWORD,
        email: `${new Date().getTime()}@email.com`,
        avatar: "",
      });

    token = res.body.accessToken;
    userId = res.body.user.user_id;
    username = res.body.user.username;

    expect(res.statusCode).toBe(201);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.user.user_id).toBeDefined();
  });

  test("POST /auth/login", async () => {
    const res = await request(app).post("/auth/login").send({
      username,
      password: PASSWORD,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.user.user_id).toBe(userId);
  });

  test("Create post | POST /profile/{id}/posts", async () => {
    const res = await request(app)
      .post(`/profile/${userId}/posts`)
      .set("Authorization", "Bearer " + token)
      .send({
        user_id: userId,
        title: "title",
        description: "description",
        destination: "destination",
      });
    postId = res.body.post_id;
    expect(res.statusCode).toBe(201);
    expect(res.body.post_id).toBeDefined();
    expect(res.body.user_id).toBe(userId);
  });

  test("Update post | PUT /profile/{user_id}/posts/{post_id}", async () => {
    const res = await request(app)
      .put(`/profile/${userId}/posts/${postId}`)
      .set("Authorization", "Bearer " + token)
      .send({
        user_id: userId,
        title: "title",
        description: "description",
        destination: "destination",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.post_id).toBeDefined();
    expect(res.body.user_id).toBe(userId);
  });

  test("Delete post | DELETE /profile/{user_id}/posts/{post_id}", async () => {
    const res = await request(app)
      .delete(`/profile/${userId}/posts/${postId}`)
      .set("Authorization", "Bearer " + token)
      .send();

    expect(res.statusCode).toBe(200);
  });
});

// describe("Profile test", () => {});
