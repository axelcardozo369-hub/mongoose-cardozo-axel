import { Router } from "express";
import {
  agregateTasks,
  deleteTasks,
  getAllTasks,
  getIdtasks,
  updateTasks,
} from "../controllers/tasks.controller.js";

export const tasksRouter = Router();
tasksRouter.get("/api/tasks", getAllTasks);
tasksRouter.get("/api/tasks/:id", getIdtasks);
tasksRouter.post("/api/tasks", agregateTasks);
tasksRouter.delete("/api/tasks/:id", deleteTasks);
tasksRouter.put("/api/tasks/:id", updateTasks);
