import { body, param } from "express-validator";
import { TaskModel } from "../../models/tasks.model.js";
import { UserModel } from "../../models/user.model.js";
import { TagModel } from "../../models/tag.model.js";
export const agregateTasksValidation = [
  body("title").notEmpty().withMessage("el title es obligatorio").bail(),
  body("description")
    .notEmpty()
    .withMessage("la description debe ser obligatorio")
    .bail(),
  body("owner")
    .notEmpty()
    .withMessage("el dueño debe ser obligatorio")
    .bail()
    .isMongoId()
    .withMessage("el id del user debe ser valido")
    .custom(async (id) => {
      const dueñoExiste = await UserModel.findOne({ _id: id });
      if (!dueñoExiste) {
        throw new Error("el id del dueño no existe");
      }
    }),
  body("tags")
    .notEmpty()
    .withMessage("las tags son obligatorias ")
    .bail()
    .isArray({ min: 1 })
    .withMessage("tag debe ser un arreglo con una etiqueta")
    .bail(),
  body("tags.*")
    .isMongoId()
    .withMessage("en cada tag tiene que ser un id valido")
    .bail()
    .custom(async (tagId) => {
      const tagExiste = await TagModel.findOne({ _id: tagId });
      if (!tagExiste) {
        throw new Error("el id de tag no existe");
      }
    }),
];
export const deleteTasksValidation = [
  param("id")
    .isMongoId()
    .withMessage("el id debe ser valido")
    .bail()
    .isMongoId()
    .withMessage("el id debe ser valido")
    .custom(async (id) => {
      const idExiste = await TagModel.findOne({ _id: id });
      if (!idExiste) {
        throw new Error("el id que quieres borrar no existe ");
      }
    }),
];
export const updateTasksValidation = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("el title es obligatorio")
    .bail(),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("la description debe ser obligatorio")
    .bail(),
  body("owner")
    .optional()
    .notEmpty()
    .withMessage("el dueño debe ser obligatorio")
    .bail()
    .isMongoId()
    .withMessage("el id del user debe ser valido")
    .custom(async (id) => {
      const dueñoExiste = await UserModel.findOne({ _id: id });
      if (!dueñoExiste) {
        throw new Error("el id del dueño no existe");
      }
    }),
  body("tags")
    .optional()
    .notEmpty()
    .withMessage("las tags son obligatorias ")
    .bail()
    .isArray({ min: 1 })
    .withMessage("tag debe ser un arreglo con una etiqueta")
    .bail(),
  body("tags.*")
    .optional()
    .isMongoId()
    .withMessage("en cada tag tiene que ser un id valido")
    .bail()
    .custom(async (tagId) => {
      const tagExiste = await TagModel.findOne({ _id: tagId });
      if (!tagExiste) {
        throw new Error("el id de tag no existe");
      }
    }),
];
