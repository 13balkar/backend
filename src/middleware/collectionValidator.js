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

const addCollectionEntitySchema = Joi.object({
  entryData: Joi.object().required()
});
const validateAddCollectionEntity = (req, res, next) => {
  const { error } = addCollectionEntitySchema.validate(req.body);
  if (error) {
    res.status(400).send({ 'message': error.details[0].message });
  } else {
    next();
  }
};

const deleteCollectionEntitySchema = Joi.object({
  collection_name: Joi.string().required(),
  entity_id: Joi.number().required()
});
const validateDeleteCollectionEntity = (req, res, next) => {
  const { error } = deleteCollectionEntitySchema.validate(req.params);
  if (error) {
    res.status(400).send({ 'message': error.details[0].message });
  } else {
    next();
  }
};

const validateUpdateCollectionEntity = (req, res, next) => {
  const { error } = addCollectionEntitySchema.validate(req.body);
  if (error) {
    res.status(400).send({ 'message': error.details[0].message });
  } else {
    const { error } = deleteCollectionEntitySchema.validate(req.params);
    if (error) {
      res.status(400).send({ 'message': error.details[0].message });
    } else {
      next();
    }
  }
};

module.exports = { validateGetCollectionEntries, validateAddCollectionEntity, validateDeleteCollectionEntity, validateUpdateCollectionEntity };