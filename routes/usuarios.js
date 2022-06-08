const { Router } = require("express");
const { check } = require("express-validator");
const {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),

    check("password", "El password debe ser de más de 6 letras").isLength({
      min: 6,
    }),
    check("correo").custom(emailExiste),
    // check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),

    check("rol").custom(esRolValido),
  ],
  validarCampos,
  usuariosPost
);

router.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),

    validarCampos,
  ],
  usuariosDelete
);

router.patch("/", usuariosPatch);

module.exports = router;
