const Joi = require('joi');

const eventSchema = Joi.object({
  title: Joi.string().required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
});

module.exports = eventSchema;