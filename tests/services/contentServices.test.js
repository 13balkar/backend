const services = require('../../src/services/contentServices');
const { content } = require('../../database/models');
const httpErrors = require('../../errors/httpErrors');

describe('contentServices', () => {
  describe('getAllContents', () => {
    it('should return all contents', async () => {
      const mockContents = [{ content_name: 'test1' }, { content_name: 'test2' }];
      jest.spyOn(content, 'findAll').mockResolvedValue(mockContents);
      const contents = await services.getAllContents();
      expect(contents).toEqual(mockContents);
    });
  });
  describe('addContent', () => {
    it('should add a content', async () => {
      const mockContent = { content_name: 'test', columns: [] };
      jest.spyOn(content, 'create').mockResolvedValue(mockContent);
      const createdContent = await services.addContent('test', []);
      expect(createdContent).toEqual(mockContent);
    });
  });
  describe('getContentByName', () => {
    it('should return a content by name', async () => {
      const mockContent = { content_name: 'test', columns: [] };
      jest.spyOn(content, 'findOne').mockResolvedValue(mockContent);
      const contentByName = await services.getContentByName('test');
      expect(contentByName).toEqual(mockContent);
    });
  });
  describe('addField', () => {
    it('should add a field', async () => {
      const mockContent = { content_name: 'test', columns: [] };
      jest.spyOn(content, 'findOne').mockResolvedValue(mockContent);
      const mockUpdatedContent = { content_name: 'test', columns: [{ name: 'test', type: 'text' }] };
      jest.spyOn(content, 'update').mockResolvedValue(mockUpdatedContent);
      const updatedContent = await services.addField([{ name: 'test', type: 'text' }], 'test');
      expect(updatedContent).toEqual({ updatedContent: mockUpdatedContent, message: 'Field added successfully' });
    });
    it('should throw an error if content not found', async () => {
      jest.spyOn(content, 'findOne').mockResolvedValue(null);
      await expect(services.addField([{ name: 'test', type: 'text' }], 'test')).rejects.toThrow(httpErrors);
    });
  });
  describe('deleteField', () => {
    it('should delete a field', async () => {
      const mockContent = { content_name: 'test', columns: [{ name: 'test', type: 'text' }] };
      jest.spyOn(content, 'findOne').mockResolvedValue(mockContent);
      const mockUpdatedContent = { content_name: 'test', columns: [] };
      jest.spyOn(content, 'update').mockResolvedValue(mockUpdatedContent);
      const updatedContent = await services.deleteField(['test'], 'test');
      expect(updatedContent).toEqual({ updatedContent: mockUpdatedContent, message: 'Field deleted successfully' });
    });
    it('should throw an error if content not found', async () => {
      jest.spyOn(content, 'findOne').mockResolvedValue(null);
      await expect(services.deleteField(['test'], 'test')).rejects.toThrow(httpErrors);
    });
  });
  describe('updateField', () => {
    it('should update a field', async () => {
      const mockContent = { content_name: 'test', columns: [{ name: 'test', type: 'text' }] };
      jest.spyOn(content, 'findOne').mockResolvedValue(mockContent);
      const mockUpdatedContent = { content_name: 'test', columns: [{ name: 'test1', type: 'text' }] };
      jest.spyOn(content, 'update').mockResolvedValue(mockUpdatedContent);
      const updatedContent = await services.updateField([{ oldName: 'test', newName: 'test1' }], 'test');
      expect(updatedContent).toEqual({ updatedContent: mockUpdatedContent, message: 'Field updated successfully' });
    });
    it('should throw an error if content not found', async () => {
      jest.spyOn(content, 'findOne').mockResolvedValue(null);
      await expect(services.updateField([{ oldName: 'test', newName: 'test1' }], 'test')).rejects.toThrow(httpErrors);
    });
  });
  describe('changeName', () => {
    it('should change the name of a content', async () => {
      const mockContent = { content_name: 'test', columns: [] };
      jest.spyOn(content, 'findOne').mockResolvedValue(mockContent);
      const mockUpdatedContent = { content_name: 'test1', columns: [] };
      jest.spyOn(content, 'update').mockResolvedValue(mockUpdatedContent);
      const updatedContent = await services.changeName('test', 'test1');
      expect(updatedContent).toEqual({ updatedContent: mockUpdatedContent, message: 'Content name changed successfully' });
    });
    it('should throw an error if content not found', async () => {
      jest.spyOn(content, 'findOne').mockResolvedValue(null);
      await expect(services.changeName('test', 'test1')).rejects.toThrow(httpErrors);
    });
  });

});