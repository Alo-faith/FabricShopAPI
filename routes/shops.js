const express = require("express");

// Controllers
const {
  shopCreate,
  shopList,
  shopUpdate,
  shopDelete,
  fetchShop,
  fabricCreate,
} = require("../controllers/shopController");

// Middleware
const upload = require("../middleware/multer");
const passport = require("passport");

const router = express.Router();

router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);
  console.log(shop);
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
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  shopCreate
);

// Delete
router.delete(
  "/:shopId",
  passport.authenticate("jwt", { session: false }),
  shopDelete
);

// Update
router.put(
  "/:shopId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  shopUpdate
);

// Create Fabric
router.post(
  "/:shopId/fabrics",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  fabricCreate
);

module.exports = router;
