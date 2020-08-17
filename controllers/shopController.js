// Data
let fabrics = require("../fabrics");
const { Shop, Fabric } = require("../db/models");

// slug
const slugify = require("slugify");

// List
exports.shopList = async (req, res, next) => {
  try {
    const shops = await Shop.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Fabric,
          as: "fabrics",
          attributes: ["id"],
        },
      ],
    });

    res.json(shops);
  } catch (error) {
    next(error);
  }
};

exports.fetchShop = async (shopId, next) => {
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
    const foundShop = await Shop.findOne({ where: { userId: req.user.id } });

    if (foundShop) {
      const err = new Error("you already have a shop");

      err.status = 403;
      return next(err);
    }

    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    req.body.userId = req.user.id;
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

//   Delete
exports.shopDelete = async (req, res, next) => {
  try {
    console.log(req.shop);
    if (req.user.role === "admin" || req.user.id === req.shop.userId) {
      await req.shop.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Unauthoized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

// Update
exports.shopUpdate = async (req, res, next) => {
  try {
    if (req.user.role === "admin" || req.user.id === req.shop.userId) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }

      await req.shop.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Unauthoized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

//   Create Fabric
exports.fabricCreate = async (req, res, next) => {
  try {
    if (req.user.id === req.shop.userId) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }
      req.body.shopId = req.shop.id;
      const newFabric = await Fabric.create(req.body);
      res.status(201).json(newFabric);
    } else {
      const err = new Error("Unauthoized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
