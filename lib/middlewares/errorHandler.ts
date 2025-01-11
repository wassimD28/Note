import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";

export const errorHandler = async (c: Context, next: Next) => {
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
};
