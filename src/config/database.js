import mongoose from "mongoose";

export const startDataBase = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log("conexion con mongo con exito ");
  } catch (error) {
    return res.status(500).json({
      message: "error al conectar con la base de datos ",
      error: error.message,
    });
  }
};
