const express = require('express');
const contentRouter = express.Router();
const { addContent, getAllContents } = require('../controllers/contentController');
const { postContentValidator } = require('../middleware/contentValidator');

contentRouter.post('/addContent', postContentValidator, addContent);
contentRouter.get('/', getAllContents);

module.exports = contentRouter;