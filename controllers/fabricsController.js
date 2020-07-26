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
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

exports.feachFabric = async (fabricsId, next) => {
  try {
    const fabric = await Fabric.findByPk(fabricsId);
    return fabric;
  } catch (error) {
    next(error);
  }
};

//   Create
exports.fabricCreate = async (req, res, next) => {
  try {
    const newFabric = await Fabric.create(req.body);
    res.status(201).json(newFabric);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

//   Delete
exports.fabricDelete = async (req, res, next) => {
  try {
    await req.fabric.destroy();
    res.status(204).end();
  } catch {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

// Update
exports.fabricUpdate = async (req, res, next) => {
  try {
    await req.fabric.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
