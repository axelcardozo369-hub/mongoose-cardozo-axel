import { body, param } from "express-validator";
import { ProfileModel } from "../../models/profile.model.js";
import { UserModel } from "../../models/user.model.js";

export const agregateProfileValidation = [
  body("biography")
    .notEmpty()
    .withMessage("la biography debe ser obligatoria")
    .bail(),
  body("address").notEmpty().withMessage("el address es obligatorio").bail(),
  body("address.city")
    .notEmpty()
    .withMessage("la ciudad es obligatoria")
    .bail()
    .isString()
    .withMessage("solo se permite texto"),
  body("address.province")
    .bail()
    .notEmpty()
    .withMessage("la provincia es obligatoria")
    .isString()
    .withMessage("solo se permite texto"),
  body("user")
    .notEmpty()
    .withMessage("el user es obligatorio")
    .bail()
    .isMongoId()
    .withMessage("el id del usuario debe ser valido")
    .bail()
    .custom(async (id) => {
      const userExiste = await UserModel.findOne({ _id: id });
      if (!userExiste) {
        throw new Error("no existe el usuario, no se puede crear perfil");
      }
      const profileExiste = await ProfileModel.findOne({ user: id });
      if (profileExiste) {
        throw new Error("este usuario ya tiene perfil ");
      }
    }),
];
export const deleteProfileValidation = [
  param("id")
    .isMongoId()
    .withMessage("el id debe ser valido")
    .bail()
    .custom(async (idProfile) => {
      const profileExiste = await ProfileModel.findOne({ _id: idProfile });
      if (!profileExiste) {
        throw new Error("el perfil no existe");
      }
    }),
];
export const updateProfileValidation = [
  param("id")
    .isMongoId()
    .withMessage("el id debe ser valido")
    .custom(async (idExiste) => {
      const profileExiste = await ProfileModel.findOne({ _id: idExiste });
      if (!profileExiste) {
        throw new Error("el profile no existe");
      }
    }),
  body("biography")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("la biography no debe ser vacia")
    .bail(),
  body("address.city")
    .optional()
    .notEmpty()
    .withMessage("el lugar debe ser obligatorio")
    .bail(),
  body("address.province")
    .optional()
    .notEmpty()
    .withMessage("la provincia es obligatoria"),
];
