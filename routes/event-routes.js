const express = require("express");
const eventController = require("../controllers/event-controller");

const router = express.Router();

// Find event by ID
router.get("/events/:id", eventController.findById);

// Get all events
router
  .route("/events/")
  .get(eventController.getAll)
  .post(eventController.create);

// Update event by ID
router.put("/events/:id", eventController.update);

// Delete an event
router.delete("/events/:id", eventController.delete);

// Get free entrance events
router.get("/events/filter/free", eventController.getAllFreeEvents);

module.exports = router;
