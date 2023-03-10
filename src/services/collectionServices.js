const { collection } = require('../../database/models');
// const httpErrors = require('../../errors/httpErrors');

const getCollectionEntries = async (collection_name) => {
  // const collections = await collection.findAll({ where: { collection_name }, attributes: ['entries'] });
  const collections = await collection.findAll({ where: { collection_name } });
  if (collection === null)
    return [];
  return collections;
};

const getCollections = async () => {
  const collections = await collection.findAll();
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

const addColumns = async (columnNames, collection_name) => {
  const entries = await collection.findAll({ where: { collection_name } });
  for (let i = 0; i < entries.length; i++) {
    let id = entries[i].id;
    let entriesData = entries[i].entries;
    for (let j = 0; j < columnNames.length; j++) {
      entriesData[columnNames[j]] = '';
    }
    await collection.update({ entries: entriesData }, { where: { collection_name, id } });
  }
  return { 'message': 'Field added successfully' };
};

const changeName = async (collection_name, newContentName) => {
  const updatedCollection = await collection.update({ collection_name: newContentName }, { where: { collection_name } });
  return { updatedCollection, 'message': 'Collection name updated successfully.' };
};

const deleteColumns = async (columnNames, collection_name) => {
  const entries = await collection.findAll({ where: { collection_name } });
  for (let i = 0; i < entries.length; i++) {
    let id = entries[i].id;
    let entriesData = entries[i].entries;
    for (let j = 0; j < columnNames.length; j++) {
      delete entriesData[columnNames[j]];
    }
    await collection.update({ entries: entriesData }, { where: { collection_name, id } });
  }
  return { 'message': 'Field deleted successfully' };
};

module.exports = { getCollectionEntries, addCollectionEntity, deleteCollectionEntity, updateCollectionEntity, addColumns, changeName, deleteColumns, getCollections };