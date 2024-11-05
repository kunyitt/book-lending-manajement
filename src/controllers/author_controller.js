const Author = require('../models/author_model');

//mendapatkan list author
const getAllAuthor = async (req, res) => {
    try {
        const authors = await Author.getAllAuthor();
        return res.json(authors);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

//mendapatkan detail author
const getAuthor = async (req, res) => {
    const {id} = req.params;
    if (!id) return res.status(400).json({error: "id author tidak ada"});

    try {
        const author = await Author.getAuthor(id);
        if (!author) return res.status(404).json({error: "author tidak ditemukan"});
        return res.json(author);
    }catch (error) {
        return res.status(500).json({error: error.message});
    }
}

//menambahkan data author baru
const addAuthor = async (req, res) => {
    const {name, authorImage} = req.body;

    if(!name || !authorImage) return res.status(400).json({error: "informasi tidak tersedia"})

    try {
        const newAuthor = await Author.addAuthor(req.body);
        return res.status(201).json(newAuthor);
    }catch (error) {
        return res.status(500).json({error: error.message});
    }
}

//mengupdate author
const updateAuthor = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;

    if (!id) return res.status(400).json({error: "id author tidak ada"})
    if (!name) return res.status(400).json({error: "informasi tidak tersedia"});

    try {
        const updateAuthor = await Author.updateAuthor(req.params.id, req.body);
        return res.json(updateAuthor);
    }catch  (error) {
        return res.status(500).json({error: error.message});
    }
}

//menghapus author
const deleteAuthor = async (req, res) => {
    const {id} = req.params;
    try {
        await Author.deleteAuthor(req.params.id);
        return res.status(200).json({message: "author berhasil dihapus"});
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
}

//mengupload foto author
const uploadAuthorImage = async (req, res) => {
    try {
        if (!req.file){
            return res.status(400).json({error: "tidak ada file yang diupload"});
        }

        const imageUrl = await Author.uploadAuthorImage(req.file.path);
        return res.json(imageUrl);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = { getAllAuthor, getAuthor, addAuthor, updateAuthor, deleteAuthor, uploadAuthorImage}