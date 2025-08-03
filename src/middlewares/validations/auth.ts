import { check } from "express-validator";
import { validateFields } from "../validateFields";

// Validaciones para crear usuario
export const createUserValidations = [
  check("name")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres"),

  check("email")
    .notEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("El email no es válido")
    .normalizeEmail(),

  check("password")
    .notEmpty()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  validateFields,
];

// Validaciones para login
export const loginValidations = [
  check("email")
    .notEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("El email no es válido")
    .normalizeEmail(),

  check("password").notEmpty().withMessage("La contraseña es requerida"),

  validateFields,
];
