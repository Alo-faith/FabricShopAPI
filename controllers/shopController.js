// Data
let fabrics = require("../fabrics");
const { Shop, Fabric } = require("../db/models");

// slug
const slugify = require("slugify");
const { _attributes } = require("../db");

// List
exports.shopList = async (req, res) => {
  try {
    const shops = await Shop.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Fabric,
          as: "fabrics",
          // attributes: { exclude: ["createdAt", "updatedAt"] },
          attributes: ["id"],
        },
      ],
    });

    res.json(shops);
  } catch (eor) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

exports.feachShop = async (shopId, next) => {
  try {
    const shop = await Shop.findByPk(shopId);
    return shop;
  } catch (error) {
    next(error);
  }
};

//   Create
exports.shopCreate = async (req, res, next) => {
  try {
    if (req.file) {
      // console.log("exports.fabricCreate=> req.body", req);
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

//   Delete
exports.shopDelete = async (req, res, next) => {
  try {
    await req.shop.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

// Update
exports.shopUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }

    await req.shop.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

//   Create Fabric
exports.fabricCreate = async (req, res, next) => {
  try {
    if (req.file) {
      // console.log("exports.fabricCreate=> req.body", req);
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    req.body.shopId = req.shop.id;
    const newFabric = await Fabric.create(req.body);
    res.status(201).json(newFabric);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};
