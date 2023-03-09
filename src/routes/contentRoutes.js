const express = require('express');
const contentRouter = express.Router();
const { addContent } = require('../controllers/contentController');
const { postContentValidator } = require('../middleware/contentValidator');

contentRouter.post('/addContent', postContentValidator, addContent);

module.exports = contentRouter;