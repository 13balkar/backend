const express = require('express');
const collectionRouter = express.Router();
const { validateGetCollectionEntries, validateAddCollectionEntity, validateDeleteCollectionEntity, validateUpdateCollectionEntity } = require('../middleware/collectionValidator');
const { getCollectionEntries, addCollectionEntity, deleteCollectionEntity, updateCollectionEntity, getCollections } = require('../controllers/collectionController');

collectionRouter.get('/', getCollections);
collectionRouter.get('/:collection_name', validateGetCollectionEntries, getCollectionEntries);
collectionRouter.post('/:collection_name', validateAddCollectionEntity, addCollectionEntity);
collectionRouter.delete('/:collection_name/:entity_id', validateDeleteCollectionEntity, deleteCollectionEntity);
collectionRouter.put('/:collection_name/:entity_id', validateUpdateCollectionEntity, updateCollectionEntity);

module.exports = collectionRouter;