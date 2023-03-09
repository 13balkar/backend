const Joi = require('joi');
const postContentSchema = Joi.object({
  content_name: Joi.string().required(),
  columns: Joi.array().items(Joi.object(
    {
      name: Joi.string().required(),
      type: Joi.string().required()
    }
  )).required(),
});
const postContentValidator = (req, res, next) => {
  const { error } = postContentSchema.validate(req.body);
  if (error) {
    res.status(400).send({ 'message': error.details[0].message });
  } else {
    next();
  }
};

module.exports = { postContentValidator };