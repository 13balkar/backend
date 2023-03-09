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

const getContentByNameSchema = Joi.object({
  content_name: Joi.string().required()
});
const getContentByNameValidator = (req, res, next) => {
  const { error } = getContentByNameSchema.validate(req.params);
  if (error) {
    res.status(400).send({ 'message': error.details[0].message });
  } else {
    next();
  }
};

const changeNameSchema = Joi.object({
  content_name: Joi.string().required(),
  newContentName: Joi.string().required()
});
const changeNameValidator = (req, res, next) => {
  const { error } = changeNameSchema.validate(req.body);
  if (error) {
    res.status(400).send({ 'message': error.details[0].message });
  } else {
    next();
  }
};

const addFieldSchema = Joi.object({
  columnArray: Joi.array().items(Joi.object(
    {
      name: Joi.string().required(),
      type: Joi.string().required()
    }
  )).required()
});
const addFieldValidator = (req, res, next) => {
  const { error } = addFieldSchema.validate(req.body);
  if (error) {
    res.status(400).send({ 'message': error.details[0].message });
  } else {
    next();
  }
};

const updateFieldSchema = Joi.object({
  columnArray: Joi.array().items(Joi.object(
    {
      oldName: Joi.string().required(),
      newName: Joi.string().required()
    }
  )).required()
});
const updateFieldValidator = (req, res, next) => {
  const { error } = updateFieldSchema.validate(req.body);
  if (error) {
    res.status(400).send({ 'message': error.details[0].message });
  } else {
    next();
  }
};

const deleteFieldSchema = Joi.object({
  columnNames: Joi.array().items(
    Joi.string().required()
  ).required()
});
const deleteFieldValidator = (req, res, next) => {
  const { error } = deleteFieldSchema.validate(req.body);
  if (error) {
    res.status(400).send({ 'message': error.details[0].message });
  } else {
    next();
  }
};

module.exports = { postContentValidator, getContentByNameValidator, changeNameValidator, addFieldValidator, updateFieldValidator, deleteFieldValidator };