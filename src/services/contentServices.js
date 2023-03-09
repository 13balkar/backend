const { content } = require('../../database/models');

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

module.exports = { addContent, getAllContents, getContentByName };