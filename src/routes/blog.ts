import { Hono } from "hono";

const router = new Hono();

router.post("/", (c) => {
  return c.text("create blog");
});

router.patch("/", (c) => {
  return c.text("update blog");
});
router.get("/:id", (c) => {
  const id = c.req.param("id");
  console.log(id);
  return c.text("get a blog");
});
router.get("/bulk", (c) => {
  return c.text("get all blogs");
});
router.delete("/:id", (c) => {
  const id = c.req.param("id");
  console.log(id);
  return c.text("delete blog");
});

export default router;
