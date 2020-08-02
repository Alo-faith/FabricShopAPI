const express = require("express");

// Controllers
const {
  shopCreate,
  shopList,
  shopUpdate,
  shopDelete,
  feachShop,
  fabricCreate,
} = require("../controllers/shopController");

// Middleware
const upload = require("../middleware/multer");

const router = express.Router();

router.param("shopId", async (req, res, next, shopId) => {
  const shop = await feachShop(shopId, next);

  if (shop) {
    req.shop = shop;
    next();
  } else {
    const err = new Error("Shop not found");
    err.status = 404;
    next(err);
  }
});

// List
router.get("/", shopList);

// Create
router.post("/", upload.single("image"), shopCreate);

// Delete
router.delete("/:shopId", shopDelete);

// Update
router.put("/:shopId", upload.single("image"), shopUpdate);

// Create Fabric
router.post("/:shopId/fabrics", upload.single("image"), fabricCreate);

module.exports = router;
