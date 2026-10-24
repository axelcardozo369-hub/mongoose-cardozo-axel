import { matchedData, validationResult } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { TaskModel } from "../models/tasks.model.js";
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ isActive: true })
      .select("-password")
      .populate({
        path: "profile",
        match: { isActive: true },
        select: "biography address",
      })
      .populate({
        path: "tasks",
        match: { isActive: true },
        select: "title description",
      });
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
    const user = await UserModel.findOne({ _id: id, isActive: true })
      .select("-password")
      .populate({
        path: "profile",
        match: { isActive: true },
        select: "biography address",
      })
      .populate({
        path: "tasks",
        match: { isActive: true },
        select: "title description tags",
        populate: { path: "tags", select: "name" },
      });
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
    //borro logicamente
    const deleteUser = await UserModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { returnDocument: "after" },
    );
    //borro en cascada lo que depende del user
    await ProfileModel.updateMany({ user: id }, { isActive: false });
    await TaskModel.updateMany({ owner: id }, { isActive: false });
    return res.status(200).json({
      message: "user borrado con exito junto con el perfil y tarea",
      data: deleteUser,
    });
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
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
