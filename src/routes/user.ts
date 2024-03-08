import { Hono } from "hono";

const router = new Hono();

router.get("/signup", (c) => {
  return c.text("signup");
});

router.post("/login", (c) => {
  return c.text("login");
});

export default router;
