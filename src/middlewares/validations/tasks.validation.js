import { body, param } from "express-validator";
import { isValidObjectId } from "mongoose";
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
//relacion N:M: valido que existan la task y la tag, y que el vinculo no este repetido
export const addTagValidation = [
  param("id")
    .isMongoId()
    .withMessage("el id de la task debe ser valido")
    .bail()
    .custom(async (id) => {
      const taskExiste = await TaskModel.findOne({ _id: id, isActive: true });
      if (!taskExiste) {
        throw new Error("la task no existe");
      }
    }),
  param("tagId")
    .isMongoId()
    .withMessage("el id de la tag debe ser valido")
    .bail()
    .custom(async (tagId) => {
      const tagExiste = await TagModel.findOne({ _id: tagId, isActive: true });
      if (!tagExiste) {
        throw new Error("la tag no existe");
      }
    })
    .bail()
    .custom(async (tagId, { req }) => {
      //si el id de la task es invalido ya lo avisa la validacion de arriba
      if (!isValidObjectId(req.params.id)) return;
      const yaLaTiene = await TaskModel.findOne({
        _id: req.params.id,
        tags: tagId,
      });
      if (yaLaTiene) {
        throw new Error("la task ya tiene esa tag");
      }
    }),
];
export const deleteTasksValidation = [
  param("id")
    .isMongoId()
    .withMessage("el id debe ser valido")
    .bail()
    .custom(async (id) => {
      const idExiste = await TaskModel.findOne({ _id: id, isActive: true });
      if (!idExiste) {
        throw new Error("el id que quieres borrar no existe ");
      }
    }),
];
export const updateTasksValidation = [
  param("id").isMongoId().withMessage("el id debe ser valido").bail(),
  body("title")
    .optional()
    .notEmpty()
    .withMessage("el title es obligatorio")
    .bail(),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("la description debe ser obligatorio"),
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
