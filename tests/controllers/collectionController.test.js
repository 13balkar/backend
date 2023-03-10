const controller = require('../../src/controllers/collectionController');
const httpErrors = require('../../errors/httpErrors');
const services = require('../../src/services/collectionServices');

describe('Collection Controller', () => {
  describe('getCollectionEntries', () => {
    it('should return 200 and collection entries', async () => {
      const req = { params: { collection_name: 'test' } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      jest.spyOn(services, 'getCollectionEntries').mockResolvedValue([{ id: 1, collection_name: 'test', entries: { a: 'a', b: 'b' } }]);
      await controller.getCollectionEntries(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith([{ id: 1, collection_name: 'test', entries: { a: 'a', b: 'b' } }]);
    });
    it('should return an empty array if no collection entries are found', async () => {
      const req = { params: { collection_name: 'test' } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      jest.spyOn(services, 'getCollectionEntries').mockResolvedValue([]);
      await controller.getCollectionEntries(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith([]);
    });
    it('should return 500 and internal server error when an error occurs at server side', async () => {
      const req = { params: { collection_name: 'test' } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      jest.spyOn(services, 'getCollectionEntries').mockRejectedValue(new Error('Internal server error'));
      await controller.getCollectionEntries(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'Internal server error.' });
    });
    it('should throw http errors in case of defined errors', async () => {
      const req = { params: { collection_name: 'test' } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      jest.spyOn(services, 'getCollectionEntries').mockRejectedValue(new httpErrors('Collection not found.', 404));
      await controller.getCollectionEntries(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Collection not found.' });
    });
  });
  describe('addCollectionEntity', () => {
    it('should return 200 and collection entries', async () => {
      const req = { params: { collection_name: 'test' }, body: { entryData: { a: 'a', b: 'b' } } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      jest.spyOn(services, 'addCollectionEntity').mockResolvedValue([{ id: 1, collection_name: 'test', entries: { a: 'a', b: 'b' } }]);
      await controller.addCollectionEntity(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith([{ id: 1, collection_name: 'test', entries: { a: 'a', b: 'b' } }]);
    });
    it('should return 500 and internal server error when an error occurs at server side', async () => {
      const req = { params: { collection_name: 'test' }, body: { entryData: { a: 'a', b: 'b' } } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      jest.spyOn(services, 'addCollectionEntity').mockRejectedValue(new Error('Internal server error'));
      await controller.addCollectionEntity(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'Internal server error.' });
    });
    it('should throw http errors in case of defined errors', async () => {
      const req = { params: { collection_name: 'test' }, body: { entryData: { a: 'a', b: 'b' } } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      jest.spyOn(services, 'addCollectionEntity').mockRejectedValue(new httpErrors('Collection entity already exists.', 409));
      await controller.addCollectionEntity(req, res);
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.send).toHaveBeenCalledWith({ message: 'Collection entity already exists.' });
    });
  });
  describe('deleteCollectionEntity', () => {
    it('should return 200 and collection entries', async () => {
      const req = { params: { collection_name: 'test', entity_id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      jest.spyOn(services, 'deleteCollectionEntity').mockResolvedValue({ message: 'Collection entity deleted successfully.' });
      await controller.deleteCollectionEntity(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Collection entity deleted successfully.' });
    });
    it('should return 500 and internal server error when an error occurs at server side', async () => {
      const req = { params: { collection_name: 'test', entity_id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      jest.spyOn(services, 'deleteCollectionEntity').mockRejectedValue(new Error('Internal server error'));
      await controller.deleteCollectionEntity(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'Internal server error.' });
    });
    it('should throw http errors in case of defined errors', async () => {
      const req = { params: { collection_name: 'test', entity_id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      jest.spyOn(services, 'deleteCollectionEntity').mockRejectedValue(new httpErrors('Collection entity not found.', 404));
      await controller.deleteCollectionEntity(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Collection entity not found.' });
    });
  });
  describe('updateCollectionEntity', () => {
    it('should return 200 and success message', async () => {
      const req = { params: { collection_name: 'test', entity_id: 1 }, body: { entryData: { a: 'a', b: 'b' } } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      jest.spyOn(services, 'updateCollectionEntity').mockResolvedValue({ message: 'Collection entity updated successfully.' });
      await controller.updateCollectionEntity(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: 'Collection entity updated successfully.' });
    });
    it('should return 500 and internal server error when an error occurs at server side', async () => {
      const req = { params: { collection_name: 'test', entity_id: 1 }, body: { entryData: { a: 'a', b: 'b' } } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      jest.spyOn(services, 'updateCollectionEntity').mockRejectedValue(new Error('Internal server error'));
      await controller.updateCollectionEntity(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'Internal server error.' });
    });
    it('should throw http errors in case of defined errors', async () => {
      const req = { params: { collection_name: 'test', entity_id: 1 }, body: { entryData: { a: 'a', b: 'b' } } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      jest.spyOn(services, 'updateCollectionEntity').mockRejectedValue(new httpErrors('Collection entity not found.', 404));
      await controller.updateCollectionEntity(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Collection entity not found.' });
    });
  });
  describe('getCollections', () => {
    it('should return 200 and collections', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      jest.spyOn(services, 'getCollections').mockResolvedValue([{ id: 1, collection_name: 'test', entries: { a: 'a', b: 'b' } }]);
      await controller.getCollections(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith([{ id: 1, collection_name: 'test', entries: { a: 'a', b: 'b' } }]);
    });
    it('should return 500 and internal server error when an error occurs at server side', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      jest.spyOn(services, 'getCollections').mockRejectedValue(new Error('Internal server error'));
      await controller.getCollections(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'Internal server error.' });
    });
    it('should throw http errors in case of defined errors', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      jest.spyOn(services, 'getCollections').mockRejectedValue(new httpErrors('Collection not found.', 404));
      await controller.getCollections(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Collection not found.' });
    });
  });
});