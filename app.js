const express = require("express");

const cors = require("cors");
let fabrics = require("./fabrics");

const app = express();
app.use(cors());

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

app.listen(8000, () => {
  console.log("The aplication is runing on localhost:8000");
});
