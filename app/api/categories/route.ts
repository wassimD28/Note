import { Hono } from "hono";
import { handle } from "hono/vercel";
import { CategoryController } from "@/lib/controllers/category.controller";
import { authenticateUser } from "@/lib/middlewares/authenticateUser";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

// Global error handling
app.use("*", async (c, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json(
        {
          status: "error",
          message: error.message,
        },
        error.status,
      );
    }
    console.error(error);
    return c.json(
      {
        status: "error",
        message: "Internal Server Error",
      },
      500,
    );
  }
});

// Apply authentication to all routes
app.use("*", authenticateUser);


// Only keep the routes that don't need an ID
app.get("/api/categories", CategoryController.getCategories);
app.post("/api/categories", CategoryController.createCategory);

export const GET = handle(app);
export const POST = handle(app);
