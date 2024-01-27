const { Router } = require("express");
const { check } = require("express-validator");

const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
} = require("../controllers/users.controller");
const { validateErrors } = require("../middlewares/validate-errors");
const { isValidRole, checkEmail, findId } = require("../helpers/validators-db");

const router = Router();

router.get("/", usersGet);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("email", "Este no es un email valido").isEmail(),
    check("email").custom(checkEmail),
    check("password", "La password debe de ser de minimo 6 letras").isLength({
      min: 6,
    }),
    // check("role", "No es un rol valido").isIn(["ADMIN_ROLE", "OTRO_ROLE"]),
    check("role").custom(isValidRole),
    validateErrors,
  ],
  usersPost
);

router.put(
  "/:id",
  [
    check("id", "No es un id valido de Mongo").isMongoId(),
    check("id").custom(findId),
    validateErrors,
  ],
  usersPut
);

router.delete(
  "/:id",
  [
    check("id", "No es un id valido de Mongo").isMongoId(),
    check("id").custom(findId),
    validateErrors,
  ],
  usersDelete
);

module.exports = router;
