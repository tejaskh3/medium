import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const router = new Hono();

function getPrisma(datasourceUrl: any) {
  return new PrismaClient({
    datasourceUrl,
  }).$extends(withAccelerate());
}
router.post("/signup", async (c) => {
  const prisma = getPrisma(c?.env?.DATABASE_URL);
  try {
    const body = await c.req.json();
    console.log(body);

    const res = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });
    return c.json({ success: true, message: "signup successful", data: res });
  } catch (error: any) {
    return c.json({
      success: false,
      message: "signup unsuccessful",
      data: error?.message,
    });
  }
});

router.post("/login", async (c) => {
  const prisma = getPrisma(c?.env?.DATABASE_URL);
  try {
    const body = await c.req.json();
    const res = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    return c.json({ success: true, message: "login successful", data: res });
  } catch (error: any) {
    return c.json({
      success: false,
      message: "login unsuccessful",
      data: error?.message,
    });
  }
});

export default router;
