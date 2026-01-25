const express = require('express');
const router = express.Router();

// Import controllers via index.js
const Controllers = require('../controllers');

// Routes - no business logic here
router.get('/', Controllers.booksController.getAllBooks);
router.get('/:id', Controllers.booksController.getBookById);

module.exports = router;