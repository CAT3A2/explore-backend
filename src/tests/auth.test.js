const request = require("supertest");
const auth = require("../routes/auth");

describe("POST /signup", () => {
  describe("given user's detail", () => {
    // should save the user details to database
    // should response with jwt and user object
    // should response with a 201 status code
    test("should response with a 201 status code", async () => {
      const response = await request(auth).post('/signup').send({
        username: 'username',
        password: 'password',
        email: 'email@test.com',
        avatar: ''
      })

      expect(response.statusCode).toBe(201)
    });
  });

  describe("when then username and password is missing", () => {
    // should response with status code of 400
  });
});
