const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "Eman1234",
  database: "fabricshop_db",
  dialect: "postgres",
  host: "localhost",
});

module.exports = db;
