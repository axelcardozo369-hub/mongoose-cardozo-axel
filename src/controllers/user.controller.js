import { matchedData, validationResult } from "express-validator";
import { UserModel } from "../models/user.model.js";
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res
      .status(200)
      .json({ message: "estos son todos los users", data: users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
export const getIdUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    return res.status(200).json({ message: "user encontrado ", data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
export const agregateUsers = async (req, res) => {
  try {
    const validationData = matchedData(req, { locations: ["body"] });
    const newUser = await UserModel.create(validationData);
    return res
      .status(201)
      .json({ message: "user agregado con exito ", data: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
export const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await UserModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: "user borrado con exito", data: deleteUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
export const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const validationData = matchedData(req, { locations: ["body"] });
    const UserUpdate = await UserModel.findByIdAndUpdate(id, validationData, {
      returnDocument: "after",
    });
    return res
      .status(200)
      .json({ message: "user actualizado", data: UserUpdate });
    return res
      .status(200)
      .json({ message: "user actualizado con exito", data: updateUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
