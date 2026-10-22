import mongoose, { connect } from "mongoose";

export const startDataBase = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`);
    await mongoose.connection.dropCollection("users");
    // await mongoose.connection.dropDatabase();
    console.log("conexion con mongo con exito ");
  } catch (error) {
    return res.status(500).json({
      message: "error al conectar con la base de datos ",
      error: error.message,
    });
  }
};
