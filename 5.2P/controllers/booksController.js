const booksService = require('../services/books.service');

// Get all books
function getAllBooks(req, res) {
    try {
        const books = booksService.getAllBooks();
        res.status(200).json({
            statusCode: 200,
            data: books,
            message: 'Books retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: 'Error retrieving books'
        });
    }
}

// Get book by ID
function getBookById(req, res) {
    try {
        const book = booksService.getBookById(req.params.id);
        
        if (book) {
            res.status(200).json({
                statusCode: 200,
                data: book,
                message: 'Book found'
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                message: 'Book not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: 'Error retrieving book'
        });
    }
}

module.exports = {
    getAllBooks,
    getBookById
};