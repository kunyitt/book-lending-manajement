const Category = require('../models/category_model');

//mendapatkan list kategori
const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.getAllCategory();
        return res.json(categories);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

//mendapatkan detail kategori
const getCategory = async (req, res) => {
    const {id} = req.params;
    if (!id) return res.status(400).json({error: "id kategori tidak ada"});

    try {
        const category = await Category.getCategory(id);
        if (!category) return res.status(404).json({error: "kategori tidak ditemukan"});
        return res.json(category);
    }catch (error) {
        return res.status(500).json({error: error.message});
    }
}

//menambahkan data kategori baru
const addCategory = async (req, res) => {
    const {name} = req.body;

    if(!name) return res.status(400).json({error: "informasi tidak tersedia"})

    try {
        const newCategory = await Category.addCategory(req.body);
        return res.status(201).json(newCategory);
    }catch (error) {
        return res.status(500).json({error: error.message});
    }
}

//mengupdate kategori
const updateCategory = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;

    if (!id) return res.status(400).json({error: "id kategori tidak ada"})
    if (!name) return res.status(400).json({error: "informasi tidak tersedia"});

    try {
        const updateCategory = await Category.updateCategory(req.params.id, req.body);
        return res.json(updateCategory);
    }catch  (error) {
        return res.status(500).json({error: error.message});
    }
}

//menghapus kategori
const deleteCategory = async (req, res) => {
    const {id} = req.params;
    try {
        await Category.deleteCategory(req.params.id);
        return res.status(200).json({message: "kategori berhasil dihapus"});
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = {getAllCategory, getCategory, addCategory, updateCategory, deleteCategory}