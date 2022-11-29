const { response } = require("express");
const db = require("../model");

const yourEvent = db.event;

// CREATE and SAVE an event
exports.create = (req, res) => {
  // Validate request
  if (!req.body.location) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  // CREATE an event
  const newEvent = {
    event: req.body.event,
    location: req.body.location,
    guest: req.body.guest,
    date: req.body.date,
    hour: req.body.hour,
    duration: req.body.duration,
    price: req.body.price,
    free: req.body.free,
    tel: req.body.tel,
  };
  // SAVE an event in the database
  yourEvent
    .create(newEvent)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the Event",
      });
    });
};

// GET ALL events from the database
exports.getAll = (req, res) => {
  yourEvent
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving the books",
      });
    });
};

// FIND an event with an specific ID
exports.findById = (req, res) => {
  const id = req.params.id;
  yourEvent
    .findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: `Not found the Event with the ${id}` });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Error retrieving the EVENT with id ${id}` });
    });
};

// Update an Event by the id in the request

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty",
    });
  }
  const id = req.params.id;

  yourEvent
    .findByIdAndUpdate(id, req.body, { useFindandModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Can not update the Event with id ${id}. Event not found`,
        });
      } else res.send({ message: "The Event was updated successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating the Event with id ${id}`,
      });
    });
};

// Delete an Event with an specific ID in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  yourEvent
    .findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Can not delete the Event with id ${id}. Event not found`,
        });
      } else {
        res.send({
          message: "The Event was deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not found the Event with id ${id}`,
      });
    });
};

// Get all free Events
exports.getAllFreeEvents = (request, response) => {
  yourEvent
    .find({ free: true })
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving the bestsellers books.",
      });
    });
};
