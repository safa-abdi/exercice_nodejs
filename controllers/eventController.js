const Joi = require('joi');
const eventSchema = require('../models/eventSchema');

// Middleware de validation Joi pour la création d'événement
const validateEvent = (req, res, next) => {
  const { error, value } = eventSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Ajouter les données validées au req.body
  req.body = value;

  next();
};

// Méthode pour créer un événement
const createEvent = (req, res) => {
  const createdEvent = req.body;

  res.status(201).json({ message: 'Événement créé avec succès', event: createdEvent });
};

module.exports = {
  validateEvent,
  createEvent,
};