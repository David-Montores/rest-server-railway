const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usersPath = "/api/users";

    this.midlewares();
    this.routes();
  }

  midlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/users.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Aplicacion corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
