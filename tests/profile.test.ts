import request from "supertest";
import { app } from "../src/api";
import mongoose from "mongoose";

const agent = request(app);

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Profile Tests", () => {
  it("should get the list of profiles from the profiles route", async () => {
    const res = await agent.get("/api/profile");

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({
      profile: [
        {
          __v: 0,
          _id: "6474d40047bbf63c79c59ade",
          capital: 123,
          divisa: "String",
          email: "String",
          name: "String",
          prefered_cryptocurrency: "String",
        },
      ],
    });
  });
});
