const Joi = require('joi');

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  lastname : Joi.string().min(2).required(),
  firstname : Joi.string().min(2).required(),

});

const validateSignup = (req, res, next) => {
  const { error, value } = signupSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  req.body = value;
  next();
};

module.exports = validateSignup;