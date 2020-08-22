const express = require("express");
// cos
const cors = require("cors");
// body
const bodyParser = require("body-parser");
// db
const db = require("./db");

// passport
const passport = require("passport");

const { localStrategy } = require("./middleware/passport");
const { jwtStrategy } = require("./middleware/passport");

// Route
const shopRoutes = require("./routes/shops");
const fabricRoutes = require("./routes/fabrics");
const path = require("path");
const userRoutes = require("./routes/users");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Passport
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/shops", shopRoutes);
app.use("/fabrics", fabricRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(userRoutes);

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
