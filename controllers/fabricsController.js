// Data
let fabrics = require("../fabrics");

// slug
const slugify = require("slugify");

// List
exports.fabricList = (req, res) => {
  res.json(fabrics);
};

//   Create
exports.fabricCreate = (req, res) => {
  const id = fabrics[fabrics.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newFabric = { id, slug, ...req.body };
  fabrics.push(newFabric);
  res.status(201).json(newFabric);
};

//   Delete
exports.fabricDelete = (req, res) => {
  const { fabricsId } = req.params;
  const found = fabrics.find((fabric) => fabric.id === +fabricsId);

  if (found) {
    fabrics = fabrics.filter((fabric) => fabric.id !== +fabricsId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Item not found" });
  }
};

// Update
exports.fabricUpdate = (req, res) => {
  const { fabricsId } = req.params;
  const found = fabrics.find((fabric) => fabric.id === +fabricsId);

  if (found) {
    for (const key in req.body) found[key] = req.body[key];

    res.status(204).end();
  } else {
    res.status(404).json({ message: "Item not found" });
  }
};
