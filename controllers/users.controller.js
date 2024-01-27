const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// Se iguala a request y response para tener la ayuda del autocompletado
const usersGet = async (req = request, res = response) => {
  const { since = 0, limit = 5 } = req.query;
  const query = { state: true };

  // const total = await User.countDocuments(query);
  // const users = await User.find(query).skip(Number(since)).limit(Number(limit));

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(since)).limit(Number(limit)),
  ]);

  res.status(200).json({
    msg: "Peticion Get - controller",
    total,
    users,
  });
};

const usersPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encriptar password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  // Guardar en BD
  await user.save();

  res.status(201).json({
    msg: "Peticion Post - controller",
    user,
  });
};

const usersPut = async (req, res) => {
  const { id } = req.params;
  const { _id, google, email, password, ...body } = req.body;

  // Encriptar password
  const salt = bcrypt.genSaltSync();
  body.password = bcrypt.hashSync(password, salt);

  const user = await User.findByIdAndUpdate(id, body);

  res.status(200).json({
    msg: "Peticion Put - controller",
    user,
  });
};

const usersDelete = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { state: false });

  res.status(200).json({
    msg: "Peticion Delete - Controller",
    user,
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
};
