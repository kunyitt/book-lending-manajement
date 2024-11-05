const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
    bookId: {type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true},
    borrowerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Borrower', required: true},
    borrowAt: {type: Date, default: Date.now},
    expectedReturnedAt: { type: Date, required: true },
    returnedAt: { type: Date, default: null },
    fine: {type: Number, default: 0}
}, 
    {timestamps: true}
);

const Borrow = mongoose.model('Borrow', borrowSchema, 'borrowBook');

const addBookBorrow = async (borrowData) => {
    const newBorrow = new Borrow (borrowData);
    return await newBorrow.save();
};

const getActiveBookBorrow = async () => {
    return await Borrow.find({returnedAt: null})
    .populate({
        path:'bookId',
        select: 'title summary coverImage authorId categoryId',
        populate: [
            { path: 'author', select: 'name' },
            { path: 'category', select: 'name' }
        ]
    })
    .populate({
        path: 'borrowerId',
        select: 'name'
    });
};

const addBookReturn = async (borrowId) => {
    return await Borrow.findByIdAndUpdate(borrowId, {returnedAt: new Date()}, {new: true});
};

module.exports = {Borrow, addBookBorrow, getActiveBookBorrow, addBookReturn}