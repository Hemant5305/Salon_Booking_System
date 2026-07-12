const express = require("express");
const {
  getServices,
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getServices);
router.get("/admin/all", protect, admin, getAllServicesAdmin);
router.post("/", protect, admin, createService);
router.put("/:id", protect, admin, updateService);
router.delete("/:id", protect, admin, deleteService);

module.exports = router;
