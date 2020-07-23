// Data
let fabrics = require("../fabrics");
const { Fabric } = require("../db/models");

// slug
const slugify = require("slugify");
const { _attributes } = require("../db");

// List
exports.fabricList = async (req, res) => {
  try {
    const fabrics = await Fabric.findAll();

    res.json(fabrics);
  } catch (eor) {
    res.status(500).json({ message: error.message });
  }
};

//   Create
exports.fabricCreate = async (req, res) => {
  try {
    const newFabric = await Fabric.create(req.body);
    res.status(201).json(newFabric);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//   Delete
exports.fabricDelete = async (req, res) => {
  const { fabricsId } = req.params;
  try {
    const foundFabric = await Fabric.findByPk(fabricsId);
    if (foundFabric) {
      await foundFabric.destroy();

      res.status(204).end();
    } else {
      res.status(404).json({ message: "Fabric not found" });
    }
  } catch {
    res.status(500).json({ message: error.message });
  }
};

// Update
exports.fabricUpdate = async (req, res) => {
  const { fabricsId } = req.params;
  try {
    const foundFabric = await Fabric.findByPk(fabricsId);
    if (foundFabric) {
      await foundFabric.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Fabric not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
