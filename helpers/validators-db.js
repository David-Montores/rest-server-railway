const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`El rol ${role} no existe en la BD`);
  }
};

const checkEmail = async (email = "") => {
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error(`El email ${email} ya esta registrado`);
  }
};

const findId = async (id = "") => {
  const existId = await User.findById(id.trim());
  if (!existId) {
    throw new Error(`No existe el id: ${id} en la BD`);
  }
};

module.exports = { isValidRole, checkEmail, findId };
