import request from "supertest";
import { app } from "../src/api";
import { mongoIdRegex } from "./utils";

const agent = request(app);

describe('Testing "Favorite" functionality', () => {
  it("should return the list of seed favorities", async () => {
    const res = await agent.get("/api/favorite");

    expect(res.status).toBe(200);
    expect(Object.keys(res.body)).toStrictEqual(["favorite"]);
    expect(res.body["favorite"]).toHaveLength(1);

    expect(res.body["favorite"][0]).toMatchObject({
      favorites: ["favorite1", "favorite2", "favorite3"],
      name: "String",
    });
  });

  describe("Should find a favorite for a user", () => {
    let profileId: string;
    it("should get the profileId of the seed user", async () => {
      const res = await agent.get("/api/profile");

      expect(res.body["profile"]).toHaveLength(1);

      const profile = res.body.profile[0];

      profileId = profile._id;

      expect(profileId).toMatch(mongoIdRegex);
    });

    it("should find a favorite for the profileId", async () => {
      const res = await agent.get(`/api/favorite/${profileId}`);

      expect(res.body).toHaveLength(1);

      expect(res.body[0]).toMatchObject({
        favorites: ["favorite1", "favorite2", "favorite3"],
        name: "String",
        profile_id: profileId,
      });
    });
  });
});
