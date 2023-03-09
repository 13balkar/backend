const httpErrors = require('../../errors/httpErrors');
const contentService = require('../services/contentServices');

const addContent = async (req, res) => {
  try {
    const { content_name, columns } = req.body;
    const content = await contentService.addContent(content_name, columns);
    res.status(201).send(content);
  } catch (err) {
    if (err instanceof httpErrors) {
      res.status(err.code).send({ 'message': err.message });
    }
    else {
      res.status(500).send({ 'message': 'Internal server error.' });
    }
  }
};

const getAllContents = async (req, res) => {
  try {
    const contents = await contentService.getAllContents();
    res.status(200).send(contents);
  } catch (err) {
    if (err instanceof httpErrors) {
      res.status(err.code).send({ 'message': err.message });
    }
    else {
      res.status(500).send({ 'message': 'Internal server error.' });
    }
  }
};

const getContentByName = async (req, res) => {
  try {
    const { content_name } = req.params;
    const content = await contentService.getContentByName(content_name);
    res.status(200).send(content);
  } catch (err) {
    if (err instanceof httpErrors) {
      res.status(err.code).send({ 'message': err.message });
    }
    else {
      res.status(500).send({ 'message': 'Internal server error.' });
    }
  }
};

const addField = async (req, res) => {
  try {
    const { columnArray } = req.body;
    const { content_name } = req.params;
    const content = await contentService.addField(columnArray, content_name);
    res.status(200).send(content);
  } catch (err) {
    if (err instanceof httpErrors) {
      res.status(err.code).send({ 'message': err.message });
    }
    else {
      res.status(500).send({ 'message': 'Internal server error.' });
    }
  }
};

const deleteField = async (req, res) => {
  try {
    const { columnNames } = req.body;
    const { content_name } = req.params;
    const content = await contentService.deleteField(columnNames, content_name);
    res.status(200).send(content);
  } catch (err) {
    if (err instanceof httpErrors) {
      res.status(err.code).send({ 'message': err.message });
    }
    else {
      res.status(500).send({ 'message': 'Internal server error.' });
    }
  }
};

const updateField = async (req, res) => {
  try {
    const { columnArray } = req.body;
    const { content_name } = req.params;
    const content = await contentService.updateField(columnArray, content_name);
    res.status(200).send(content);
  } catch (err) {
    if (err instanceof httpErrors) {
      res.status(err.code).send({ 'message': err.message });
    }
    else {
      res.status(500).send({ 'message': 'Internal server error.' });
    }
  }
};

const changeName = async (req, res) => {
  try {
    const { content_name } = req.params;
    const { newContentName } = req.body;
    console.log(content_name, newContentName);
    const content = await contentService.changeName(content_name, newContentName);
    res.status(200).send(content);
  } catch (err) {
    if (err instanceof httpErrors) {
      res.status(err.code).send({ 'message': err.message });
    }
    else {
      res.status(500).send({ 'message': 'Internal server error.' });
    }
  }
};

module.exports = { addContent, getAllContents, getContentByName, addField, deleteField, updateField, changeName };