const { request, response } = require("express");

// Se iguala a request y response para tener la ayuda del autocompletado
const usersGet = (req = request, res = response) => {
  const { q, nombre = "No name", api_key, page = 1, limit } = req.query;

  res.status(200).json({
    msg: "Peticion Get - controller",
    q,
    nombre,
    api_key,
    page,
    limit,
  });
};

const usersPost = (req, res = response) => {
  const { name, edad } = req.body;

  res.status(201).json({
    msg: "Peticion Post - controller",
    nombre: name,
    edad: edad,
  });
};

const usersPut = (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    msg: "Peticion Put - controller",
    id,
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
};
