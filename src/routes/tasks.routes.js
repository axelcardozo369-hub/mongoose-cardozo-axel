import { Router } from "express";
import {
  addTagToTask,
  agregateTasks,
  deleteTasks,
  getAllTasks,
  getIdtasks,
  updateTasks,
} from "../controllers/tasks.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  addTagValidation,
  agregateTasksValidation,
  deleteTasksValidation,
  updateTasksValidation,
} from "../middlewares/validations/tasks.validation.js";

export const tasksRouter = Router();
tasksRouter.get("/tasks", getAllTasks);
tasksRouter.get("/tasks/:id", getIdtasks);
tasksRouter.post("/tasks", agregateTasksValidation, validate, agregateTasks);
tasksRouter.delete("/tasks/:id", deleteTasksValidation, validate, deleteTasks);
tasksRouter.put("/tasks/:id", updateTasksValidation, validate, updateTasks);
//relacion N:M: agregar una tag a una task
tasksRouter.post("/tasks/:id/tags/:tagId", addTagValidation, validate, addTagToTask);
