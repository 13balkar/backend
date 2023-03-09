const { content } = require('../../database/models');
const HttpErrors = require('../../errors/httpErrors');

const getAllContents = async () => {
  const contents = await content.findAll({ attributes: ['content_name'] });
  return contents;
};

const addContent = async (content_name, columns) => {
  const createdContent = await content.create({ content_name, columns });
  return createdContent;
};

const getContentByName = async (content_name) => {
  const contentByName = await content.findOne({ where: { content_name } });
  return contentByName;
};

const addField = async (columnArray, content_name) => {
  // console.log(columnArray);
  const getContent = await content.findOne({ where: { content_name } });
  if (!getContent) {
    throw new HttpErrors.NotFound('Content not found');
  }
  let contentFields = getContent.columns;
  contentFields = contentFields.concat(columnArray);
  // console.log(contentFields);
  const updatedContent = await content.update({ columns: contentFields }, { where: { content_name } });
  return { updatedContent, 'message': 'Field added successfully' };
};

const deleteField = async (columnNames, content_name) => {
  const getContent = await content.findOne({ where: { content_name } });
  if (!getContent) {
    throw new HttpErrors.NotFound('Content not found');
  }
  let contentFields = getContent.columns;
  contentFields = contentFields.filter((field) => !columnNames.includes(field.name));
  const updatedContent = await content.update({ columns: contentFields }, { where: { content_name } });
  return { updatedContent, 'message': 'Field added successfully' };
};

const updateField = async (columnArray, content_name) => {
  const getContent = await content.findOne({ where: { content_name } });
  if (!getContent) {
    throw new HttpErrors.NotFound('Content not found');
  }
  let contentFields = getContent.columns;
  contentFields = contentFields.map((field) => {
    const newField = columnArray.find((newField) => newField.oldName === field.name);
    if (newField) {
      return {
        name: newField.newName,
        type: field.type
      };
    }
    return field;
  });
  const updatedContent = await content.update({ columns: contentFields }, { where: { content_name } });
  return { updatedContent, 'message': 'Field added successfully' };
};

const changeName = async (content_name, newContentName) => {
  const getContent = await content.findOne({ where: { content_name } });
  if (!getContent) {
    throw new HttpErrors.NotFound('Content not found');
  }
  const updatedContent = await content.update({ content_name: newContentName }, { where: { content_name } });
  return updatedContent;
};

module.exports = { addContent, getAllContents, getContentByName, addField, deleteField, updateField, changeName };