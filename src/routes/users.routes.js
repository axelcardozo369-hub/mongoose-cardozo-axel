import { Router } from "express";
import {
  agregateUsers,
  deleteUsers,
  getAllUsers,
  getIdUsers,
  updateUsers,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  agregateUsersValidation,
  updateUsersValidation,
} from "../middlewares/validations/user.validation.js";

export const UserRouter = Router();

//Rutas para poder hacer mis inputs de usuarios
UserRouter.post("/users", agregateUsersValidation, validate, agregateUsers);
UserRouter.get("/users", getAllUsers);
UserRouter.get("/users/:id", getIdUsers);
UserRouter.put("/users/:id", updateUsersValidation, validate, updateUsers);
UserRouter.delete("/users/:id", deleteUsers);
