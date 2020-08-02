const express = require("express");

// cos
const cors = require("cors");

// body
const bodyParser = require("body-parser");

// db
const db = require("./db");

const { Fabric } = require("./db/models");
const { Shop } = require("./db/models");

// Route
const shopRoutes = require("./routes/shops");
const fabricRoutes = require("./routes/fabrics");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/shops", shopRoutes);
app.use("/fabrics", fabricRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

// Not found path
app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});

// Error Handling Middlewae
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message || " Internal Server Error");
});

const run = async () => {
  try {
    await db.sync();
    // await db.sync({ force: true }); empty db
    // await db.sync({ alter: true });
    // console.log("Connection to the database successful!");
    // const fabrics = await Fabric.findAll();
    // fabrics.forEach((fabric) => console.log(fabric.toJSON()));
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
