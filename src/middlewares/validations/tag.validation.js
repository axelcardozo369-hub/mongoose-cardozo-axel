import { body, param } from "express-validator";
import { TagModel } from "../../models/tag.model.js";

export const agregateTagValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("el name es obligatorio")
    .bail()
    .custom(async (name) => {
      const tagExiste = await TagModel.findOne({ name });
      if (tagExiste) {
        throw new Error("ya existe una tag con ese nombre");
      }
    }),
];
export const deleteTagValidation = [
  param("id")
    .isMongoId()
    .withMessage("el id debe ser valido")
    .bail()
    .custom(async (id) => {
      const tagExiste = await TagModel.findById(id);
      if (!tagExiste) {
        throw new Error("la tag que quieres borrar no existe");
      }
    }),
];
export const updateTagValidation = [
  param("id")
    .isMongoId()
    .withMessage("el id debe ser valido")
    .bail()
    .custom(async (id) => {
      const tagExiste = await TagModel.findById(id);
      if (!tagExiste) {
        throw new Error("la tag que quieres actualizar no existe");
      }
    }),
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("el name no debe ser vacio")
    .bail()
    .custom(async (name, { req }) => {
      const tagExiste = await TagModel.findOne({
        name,
        _id: { $ne: req.params.id },
      });
      if (tagExiste) {
        throw new Error("ya existe una tag con ese nombre");
      }
    }),
];
