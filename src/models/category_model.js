const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {type: String, required: true}
    },
    {timestamps: true}
);

const Category = mongoose.model('Category', categorySchema)

const getAllCategory = async () => {
    return await Category.find();
}

const getCategory = async (id) => {
    return await Category.findById(id);
}

const addCategory = async (categoryData) => {
    const newCategory = new Category(categoryData);
    return await newCategory.save(); 
}

const deleteCategory = async (id) => {
    return await Category.findByIdAndDelete(id);
}

const updateCategory = async (id, data) => {
    return await Category.findByIdAndUpdate(id, data, {new:true});
}

module.exports = {Category, getAllCategory, getCategory, addCategory, deleteCategory, updateCategory}