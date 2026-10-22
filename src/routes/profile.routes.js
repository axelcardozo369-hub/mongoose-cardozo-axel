import { Router } from "express";
import {
  agregateProfile,
  deleteProfile,
  getAllProfile,
  getIdProfile,
  updateProfile,
} from "../controllers/profile.controller.js";

export const profileRouter = Router();

profileRouter.post("/api/profiles", agregateProfile);
profileRouter.get("/api/profiles", getAllProfile);
profileRouter.get("/api/profiles/:id", getIdProfile);
profileRouter.put("/api/profiles/:id", updateProfile);
profileRouter.delete("/api/profiles/:id", deleteProfile);
