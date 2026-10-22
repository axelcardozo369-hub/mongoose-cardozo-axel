import { Router } from "express";
import {
  agregateTags,
  deleteTags,
  getAllTags,
  getIdTags,
  updateTags,
} from "../controllers/tag.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  agregateTagValidation,
  deleteTagValidation,
  updateTagValidation,
} from "../middlewares/validations/tag.validation.js";

export const tagRouter = Router();

tagRouter.post("/tags", agregateTagValidation, validate, agregateTags);
tagRouter.get("/tags", getAllTags);
tagRouter.get("/tags/:id", getIdTags);
tagRouter.delete("/tags/:id", deleteTagValidation, validate, deleteTags);
tagRouter.put("/tags/:id", updateTagValidation, validate, updateTags);
