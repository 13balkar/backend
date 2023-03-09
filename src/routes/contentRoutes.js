const express = require('express');
const contentRouter = express.Router();
const { addContent, getAllContents, getContentByName, addField, deleteField, updateField, changeName } = require('../controllers/contentController');
const { postContentValidator, getContentByNameValidator, changeNameValidator, addFieldValidator, updateFieldValidator, deleteFieldValidator } = require('../middleware/contentValidator');

contentRouter.post('/addContent', postContentValidator, addContent);
contentRouter.get('/', getAllContents);
contentRouter.get('/:content_name', getContentByNameValidator, getContentByName);
contentRouter.patch('/:content_name/addField', addFieldValidator, addField);
contentRouter.patch('/:content_name/deleteField', deleteFieldValidator, deleteField);
contentRouter.patch('/:content_name/updateField', updateFieldValidator, updateField);
contentRouter.patch('/:content_name/changeName', changeNameValidator, changeName);

module.exports = contentRouter;