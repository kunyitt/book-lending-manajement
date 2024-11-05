const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        authorImage: {type: String, required: true}
    },
    {timestamps: true}
);

const Author = mongoose.model('Author', authorSchema)

const getAllAuthor = async () => {
    return await Author.find();
}

const getAuthor = async (id) => {
    return await Author.findById(id);
}

const addAuthor = async (AuthorData) => {
    const newAuthor = new Author(AuthorData);
    return await newAuthor.save();
}

const deleteAuthor = async (id) => {
    return await Author.findByIdAndDelete(id);
}

const updateAuthor = async (id, data) => {
    return await Author.findByIdAndUpdate(id, data, {new:true});
}

const uploadAuthorImage = async (filePath) => {
    const imageUrl = `/uploads/${filePath.split('/').pop()}`;
    return imageUrl;
}

module.exports = {Author, getAllAuthor, getAuthor, addAuthor, deleteAuthor, updateAuthor, uploadAuthorImage}