const express = require('express');
const collectionRouter = express.Router();
const { validateGetCollectionEntries } = require('../middleware/collectionValidator');
const { getCollectionEntries, addCollectionEntity } = require('../controllers/collectionController');

collectionRouter.get('/:collection_name', validateGetCollectionEntries, getCollectionEntries);
collectionRouter.post('/:collection_name', addCollectionEntity);

module.exports = collectionRouter;