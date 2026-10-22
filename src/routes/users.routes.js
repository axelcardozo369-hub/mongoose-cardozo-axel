import { Router } from "express";
import {
  agregateUsers,
  deleteUsers,
  getAllUsers,
  getIdUsers,
  updateUsers,
} from "../controllers/user.controller.js";

export const UserRouter = Router();

//Rutas para poder hacer mis inputs de usuarios
UserRouter.post("/users", agregateUsers);
UserRouter.get("/users", getAllUsers);
UserRouter.get("/users/:id", getIdUsers);
UserRouter.put("/users/:id", updateUsers);
UserRouter.delete("/users/:id", deleteUsers);
