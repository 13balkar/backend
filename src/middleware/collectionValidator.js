const Joi = require('joi');

const GetCollectionEntriesSchema = Joi.object({
  collection_name: Joi.string().required()
});

const validateGetCollectionEntries = (req, res, next) => {
  const { error } = GetCollectionEntriesSchema.validate(req.params);
  if (error) {
    res.status(400).send({ 'message': error.details[0].message });
  } else {
    next();
  }
};

module.exports = { validateGetCollectionEntries };