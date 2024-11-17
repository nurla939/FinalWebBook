const express = require('express');
const multer = require('multer');
const Book = require('../models/book'); // Изменили переменную с book на Book
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const router = express.Router();

const upload = multer({ dest: 'public/uploads/' });

router.get('/test', (req, res) => {
    res.status(200).json({ message: 'books API is working!' });
});

router.get('/', async (req, res) => {
    try {
        const books = await Book.find(); // Изменили с book на Book
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch books.' });
    }
});

router.post('/', isAuthenticated, upload.single('image'), async (req, res) => {
    try {
        const { Author, name, pages } = req.body;
        const newBook = new Book({ // Изменили с book на newBook
            Author,
            name,
            pages,
            image: `/uploads/${req.file?.filename || 'default.jpg'}`, // Проверка, что файл есть
            createdBy: req.user._id,
        });
        await newBook.save(); // Изменили с book на newBook
        res.status(201).json(newBook); // Изменили с book на newBook
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'Failed to create book.' });
    }
});

router.put('/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const { Author, name, pages } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { Author, name, pages }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ error: 'book not found.' });
        }
        res.json(updatedBook);
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ error: 'Failed to update book.' });
    }
});

router.delete('/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ error: 'book not found.' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Failed to delete book.' });
    }
});

module.exports = router;
