const httpErrors = require('../../errors/httpErrors');
const contentService = require('../services/contentServices');
const collectionService = require('../services/collectionServices');

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
    const columnNames = columnArray.map((column) => column.name);
    const content = await contentService.addField(columnArray, content_name);
    await collectionService.addColumns(columnNames, content_name);
    res.status(200).send(content);
    // res.status(200).send({ 'message': 'Field added successfully' });
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
    await collectionService.deleteColumns(columnNames, content_name);
    // res.status(200).send({ 'message': 'Field deleted successfully' });
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
    // console.log(content_name, newContentName);
    const content = await contentService.changeName(content_name, newContentName);
    await collectionService.changeName(content_name, newContentName);
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