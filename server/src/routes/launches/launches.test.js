const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../../database/database");

describe("Launches API", () => {
  beforeAll(() => {
    mongoConnect();
  });
  afterAll(async () => {
    await mongoDisconnect();
  });
  describe("Test GET /launches", () => {
    test("it should respond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /launches", () => {
    const completeLaunchObject = {
      mission: "USS Enterprise",
      rocket: "Starwing 485e G",
      target: "Kepler-1652 b",
      launchDate: "January 4, 2028",
    };
    const launchObjectWithoutDate = {
      mission: "USS Enterprise",
      rocket: "Starwing 485e G",
      target: "Kepler-1652 b",
    };
    const launchObjectWithoutMission = {
      mission: "",
      rocket: "Starwing 485e G",
      target: "Kepler-1652 b",
      launchDate: "January 4, 2028",
    };
    const launchObjectWithInvalidDate = {
      mission: "USS Enterprise",
      rocket: "Starwing 485e G",
      target: "Kepler-1652 b",
      launchDate: "tirelipimpon",
    };
    test("it should respond with 201 created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchObject)
        .expect("Content-Type", /json/)
        .expect(201);
      const requestDate = new Date(completeLaunchObject.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(responseDate).toBe(requestDate);
      expect(response.body).toMatchObject(launchObjectWithoutDate);
    });

    test("it should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchObjectWithoutMission)
        .expect("Content-Type", /json/)
        .expect(400);
      expect(response.body).toStrictEqual({
        message: "Toutes les valeurs du formulaire sont obligatoires",
      });
    });

    test("it should catch invalud dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchObjectWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);
      expect(response.body).toStrictEqual({
        message: "La date est invalide",
      });
    });
  });
});
