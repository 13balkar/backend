const { collection } = require('../../database/models');
const service = require('../../src/services/collectionServices');

describe('Collection Services', () => {
  describe('getCollectionEntries', () => {
    it('should return an array of entries', async () => {
      jest.spyOn(collection, 'findAll').mockResolvedValue([{ id: 1, collection_name: 'collection_name', entries: { 'name': 'John Doe', 'age': 25 } }]);
      const collectionEntries = await service.getCollectionEntries('collection_name');
      expect(collectionEntries).toEqual([{ id: 1, collection_name: 'collection_name', entries: { 'name': 'John Doe', 'age': 25 } }]);
    });
    it('should return an empty array if no entries are found', async () => {
      jest.spyOn(collection, 'findAll').mockResolvedValue([]);
      const collectionEntries = await service.getCollectionEntries('collection_name');
      expect(collectionEntries).toEqual([]);
    });
  });
  describe('getCollections', () => {
    it('should return an array of collections', async () => {
      jest.spyOn(collection, 'findAll').mockResolvedValue([{ id: 1, collection_name: 'collection_name', entries: { 'name': 'John Doe', 'age': 25 } }]);
      const collections = await service.getCollections();
      expect(collections).toEqual([{ id: 1, collection_name: 'collection_name', entries: { 'name': 'John Doe', 'age': 25 } }]);
    });
    it('should return an empty array if no collections are found', async () => {
      jest.spyOn(collection, 'findAll').mockResolvedValue([]);
      const collections = await service.getCollections();
      expect(collections).toEqual([]);
    });
  });
  describe('addCollectionEntity', () => {
    it('should add a collection entity', async () => {
      jest.spyOn(collection, 'create').mockResolvedValue({ id: 1, collection_name: 'collection_name', entries: { 'name': 'John Doe', 'age': 25 } });
      const collectionEntity = await service.addCollectionEntity('collection_name', { 'name': 'John Doe', 'age': 25 });
      expect(collectionEntity).toEqual({ id: 1, collection_name: 'collection_name', entries: { 'name': 'John Doe', 'age': 25 } });
    });
  });
  describe('deleteCollectionEntity', () => {
    it('should delete a collection entity', async () => {
      jest.spyOn(collection, 'destroy').mockResolvedValue(1);
      const collectionEntity = await service.deleteCollectionEntity('collection_name', 1);
      expect(collectionEntity).toEqual({ deletedCollection: 1, message: 'Collection entity deleted successfully.' });
    });
  });
  describe('updateCollectionEntity', () => {
    it('should update a collection entity', async () => {
      jest.spyOn(collection, 'update').mockResolvedValue([1]);
      const collectionEntity = await service.updateCollectionEntity('collection_name', 1, { 'name': 'John Doe', 'age': 25 });
      expect(collectionEntity).toEqual({ updatedCollection: [1], message: 'Collection entity updated successfully.' });
    });
  });
  describe('addColumns', () => {
    it('should add columns to a collection', async () => {
      jest.spyOn(collection, 'findAll').mockResolvedValue([{ id: 1, collection_name: 'collection_name', entries: { 'name': 'John Doe', 'age': 25 } }]);
      jest.spyOn(collection, 'update').mockResolvedValue([1]);
      const collectionEntity = await service.addColumns('collection_name', ['name', 'age']);
      expect(collectionEntity).toEqual({ 'message': 'Field added successfully' });
    });
  });
  describe('changeName', () => {
    it('should change the name of a collection', async () => {
      jest.spyOn(collection, 'update').mockResolvedValue([1]);
      const collectionEntity = await service.changeName('collection_name', 'new_collection_name');
      expect(collectionEntity).toEqual({ updatedCollection: [1], message: 'Collection name updated successfully.' });
    });
  });
  describe('deleteColumns', () => {
    it('should delete columns from a collection', async () => {
      jest.spyOn(collection, 'findAll').mockResolvedValue([{ id: 1, collection_name: 'collection_name', entries: { 'name': 'John Doe', 'age': 25 } }]);
      jest.spyOn(collection, 'update').mockResolvedValue([1]);
      const collectionEntity = await service.deleteColumns('collection_name', ['name']);
      expect(collectionEntity).toEqual({ 'message': 'Field deleted successfully' });
    });
  });
});