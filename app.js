const express = require("express");

// cos
const cors = require("cors");

// body
const bodyParser = require("body-parser");

// slug
const slugify = require("slugify");

// Data
let fabrics = require("./fabrics");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/fabrics", (req, res) => {
  res.json(fabrics);
});

app.delete("/fabrics/:fabricsId", (req, res) => {
  const { fabricsId } = req.params;
  const found = fabrics.find((fabric) => fabric.id === +fabricsId);

  if (found) {
    fabrics = fabrics.filter((fabric) => fabric.id !== +fabricsId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

app.post("/fabrics", (req, res) => {
  const id = fabrics[fabrics.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newFabric = { id, slug, ...req.body };
  fabrics.push(newFabric);
  res.status(201).json(newFabric);
});

app.listen(8000, () => {
  console.log("The aplication is runing on localhost:8000");
});
