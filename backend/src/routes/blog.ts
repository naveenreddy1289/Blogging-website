import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  }
}>();




blogRouter.post('/blog', async (c) => {
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
  const body = await c.req.json();
 // const authorId = c.get("userId");

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: 1,
    }
  });
  return c.json({
    id: blog.id
  });
});

blogRouter.put('/blog', async (c) => {
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
  const body = await c.req.json();

  const blog = await prisma.blog.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    }
  });
  return c.json({
    id: blog.id
  });
});

blogRouter.get('/blog', async (c) => {
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
  const body = await c.req.json();

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: body.id,
      },
    });
    return c.json({
      blog
    });
  } catch (e) {
    c.status(411);
    return c.json({
      message: "Error while fetching blog post"
    });
  }
});

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
  const blogs = await prisma.blog.findMany();
  return c.json(blogs);
});