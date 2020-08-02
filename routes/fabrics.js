const express = require("express");

// Controllers
const {
  fabricList,
  fabricUpdate,
  fabricDelete,
  feachFabric,
} = require("../controllers/fabricController");

// Middleware
const upload = require("../middleware/multer");

const router = express.Router();

router.param("fabricId", async (req, res, next, fabricId) => {
  const fabric = await feachFabric(fabricId, next);

  if (fabric) {
    req.fabric = fabric;
    next();
  } else {
    const err = new Error("Fabric not found");
    err.status = 404;
    next(err);
  }
});

// List
router.get("/", fabricList);

// Delete
router.delete("/:fabricId", fabricDelete);

// Update
router.put("/:fabricId", upload.single("image"), fabricUpdate);

module.exports = router;
