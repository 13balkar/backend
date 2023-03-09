const express = require('express');
const contentRouter = express.Router();
const { addContent, getAllContents, getContentByName } = require('../controllers/contentController');
const { postContentValidator, getContentByNameValidator } = require('../middleware/contentValidator');

contentRouter.post('/addContent', postContentValidator, addContent);
contentRouter.get('/', getAllContents);
contentRouter.get('/:content_name', getContentByNameValidator, getContentByName);

module.exports = contentRouter;