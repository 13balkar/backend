const httpErrors = require('../../errors/httpErrors');
const collectionService = require('../services/collectionServices');

const getCollectionEntries = async (req, res) => {
  try {
    const { collection_name } = req.params;
    const collection = await collectionService.getCollectionEntries(collection_name);
    res.status(200).send(collection);
  } catch (err) {
    if (err instanceof httpErrors) {
      res.status(err.code).send({ 'message': err.message });
    }
    else {
      res.status(500).send({ 'message': 'Internal server error.' });
    }
  }
};

const addCollectionEntity = async (req, res) => {
  try {
    const { collection_name } = req.params;
    const { entryData } = req.body;
    const collection = await collectionService.addCollectionEntity(collection_name, entryData);
    res.status(200).send(collection);
  } catch (err) {
    if (err instanceof httpErrors) {
      res.status(err.code).send({ 'message': err.message });
    }
    else {
      res.status(500).send({ 'message': 'Internal server error.' });
    }
  }
};

module.exports = { getCollectionEntries, addCollectionEntity };