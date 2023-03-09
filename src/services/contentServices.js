const { content } = require('../../database/models');

const addContent = async (content_name, columns) => {
  const createdContent = await content.create({ content_name, columns });
  return createdContent;
};

module.exports = { addContent };