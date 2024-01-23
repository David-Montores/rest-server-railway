const { Router } = require("express");
const {
  usersGet,
  usersPost,
  usersPut,
} = require("../controllers/users.controller");

const router = Router();

router.get("/", usersGet);

router.post("/", usersPost);

router.put("/:id", usersPut);

module.exports = router;
