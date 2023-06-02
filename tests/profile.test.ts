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
});
