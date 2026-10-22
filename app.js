//mis importaciones
import express from "express";

import "dotenv/config";
import { startDataBase } from "./src/config/database.js";
import { UserModel } from "./src/models/user.model.js";
import { TaskModel } from "./src/models/tasks.model.js";
import { ProfileModel } from "./src/models/profile.model.js";
import { TagModel } from "./src/models/tag.model.js";
import { UserRouter } from "./src/routes/users.routes.js";
import { tasksRouter } from "./src/routes/tasks.routes.js";
import { profileRouter } from "./src/routes/profile.routes.js";
import { tagRouter } from "./src/routes/tag.routes.js";
//
const app = express();
//mi puerto
const PORT = process.env.PORT;

// mis rutas
app.use(express.json());
app.use("/api/", UserRouter);
app.use("/api/", tasksRouter);
app.use("/api/", tagRouter);
app.use("/api/", profileRouter);

app.listen(PORT, async () => {
  await startDataBase();
  console.log("servidor andando");
  console.log(`servidor http://localhost:${PORT}`);
});
