import { check } from "express-validator";
import { validateFields } from "../validateFields";
import { isDate } from "../../helpers/isDate";

// Validaciones para crear evento
export const createEventValidations = [
  check("title").notEmpty().withMessage("El title es requerido"),

  check("start")
    .custom(isDate)
    .withMessage("El start debe ser una fecha válida"),

  check("end").custom(isDate).withMessage("El end debe ser una fecha válida"),

  validateFields,
];
