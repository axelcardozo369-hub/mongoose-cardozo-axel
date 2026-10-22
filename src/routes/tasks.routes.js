import { Router } from "express";
import {
  agregateTasks,
  deleteTasks,
  getAllTasks,
  getIdtasks,
  updateTasks,
} from "../controllers/tasks.controller.js";
import { validate } from "../middlewares/validate.js";
import { agregateTasksValidation } from "../middlewares/validations/tasks.validation.js";

export const tasksRouter = Router();
tasksRouter.get("/tasks", getAllTasks);
tasksRouter.get("/tasks/:id", getIdtasks);
tasksRouter.post("/tasks", agregateTasksValidation, validate, agregateTasks);
tasksRouter.delete("/tasks/:id", deleteTasks);
tasksRouter.put("/tasks/:id", updateTasks);
