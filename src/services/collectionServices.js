const { collection } = require('../../database/models');

const getCollectionEntries = async (collection_name) => {
  // const collections = await collection.findAll({ where: { collection_name }, attributes: ['entries'] });
  const collections = await collection.findAll({ where: { collection_name } });
  if (collection === null)
    return [];
  return collections;
};

const addCollectionEntity = async (collection_name, entryData) => {
  const createdCollection = await collection.create({ collection_name, entries: entryData });
  return createdCollection;
};

const deleteCollectionEntity = async (collection_name, entity_id) => {
  const deletedCollection = await collection.destroy({ where: { collection_name, id: entity_id } });
  return { deletedCollection, 'message': 'Collection entity deleted successfully.' };

};

const updateCollectionEntity = async (collection_name, entity_id, entryData) => {
  const updatedCollection = await collection.update({ entries: entryData }, { where: { collection_name, id: entity_id } });
  return { updatedCollection, 'message': 'Collection entity updated successfully.' };
};

module.exports = { getCollectionEntries, addCollectionEntity, deleteCollectionEntity, updateCollectionEntity };