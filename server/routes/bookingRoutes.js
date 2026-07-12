const express = require("express");
const {
  createBooking,
  getMyBookings,
  cancelMyBooking,
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/mine", protect, getMyBookings);
router.put("/:id/cancel", protect, cancelMyBooking);
router.get("/admin/all", protect, admin, getAllBookings);
router.put("/:id/status", protect, admin, updateBookingStatus);

module.exports = router;
