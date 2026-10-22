import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const agregateUsersValidation = [
  body("username")
    .notEmpty()
    .withMessage("el username no debe ser vacio")
    .bail(),
  body("email")
    .notEmpty()
    .withMessage("el email debe ser obligatorio")
    .bail()
    .isEmail()
    .withMessage("el email debe ser valido si o si ")
    .custom(async (email) => {
      const emailExiste = await UserModel.findOne({ email });
      if (emailExiste) {
        throw new Error(
          "el email que quieres ingresar ya esta en la base de datos",
        );
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("el password debe ser obligatorio")
    .isLength({ min: 8 })
    .withMessage("el password debe ser al menos de 8 digitos "),
];
export const deleteUsersValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el id debe se un numero positivo")
    .bail()
    .custom(async (id) => {
      const idExiste = await UserModel.findOne({ where: { id } });
      if (idExiste) {
        throw new Error("el id que quieres borrar no existe ");
      }
    }),
];
export const updateUsersValidation = [
  body("username")
    .optional()
    .notEmpty()
    .withMessage("el username no debe ser vacio")
    .bail(),
  body("email")
    .optional()
    .notEmpty()
    .withMessage("el email debe ser obligatorio")
    .bail()
    .isEmail()
    .withMessage("el email debe ser valido si o si "),
  body("password")
    .optional()
    .notEmpty()
    .withMessage("el password debe ser obligatorio")
    .isLength({ min: 8 })
    .withMessage("el password debe ser al menos de 8 digitos "),
  ,
];
