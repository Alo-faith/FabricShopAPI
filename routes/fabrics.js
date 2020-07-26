const express = require("express");
const router = express.Router();

const {
  fabricCreate,
  fabricList,
  fabricUpdate,
  fabricDelete,
  feachFabric,
} = require("../controllers/fabricsController");

router.param("fabricsId", async (req, res, next, fabricId) => {
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

// Create
router.post("/", fabricCreate);

// Delete
router.delete("/:fabricsId", fabricDelete);

// Update
router.put("/:fabricsId", fabricUpdate);

module.exports = router;
