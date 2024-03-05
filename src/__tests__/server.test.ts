import { describe, expect, it } from "bun:test";
import app from "..";

describe("Core tests", () => {
  it("Should return 200 Response", async () => {
    const req = new Request("http://localhost/");
    const res = await app.fetch(req);
    expect(res.status).toBe(200);
  });

  it("Should return Hello Hono!", async () => {
    const req = new Request("http://localhost/");
    const res = await app.fetch(req);
    const text = await res.text();
    expect(text).toBe("Hello Hono!");
  });

  it("Should return json", async () => {
    const req = new Request("http://localhost/json");
    const res = await app.fetch(req);
    const json = await res.json();
    expect(json.message).toBe("Hola Hono!");
  });

  it("Should return html", async () => {
    const req = new Request("http://localhost/salida");
    const res = await app.fetch(req);
    const text = await res.text();
    expect(text).toContain("Good Morning");
  });

  it("Should return 404", async () => {
    const req = new Request("http://localhost/404");
    const res = await app.fetch(req);
    expect(res.status).toBe(404);
  });
});
