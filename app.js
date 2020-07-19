const express = require("express");
const fabics = require("./fabrics");

const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

app.get("/fabrics", (req, res) => {
  res.json(fabics);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
