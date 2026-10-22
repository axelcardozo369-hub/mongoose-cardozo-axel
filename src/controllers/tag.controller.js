import { matchedData } from "express-validator";
import { TagModel } from "../models/tag.model.js";
export const getAllTags = async (req, res) => {
  try {
    const Tags = await TagModel.find();
    return res
      .status(200)
      .json({ message: "estos son todos los Tagss", data: Tags });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
export const getIdTags = async (req, res) => {
  try {
    const { id } = req.params;
    const Tags = await TagModel.findById(id);
    return res.status(200).json({ message: "Tags encontrada ", data: Tags });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
export const agregateTags = async (req, res) => {
  try {
    const validationData = matchedData(req, { locations: ["body"] });
    const newTags = await TagModel.create(validationData);
    return res
      .status(201)
      .json({ message: "Tags agregado con exito ", data: newTags });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
export const deleteTags = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTags = await TagModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: "Tags borrado con exito", data: deleteTags });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
export const updateTags = async (req, res) => {
  try {
    const { id } = req.params;
    const validationData = matchedData(req, { locations: ["body"] });
    const TagsUpdate = await TagModel.findByIdAndUpdate(id, validationData, {
      returnDocument: "after",
    });
    return res
      .status(200)
      .json({ message: "Tags actualizada", data: TagsUpdate });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
