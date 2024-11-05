const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    book_identifier: {type: String, required: true},
    status: {type: String, required: true}
});

const bookSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        summary: {type: String, required: true},
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true},
        category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
        stocks: { type: [stockSchema], required: true },
        coverImage: {type: String, required: true},
    },
    {timestamps: true}
);

const Book = mongoose.model('Book', bookSchema)

const getAllBooks = async () => {
    return await Book.find();
}

const getBook = async (id) => {
    return await Book.findById(id);
}

const addBook = async (bookData) => {
    const newBook = new Book(bookData);
    return await newBook.save();
}

const deleteBook = async (id) => {
    return await Book.findByIdAndDelete(id);
}

const updateBook = async (id, data) => {
    return await Book.findByIdAndUpdate(id, data, {new:true});
}

const upBookCover = async (filePath) => {
    const coverUrl = `/uploads/${filePath.split('/').pop()}`;
    return coverUrl;
}

module.exports = {Book, getAllBooks, getBook, addBook, deleteBook, updateBook, upBookCover};
