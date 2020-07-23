const express = require("express");

// cos
const cors = require("cors");

// body
const bodyParser = require("body-parser");

// db
const db = require("./db");

const { Fabric } = require("./db/models");

// Route
const fabricRoutes = require("./routes/fabrics");

const app = express();

const run = async () => {
  try {
    await db.sync();
    console.log("Connection to the database successful!");
    // const newFabric = await Fabric.create({ name: "LINEN LAVENHAM" });
    // console.log(newFabric.toJSON());
    const fabrics = await Fabric.findAll();
    fabrics.forEach((fabric) => console.log(fabric.toJSON()));
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
  app.use(cors());
  app.use(bodyParser.json());
  app.use("/fabrics", fabricRoutes);

  app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
