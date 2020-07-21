const express = require("express");

// cos
const cors = require("cors");

// body
const bodyParser = require("body-parser");

// Route
const fabricRoutes = require("./routes/fabrics");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/fabrics", fabricRoutes);

app.listen(8000, () => {
  console.log("The aplication is runing on localhost:8000");
});
