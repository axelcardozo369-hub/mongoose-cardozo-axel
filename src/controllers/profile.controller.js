import { matchedData } from "express-validator";
import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model.js";

export const getAllProfiles = async (req, res) => {
  try {
    const Profiles = await ProfileModel.find({ isActive: true }).populate(
      "user",
      "username email",
    );
    return res
      .status(200)
      .json({ message: "estos son todos los Profiles", data: Profiles });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const getIdProfiles = async (req, res) => {
  try {
    const { id } = req.params;
    const Profile = await ProfileModel.findOne({
      _id: id,
      isActive: true,
    }).populate("user", "username email");
    return res
      .status(200)
      .json({ message: "Profile encontrada ", data: Profile });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const agregateProfiles = async (req, res) => {
  try {
    const validationData = matchedData(req, { locations: ["body"] });
    const newProfile = await ProfileModel.create(validationData);
    await UserModel.findByIdAndUpdate(newProfile.user, {
      profile: newProfile._id,
    });
    return res
      .status(201)
      .json({ message: "Profile agregado con exito ", data: newProfile });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const deleteProfiles = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProfile = await ProfileModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { returnDocument: "after" },
    );

    return res
      .status(200)
      .json({ message: "Profile borrado con exito", data: deleteProfile });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const updateProfiles = async (req, res) => {
  try {
    const { id } = req.params;
    const validationData = matchedData(req, { locations: ["body"] });
    const ProfileUpdate = await ProfileModel.findByIdAndUpdate(
      id,
      validationData,
      {
        returnDocument: "after",
      },
    );
    return res
      .status(200)
      .json({ message: "Profile actualizada", data: ProfileUpdate });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
