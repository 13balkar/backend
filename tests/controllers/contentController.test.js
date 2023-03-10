const controller = require('../../src/controllers/contentController');
const httpErrors = require('../../errors/httpErrors');
const services = require('../../src/services/contentServices');

describe('contentController', () => {
  describe('getAllContents', () => {
    it('should return all contents', async () => {
      jest.spyOn(services, 'getAllContents').mockResolvedValue([{ content_name: 'test', }]);
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      await controller.getAllContents(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith([{ content_name: 'test', }]);
    });
    it('should return 500 and server error when there is error in server side', async () => {
      jest.spyOn(services, 'getAllContents').mockRejectedValue(new Error('error'));
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      await controller.getAllContents(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'Internal server error.' });
    });

  });
  describe('addContent', () => {
    it('should return 201 and content when content is added successfully', async () => {
      jest.spyOn(services, 'addContent').mockResolvedValue({
        content_name: 'test', columns: [{ 'name': 'revenue', 'type': 'string' }]
      });
      const req = { body: { content_name: 'test', columns: [{ 'name': 'revenue', 'type': 'string' }] } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      await controller.addContent(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        content_name: 'test', columns: [{ 'name': 'revenue', 'type': 'string' }]
      });
    });
    it('should return 500 and server error when there is error in server side', async () => {
      jest.spyOn(services, 'addContent').mockRejectedValue(new Error('error'));
      const req = { body: { content_name: 'test', columns: [{ 'name': 'revenue', 'type': 'string' }] } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      await controller.addContent(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'Internal server error.' });
    });

  });
  describe('getContentByName', () => {
    it('should return 200 and content when content is found', async () => {
      jest.spyOn(services, 'getContentByName').mockResolvedValue({
        content_name: 'test', columns: [{ 'name': 'revenue', 'type': 'string' }]
      });
      const req = { params: { content_name: 'test' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      await controller.getContentByName(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        content_name: 'test', columns: [{ 'name': 'revenue', 'type': 'string' }]
      });
    });
    it('should return 500 and server error when there is error in server side', async () => {
      jest.spyOn(services, 'getContentByName').mockRejectedValue(new Error('error'));
      const req = { params: { content_name: 'test' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      await controller.getContentByName(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'Internal server error.' });
    });
  });
  describe('addField', () => {
    it('should return 200 and success message when field is added successfully', async () => {
      jest.spyOn(services, 'addField').mockResolvedValue({ updatedContent: [1], message: 'Field added successfully' });
      const req = { params: { content_name: 'test' }, body: { columnArray: [{ name: 'revenue', type: 'string' }] } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      await controller.addField(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ updatedContent: [1], message: 'Field added successfully' });
    });
    it('should return 404 and content not found when content is not found', async () => {
      jest.spyOn(services, 'addField').mockRejectedValue(new httpErrors('Content not found', 404));
      const req = { params: { content_name: 'test' }, body: { columnArray: [{ name: 'revenue', type: 'string' }] } };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      await controller.addField(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Content not found' });
    });
    it('should return 500 and server error when there is error in server side', async () => {
      jest.spyOn(services, 'addField').mockRejectedValue(new Error('error'));
      const req = { params: { content_name: 'test' }, body: { name: 'revenue', type: 'string' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      await controller.addField(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'Internal server error.' });
    });
  });
  describe('deleteField', () => {
    it('should return 200 and success message when field is deleted successfully', async () => {
      jest.spyOn(services, 'deleteField').mockResolvedValue({ updatedContent: 1, message: 'Field deleted successfully' });
      const req = { params: { content_name: 'test' }, body: { columnNames: ['revenue'] } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      await controller.deleteField(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ updatedContent: 1, message: 'Field deleted successfully' });
    });
    it('should return 404 and content not found when content is not found', async () => {
      jest.spyOn(services, 'deleteField').mockRejectedValue(new httpErrors('Content not found', 404));
      const req = { params: { content_name: 'test' }, body: { columnNames: ['revenue'] } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      await controller.deleteField(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Content not found' });
    });
    it('should return 500 and server error when there is error in server side', async () => {
      jest.spyOn(services, 'deleteField').mockRejectedValue(new Error('error'));
      const req = { params: { content_name: 'test' }, body: { columnNames: ['revenue'] } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      await controller.deleteField(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'Internal server error.' });
    });

  });
  describe('updateField', () => {
    // jest.spyOn(services, 'updateField').mockResolvedValue({ updatedContent: 1, message: 'Field updated successfully' });
    it('should return 200 and success message when field is updated successfully', async () => {
      jest.spyOn(services, 'updateField').mockResolvedValue({ updatedContent: 1, message: 'Field updated successfully' });
      const req = { params: { content_name: 'test' }, body: { columnArray: [{ oldName: 'revenue', newName: 'revenue' }] } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      await controller.updateField(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ updatedContent: 1, message: 'Field updated successfully' });
    });
    it('should return 404 and content not found when content is not found', async () => {
      jest.spyOn(services, 'updateField').mockRejectedValue(new httpErrors('Content not found', 404));
      const req = { params: { content_name: 'test' }, body: { columnArray: [{ oldName: 'revenue', newName: 'revenue' }] } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      await controller.updateField(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Content not found' });
    });
    it('should return 500 and server error when there is error in server side', async () => {
      jest.spyOn(services, 'updateField').mockRejectedValue(new Error('error'));
      const req = { params: { content_name: 'test' }, body: { columnArray: [{ oldName: 'revenue', newName: 'revenue' }] } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      await controller.updateField(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'Internal server error.' });
    });
  });
  describe('changeName', () => {
    it('should return 200 and success message when name is changed successfully', async () => {
      jest.spyOn(services, 'changeName').mockResolvedValue([1]);
      const req = { params: { content_name: 'test' }, body: { newContentName: 'test' } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      await controller.changeName(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith([1]);
    });
    it('should return 404 and content not found when content is not found', async () => {
      jest.spyOn(services, 'changeName').mockRejectedValue(new httpErrors('Content not found', 404));
      const req = { params: { content_name: 'test' }, body: { newContentName: 'test' } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      await controller.changeName(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Content not found' });
    });
    it('should return 500 and server error when there is error in server side', async () => {
      jest.spyOn(services, 'changeName').mockRejectedValue(new Error('error'));
      const req = { params: { content_name: 'test' }, body: { newContentName: 'test' } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      await controller.changeName(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'Internal server error.' });
    });
  });
});