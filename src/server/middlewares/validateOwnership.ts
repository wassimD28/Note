import { Context } from "hono";
import { CategoryRepository } from "../repositories/categoryRepo";
import { HTTPException } from "hono/http-exception";
import { Entity } from "@/src/shared/types/enum/common.enum";
import { TaskRepository } from "../repositories/taskRepo";
import { TaskComponentRepository } from "../repositories/taskComponentRepo";
import { SettingsRepository } from "../repositories/settingsRepo";
import { PomodoroSessionRepository } from "../repositories/pomodoroRepo";

export const validateOwnership = (entityName: keyof typeof Entity) => {
  return async (c: Context, next: () => Promise<void>) => {
    try {
      const userId = c.get("userId");
      const EntityId = Number(c.req.param("id"));

      if (isNaN(EntityId)) {
        throw new HTTPException(400, {
          message: `Invalid ${entityName.toLocaleLowerCase()} ID`,
        });
      }
      let entity;
      switch (entityName) {
        case "CATEGORY":
          entity = await CategoryRepository.getCategoryById(EntityId);
          break;
        case "TASK":
          entity = await TaskRepository.getTaskById(EntityId);
          break;
        case "TASK_COMPONENT":
          entity = await TaskComponentRepository.getOneById(EntityId);
          break;
        case "POMODORO_SESSION":
          entity = await PomodoroSessionRepository.getSessionById(EntityId);
          break;
        case "SETTING":
          entity = await SettingsRepository.getUserSettings(userId);
          break;
        default:
          throw new HTTPException(400, {
            message: "Invalid entity name to validate ownership.",
          });
          break;
      }

      if (!entity) {
        throw new HTTPException(404, {
          message: `${entityName.toLocaleLowerCase()} not found to validate ownership.`,
        });
      }

      if (entity.userId !== userId) {
        throw new HTTPException(403, {
          message: `You do not have permission to access this ${entityName.toLowerCase()}.`,
        });
      }

      await next();
    } catch (error) {
      if (error instanceof HTTPException) {
        throw error;
      }
      console.error("Error in ownership validation:", error);
      throw new HTTPException(500, {
        message: "Internal server error during ownership validation",
      });
    }
  };
};
