import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: { userId: string };
}>();

function getPrisma(datasourceUrl: any) {
  return new PrismaClient({
    datasourceUrl,
  }).$extends(withAccelerate());
}

// middleware for /blog routes
router.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    c.status(403);
    return c.json({ message: "user not logged in." });
  }
  const token = authHeader.split(" ")[1];
  // console.log("jhtis is your token".token);

  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(403);
    return c.json({ success: false, message: "Token not Found" });
  }
  c.set("userId", payload.id);
  await next();
});

router.post("/", async (c) => {
  const prisma = getPrisma(c?.env?.DATABASE_URL);
  try {
    const authorId = c.get("userId");
    const { title, content, published } = await c.req.json();
    const blog = await prisma.post.create({
      data: {
        title,
        content,
        published,
        authorId,
      },
    });
    console.log(blog);
    c.status(201);
    return c.json({
      success: true,
      message: "Blog posted successfully",
      data: blog,
    });
  } catch (error: any) {
    console.log(error);
    return c.json({
      success: false,
      message: "Error posting blog.",
      data: error.message,
    });
  }
});

router.patch("/", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  try {
    const { id, authorId, title, content, published } = await c.req.json();

    const updatedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        id,
        authorId,
        title,
        content,
        published,
      },
    });
    console.log(updatedPost);
    return c.json({ success: true, message: "Post updated successfully." });
  } catch (error: any) {
    console.log(error);
    c.status(500);
    return c.json({
      success: false,
      message: "Error updating post.",
      data: error.message,
    });
  }
});

router.get("/bulk", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  try {
    const blogs = await prisma.post.findMany({});
    return c.json({
      success: true,
      message: "Success getting all blogs.",
      data: blogs,
    });
  } catch (error: any) {
    console.log(error);
    c.status(500);
    return c.json({
      success: false,
      message: "Error getting all blogs.",
      data: error.message,
    });
  }
});

router.get("/:id", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  try {
    const id = c.req.param("id");
    console.log(id);

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (!post) {
      c.status(404);
      return c.json({ success: false, message: "No such blog found" });
    }
    return c.json({
      success: true,
      message: "Success getting a post",
      data: post,
    });
  } catch (error: any) {
    console.log(error);
    c.status(500);
    return c.json({
      success: false,
      message: "Error getting a post.",
      data: error.message,
    });
  }
});
router.delete("/:id", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);

  try {
    const id = c.req.param("id");
    const deletePost = await prisma.post.delete({
      where: {
        id,
      },
    });
    c.status(200);
    return c.json({ success: true, message: "Blog deleted", data: deletePost });
  } catch (error: any) {
    c.status(500);
    return c.json({
      success: false,
      message: "Error deleting blog.",
      data: error.message,
    });
  }
});

export default router;
