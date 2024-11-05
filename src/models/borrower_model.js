const mongoose = require("mongoose");

const borrowerSchema = new mongoose.Schema(
    {
        name: {type: String, required: true}
    },
    {timestamps: true}
);

const Borrower = mongoose.model('Borrower', borrowerSchema)

const getAllBorrower = async () => {
    return await Borrower.find();
}

const getBorrower = async (id) => {
    return await Borrower.findById(id);
}

const addBorrower = async (borrowerData) => {
    const newBorrower = new Borrower(borrowerData);
    return await newBorrower.save();
}

const deleteBorrower = async (id) => {
    return await Borrower.findByIdAndDelete(id);
}

const updateBorrower = async (id, data) => {
    return await Borrower.findByIdAndUpdate(id, data, {new:true});
}

module.exports = {Borrower, getAllBorrower, getBorrower, addBorrower, deleteBorrower, updateBorrower}