import { Hono } from "hono";
import { Top } from "./components/Hello";
import { validator } from "hono/validator";
import { z } from "zod";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/json", (c) => {
  return c.json({ message: "Hola Hono!" });
});

app.get("/salida", (c) => {
  const messages = ["Good Morning", "Good Evening", "Good Night"];
  return c.html(<Top messages={messages} />);
});

const schema = z.object({
  nombre: z.string(),
  edad: z.number(),
});

app.post(
  "/post",
  validator("json", (value, c) => {
    const parsed = schema.safeParse(value);
    if (!parsed.success) {
      return c.json({ message: "Invalid data", errors: parsed.error.errors });
    }
    return c.json({ message: "Valid data", data: parsed.data });
  })
);

export default app;
