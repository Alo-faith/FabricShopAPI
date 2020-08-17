// Data

const { Fabric, Shop } = require("../db/models");

// slug
const slugify = require("slugify");

// List
exports.fabricList = async (req, res, next) => {
  try {
    const fabrics = await Fabric.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "shopId"] },

      include: {
        model: Shop,
        as: "shop",
        attributes: ["name"],
      },
    });

    res.json(fabrics);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

exports.fetchFabric = async (fabricId, next) => {
  try {
    const fabric = await Fabric.findByPk(fabricId);
    return fabric;
  } catch (error) {
    next(error);
  }
};

//   Delete
exports.fabricDelete = async (req, res, next) => {
  try {
    await req.fabric.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

// Update
exports.fabricUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }

    await req.fabric.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
