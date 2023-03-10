const validator = require('../../src/middleware/contentValidator');

describe('contentValidator', () => {
  describe('postContentValidator', () => {
    it('should call next if the request is valid', () => {
      const req = { body: { content_name: 'test', columns: [{ name: 'test', type: 'test' }] } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      validator.postContentValidator(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
    });
    it('should return 400 if the request is invalid', () => {
      const req = { body: { content_name: 'test', columns: [{ name: 'test' }] } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      validator.postContentValidator(req, res, next);
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ 'message': '"columns[0].type" is required' });
    });
  });
  describe('getContentByNameValidator', () => {
    it('should call next if the request is valid', () => {
      const req = { params: { content_name: 'test' } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      validator.getContentByNameValidator(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
    });
    it('should return 400 if the request is invalid', () => {
      const req = { params: { content_name: 1 } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      validator.getContentByNameValidator(req, res, next);
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ 'message': '"content_name" must be a string' });
    });
  });
  describe('changeNameValidator', () => {
    it('should call next if the request is valid', () => {
      const req = { body: { newContentName: 'test' } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      validator.changeNameValidator(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
    });
    it('should return 400 if the request is invalid', () => {
      const req = { body: { newContentName: 1 } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      validator.changeNameValidator(req, res, next);
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ 'message': '"newContentName" must be a string' });
    });
  });
  describe('addFieldValidator', () => {
    it('should call next if the request is valid', () => {
      const req = { body: { columnArray: [{ name: 'test', type: 'test' }] } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      validator.addFieldValidator(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
    });
    it('should return 400 if the request is invalid', () => {
      const req = { body: { columnArray: [{ name: 'test' }] } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      validator.addFieldValidator(req, res, next);
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ 'message': '"columnArray[0].type" is required' });
    });
  });
  describe('deleteFieldValidator', () => {
    it('should call next if the request is valid', () => {
      const req = { body: { columnNames: ['test'] } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      validator.deleteFieldValidator(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
    });
    it('should return 400 if the request is invalid', () => {
      const req = { body: { columnNames: [{ name: 1 }] } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      validator.deleteFieldValidator(req, res, next);
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ 'message': '"columnNames[0]" must be a string' });
    });
  });
  describe('updateFieldValidator', () => {
    it('should call next if the request is valid', () => {
      const req = { body: { columnArray: [{ oldName: 'test', newName: 'test' }] } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      validator.updateFieldValidator(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
    });
    it('should return 400 if the request is invalid', () => {
      const req = { body: { columnArray: [{ newName: 'test' }] } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      validator.updateFieldValidator(req, res, next);
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ 'message': '"columnArray[0].oldName" is required' });
    });
  });
});