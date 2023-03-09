const { content } = require('../../database/models');

const getAllContents = async () => {
  const contents = await content.findAll({ attributes: ['content_name'] });
  return contents;
};

const addContent = async (content_name, columns) => {
  const createdContent = await content.create({ content_name, columns });
  return createdContent;
};

module.exports = { addContent, getAllContents };