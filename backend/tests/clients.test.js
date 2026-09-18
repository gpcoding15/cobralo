const request = require("supertest");
const app = require("../src/app");

describe("GET /", () => {
  test("should return status 200 with the greeting message", async () => {
    const expectedStatus = 200;
    const expectedBody = "Cobralo";

    const response = await request(app).get("/");

    expect(response.status).toBe(expectedStatus);
    expect(response.text).toBe(expectedBody);
  });
});

describe("GET /clients", () => {
  test("should return status 200", async () => {
    const expectedStatus = 200;

    const response = await request(app).get("/clients");

    expect(response.status).toBe(expectedStatus);
  });

  test("should return JSON", async () => {
    const expectedContentType = /json/;

    const response = await request(app).get("/clients");

    expect(response.headers["content-type"]).toMatch(expectedContentType);
  });

  test("should return an array", async () => {
    const response = await request(app).get("/clients");

    expect(Array.isArray(response.body)).toBe(true);
  });

  test("should initially contain Juan and Maria", async () => {
    const expectedClients = [
      { id: 1, name: "Juan Perez", email: "juan@email.com" },
      { id: 2, name: "Maria Garcia", email: "maria@email.com" },
    ];

    const response = await request(app).get("/clients");

    expect(response.body).toEqual(expect.arrayContaining(expectedClients));
  });

  test("should return objects with id, name and email", async () => {
    const response = await request(app).get("/clients");

    response.body.forEach((client) => {
      expect(client).toHaveProperty("id");
      expect(client).toHaveProperty("name");
      expect(client).toHaveProperty("email");
    });
  });
});

describe("POST /clients", () => {
  const newClient = {
    name: "Pedro Lopez",
    email: "pedro@email.com",
  };

  test("should return status 201", async () => {
    const expectedStatus = 201;

    const response = await request(app).post("/clients").send(newClient);

    expect(response.status).toBe(expectedStatus);
  });

  test("should return JSON", async () => {
    const expectedContentType = /json/;

    const response = await request(app).post("/clients").send(newClient);

    expect(response.headers["content-type"]).toMatch(expectedContentType);
  });

  test("should return the created client", async () => {
    const response = await request(app).post("/clients").send(newClient);

    expect(response.body).toMatchObject(newClient);
  });

  test("should assign the next sequential id", async () => {
    const existing = await request(app).get("/clients");
    const expectedId = existing.body.length + 1;

    const response = await request(app).post("/clients").send(newClient);

    expect(response.body.id).toBe(expectedId);
  });

  test("should keep the name", async () => {
    const response = await request(app).post("/clients").send(newClient);

    expect(response.body.name).toBe(newClient.name);
  });

  test("should keep the email", async () => {
    const response = await request(app).post("/clients").send(newClient);

    expect(response.body.email).toBe(newClient.email);
  });
});

describe("In-memory persistence", () => {
  test("should keep a created client available in a later GET /clients", async () => {
    const newClient = {
      name: "Laura Torres",
      email: "laura@email.com",
    };

    const postResponse = await request(app).post("/clients").send(newClient);
    const getResponse = await request(app).get("/clients");

    expect(getResponse.body).toContainEqual(postResponse.body);
  });
});
