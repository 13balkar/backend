const { collection } = require('../../database/models');

const getCollectionEntries = async (collection_name) => {
  const collections = await collection.findAll({ where: { collection_name }, attributes: ['entries'] });
  if (collection === null)
    return [];
  return collections;
};

const addCollectionEntity = async (collection_name, entryData) => {
  const createdCollection = await collection.create({ collection_name, entries: entryData });
  return createdCollection;
};

module.exports = { getCollectionEntries, addCollectionEntity };