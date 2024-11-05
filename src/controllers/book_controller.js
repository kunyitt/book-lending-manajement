const book = require('../models/book_model');
const Author = require('../models/author_model');
const Category = require('../models/category_model');

//mendapatkan list buku
const getAllBooks = async (req, res) => {
    try {
        const books = await book.getAllBooks();
        return res.json(books);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

//mendapatkan detail buku
const getBook = async (req, res) => {
    const {id} = req.params;
    if (!id) return res.status(400).json({error: "id buku tidak ada"});

    try {
        const bookData = await book.getBook(id);
        if (!bookData) return res.status(404).json({error: "buku tidak ditemukan"});
        return res.json(bookData);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

//menambahkan data buku baru
const addBook = async (req, res) => {
    const { title, summary, stocks, coverImage, authorId, categoryId} = req.body;

    if (!title || !summary || !stocks || !coverImage || !authorId || !categoryId){
        return res.status(400).json({error: "informasi tidak tersedia"});
    }

    try {
        const newbook = await book.addBook({ title, summary, stocks, coverImage, author: authorId, category: categoryId});
        return res.status(201).json(newbook);
    } catch (error) {
        if (error.status === 409) {
            return res.status(409).json({error: error.message});
        }
        return res.status(500).json({error: error.message});
    }
}

//mengupdate buku
const updateBook = async (req, res) => {

    const { title, summary, stocks, coverImage, authorId, categoryId} = req.body;
    const {id} = req.params;

    if (!id) return res.status(400).json({error: "id buku tidak ada"})
    
    if (!title || !summary ||!stocks || !coverImage || !authorId || !categoryId){
        return res.status(400).json({error: "informasi tidak tersedia"});
    }

    try {
        const bookUpdate = await book.updateBook(req.params.id, req.body);
        return res.json(bookUpdate);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

//menghapus buku
const deleteBook = async (req, res) => {
    const {id} = req.params;

    if (!id) return res.status(400).json({error: "id buku tidak ada"});

    try {
        await book.deleteBook(req.params.id);
        return res.status(200).json({message: "buku berhasil dihapus"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

//mengupload sampul buku
const upBookCover = async (req, res) => {

    try {
        if (!req.file){
            return res.status(400).json({error: "tidak ada file yang diupload"});
        }
        const coverUrl = await book.upBookCover(req.file.path);
        return res.json(coverUrl);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = {getAllBooks, getBook, addBook, updateBook, deleteBook, upBookCover};
