import { Router } from "express";
import {
  agregateTags,
  deleteTags,
  getAllTags,
  getIdTags,
  updateTags,
} from "../controllers/tag.controller.js";

export const tagRouter = Router();

tagRouter.post("/api/tags", agregateTags);
tagRouter.get("/api/tags", getAllTags);
tagRouter.get("/api/tags/:id", getIdTags);
tagRouter.delete("/api/tags/:id", deleteTags);
tagRouter.put("/api/tags/:id", updateTags);
