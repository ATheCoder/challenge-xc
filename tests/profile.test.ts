import request from "supertest";
import { app } from "../src/api";

const agent = request(app);

describe("Profile Tests", () => {
  it("should get the list of profiles from the profiles route", async () => {
    const res = await agent.get("/api/profile");

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      profile: [
        {
          capital: 123,
          divisa: "String",
          email: "String",
          name: "String",
          prefered_cryptocurrency: "String",
        },
      ],
    });
  });

  it("should throw an error when the required properties dont exist", async () => {
    const res = await agent.post("/api/profile").send({
      email: "email@gmail.com",
    });

    expect(res.status).toBe(400);
    expect(res.body).toStrictEqual({
      issues: [
        {
          code: "invalid_type",
          expected: "string",
          message: "Required",
          path: ["name"],
          received: "undefined",
        },
        {
          code: "invalid_type",
          expected: "string",
          message: "Required",
          path: ["nickname"],
          received: "undefined",
        },
      ],
      name: "ZodError",
    });
  });

  it("should throw an error when email is not actually an email", async () => {
    const res = await agent.post("/api/profile").send({
      email: "notanemail",
      nickname: "testerer",
      name: "Yellow Tester",
    });

    expect(res.status).toBe(400);
    expect(res.body).toStrictEqual({
      issues: [
        {
          code: "invalid_string",
          message: "Invalid email",
          path: ["email"],
          validation: "email",
        },
      ],
      name: "ZodError",
    });
  });

  it("should create profile successfully when all fields are given", async () => {
    const res = await agent.post("/api/profile").send({
      email: "email@gmail.com",
      nickname: "testerer",
      name: "Yellow Tester",
    });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      email: "email@gmail.com",
      name: "Yellow Tester",
      nickname: "testerer",
    });
  });
});
