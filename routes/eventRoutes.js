const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

// Route pour créer un événement
router.post('/events', eventController.validateEvent, eventController.createEvent);

module.exports = router;