const validator = require('../../src/middleware/collectionValidator');

describe('collectionValidator', () => {
  describe('validateGetCollectionEntries', () => {
    it('should call next if the request is valid', () => {
      const req = { params: { collection_name: 'test' } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      validator.validateGetCollectionEntries(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
    });
    it('should return 400 if the request is invalid', () => {
      const req = { params: { collection_name: 1 } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      validator.validateGetCollectionEntries(req, res, next);
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ 'message': '"collection_name" must be a string' });
    });
  });
  describe('validateAddCollectionEntity', () => {
    it('should call next if the request is valid', () => {
      const req = { body: { entryData: { test: 'test' } } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      validator.validateAddCollectionEntity(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
    });
    it('should return 400 if the request is invalid', () => {
      const req = { body: { entryData: 1 } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      validator.validateAddCollectionEntity(req, res, next);
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ 'message': '"entryData" must be of type object' });
    });
  });
  describe('validateDeleteCollectionEntity', () => {
    it('should call next if the request is valid', () => {
      const req = { params: { collection_name: 'test', entity_id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      validator.validateDeleteCollectionEntity(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
    });
    it('should return 400 if the request is invalid', () => {
      const req = { params: { collection_name: 1, entity_id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      validator.validateDeleteCollectionEntity(req, res, next);
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ 'message': '"collection_name" must be a string' });
    });
  });
  describe('validateUpdateCollectionEntity', () => {
    it('should call next if the request is valid', () => {
      const req = { params: { collection_name: 'test', entity_id: 1 }, body: { entryData: { test: 'test' } } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      validator.validateUpdateCollectionEntity(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
    });
    it('should return 400 if the request is invalid', () => {
      const req = { params: { collection_name: 1, entity_id: 1 }, body: { entryData: { test: 'test' } } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      validator.validateUpdateCollectionEntity(req, res, next);
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ 'message': '"collection_name" must be a string' });
    });
  });

});