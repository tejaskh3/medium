import { Hono } from "hono";
import userRouter from "./routes/user";
import blogRouter from "./routes/blog";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);
export default app;
