//mis importaciones
import express from "express";

import "dotenv/config";
import { startDataBase } from "./src/config/database.js";
import { UserModel } from "./src/models/user.model.js";

//
const app = express();
//mi puerto
const PORT = process.env.PORT;

// mis rutas
app.use(express.json());

app.listen(PORT, async () => {
  await startDataBase();
  console.log("servidor andando");
  console.log(`servidor http://localhost:${PORT}`);
});
