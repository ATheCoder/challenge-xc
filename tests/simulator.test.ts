import request from "supertest";
import { app } from "../src/api";
import { mongoIdRegex } from "./utils";

const agent = request(app);

describe('Tests for the "Simulator" functionality', () => {
  it("should get the list of seed simulators", async () => {
    const res = await agent.get("/api/simulator");

    expect(Object.keys(res.body)).toStrictEqual(["simulator"]);

    const { simulator: simulators } = res.body;

    expect(simulators).toHaveLength(1);

    expect(simulators[0]).toMatchObject({
      cryptocurrency: "String",
    });
  });

  describe("should get simulators of a single profile_id", () => {
    let profileId: string;
    // TODO: This can be converted to a function because it is also used inside the favorite.test.ts
    it("should get the profileId of the seed user", async () => {
      const res = await agent.get("/api/profile");

      expect(res.body["profile"]).toHaveLength(1);

      const profile = res.body.profile[0];

      profileId = profile._id;

      expect(profileId).toMatch(mongoIdRegex);
    });
    it("should get simulators of a single profile_id", async () => {
      const res = await agent.get(`/api/simulator/${profileId}`);

      expect(res.body).toHaveLength(1);

      expect(res.body[0]).toMatchObject({
        cryptocurrency: "String",
        profile_id: profileId,
      });
    });

    it("should create simulator for a profile_id", async () => {
      const createSimulatorRes = await agent
        .post(`/api/simulator/${profileId}`)
        .send({
          cryptocurrency: "eth",
          euros: 100,
          price: 27000,
          quantity: 1,
        });

      expect(createSimulatorRes.status).toBe(200);

      const getSimulatorsRes = await agent.get(`/api/simulator/${profileId}`);

      expect(getSimulatorsRes.body).toHaveLength(2);

      const createdSimulator = getSimulatorsRes.body.find(
        (sim) => sim.cryptocurrency === "eth" && sim.price === 27000
      );

      expect(createdSimulator).toBeTruthy();
    });

    it("creating simulator for a none existing profile_id should not work", async () => {
      const createSimulatorRes = await agent
        .post(`/api/simulator/647cb83c9fa19c730cce8e3f`)
        .send({
          cryptocurrency: "eth",
          euros: 100,
          price: 27000,
          quantity: 1,
        });

      expect(createSimulatorRes.status).toBe(400);

      expect(createSimulatorRes.text).toBe("Input Error: ProfileId");
    });
  });
});
