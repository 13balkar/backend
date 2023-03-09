const httpErrors = require('../../errors/httpErrors');
const contentService = require('../services/contentServices');

const addContent = async (req, res) => {
  try {
    const { content_name, columns } = req.body;
    const content = await contentService.addContent(content_name, columns);
    res.status(201).send(content);
  } catch (err) {
    if (err instanceof httpErrors) {
      res.status(err.code).send({ 'message': err.message });
    }
    else {
      res.status(500).send({ 'message': 'Internal server error.' });
    }
  }
};

module.exports = { addContent };