import { Router } from "express";
import {
  agregateProfiles,
  deleteProfiles,
  getAllProfiles,
  getIdProfiles,
  updateProfiles,
} from "../controllers/profile.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  agregateProfileValidation,
  deleteProfileValidation,
  updateProfileValidation,
} from "../middlewares/validations/profile.validation.js";

export const profileRouter = Router();

profileRouter.post(
  "/profiles",
  agregateProfileValidation,
  validate,
  agregateProfiles,
);
profileRouter.get("/profiles", getAllProfiles);
profileRouter.get("/profiles/:id", getIdProfiles);
profileRouter.put(
  "/profiles/:id",
  updateProfileValidation,
  validate,
  updateProfiles,
);
profileRouter.delete(
  "/profiles/:id",
  deleteProfileValidation,
  validate,
  deleteProfiles,
);
