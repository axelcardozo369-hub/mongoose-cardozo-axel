//mis importaciones
import express from "express";

import "dotenv/config";
import { startDataBase } from "./src/config/database.js";
import { UserModel } from "./src/models/user.model.js";
import { TaskModel } from "./src/models/tasks.model.js";
import { ProfileModel } from "./src/models/profile.model.js";
import { TagModel } from "./src/models/tag.model.js";
import { UserRouter } from "./src/routes/users.routes.js";
//
const app = express();
//mi puerto
const PORT = process.env.PORT;

// mis rutas
app.use(express.json());
app.use("/api/", UserRouter);
app.use("/api/", Router);
app.use("/api/", UserRouter);
app.use("/api/", UserRouter);

app.listen(PORT, async () => {
  await startDataBase();
  console.log("servidor andando");
  console.log(`servidor http://localhost:${PORT}`);
});
