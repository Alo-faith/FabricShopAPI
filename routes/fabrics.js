const express = require("express");
const router = express.Router();

const {
  fabricCreate,
  fabricList,
  fabricUpdate,
  fabricDelete,
} = require("../controllers/fabricsController");

// List
router.get("/", fabricList);

// Create
router.post("/", fabricCreate);

// Delete
router.delete("/:fabricsId", fabricDelete);

// Update
router.put("/:fabricsId", fabricUpdate);

module.exports = router;
