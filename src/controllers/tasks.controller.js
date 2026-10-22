import { matchedData } from "express-validator";
import { TaskModel } from "../models/tasks.model.js";
export const getAllTasks = async (req, res) => {
  try {
    const Tasks = await TaskModel.find();
    return res
      .status(200)
      .json({ message: "estos son todos los Tasks", data: Tasks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
export const getIdtasks = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findById(id);
    return res.status(200).json({ message: "task encontrada ", data: task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
export const agregateTasks = async (req, res) => {
  try {
    const validationData = matchedData(req, { locations: ["body"] });
    const newTasks = await TaskModel.create(validationData);
    return res
      .status(201)
      .json({ message: "task agregado con exito ", data: newTasks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
export const deleteTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await TaskModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: "task borrado con exito", data: deleteTask });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
export const updateTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const validationData = matchedData(req, { locations: ["body"] });
    const taskUpdate = await TaskModel.findByIdAndUpdate(id, validationData, {
      returnDocument: "after",
    });
    return res
      .status(200)
      .json({ message: "task actualizada", data: taskUpdate });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
