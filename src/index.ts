import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/user/signup", (c) => {
  return c.text("signup");
});
app.post("/api/v1/user/login", (c) => {
  return c.text("login");
});

app.post("/api/v1/blog", (c) => {
  return c.text("create blog");
});

app.patch("/api/v1/blog", (c) => {
  return c.text("update blog");
});
app.get("/api/v1/blog/:id", (c) => {
  const id = c.req.param("id");
  console.log(id);
  return c.text("get a blog");
});
app.get("/api/v1/blog/bulk", (c) => {
  return c.text("create bulk blogs");
});
app.delete("/api/v1/blog/:id", (c) => {
  const id = c.req.param("id");
  console.log(id);
  return c.text("delete blog");
});
export default app;
