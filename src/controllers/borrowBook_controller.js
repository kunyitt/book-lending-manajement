const Borrow = require('../models/borrowBook_model');
const {Book} = require('../models/book_model');
const Borrower = require('../models/borrower_model');

//menambah data peminjam buku
const addBookBorrow = async (req, res) => {
    const {bookId, borrowerId, expectedReturnedAt, book_identifier} = req.body;

    if (!bookId || !borrowerId || !expectedReturnedAt || !book_identifier) {
        return res.status(400).json({error: "informasi peminjaman tidak ada"});
    }

    try {
        const book = await Book.findById(bookId);
        const stock = book.stocks.find(stock => stock.book_identifier === book_identifier && stock.status === "available");

        if (!stock) {
            return res.status(400).json({error: "tidak ada stok buku yang tersedia"});
        }

        stock.status = "unavailable";
        await book.save();

        const borrowData = {bookId, borrowerId, expectedReturnedAt};
        const newBorrow = await Borrow.addBookBorrow(borrowData);
        const { fine, ...response } = newBorrow.toObject(); 
        
        return res.status(201).json(response); 

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

//mendapatkan list data peminjam buku yang masih aktif
const getActiveBookBorrow = async (req, res) => {
    try {
        const activeBorrows = await Borrow.getActiveBookBorrow();

        const response = activeBorrows.map(borrow => {
            const { fine, ...borrowWithoutFine } = borrow.toObject();
            return borrowWithoutFine;
        });

        return res.json(response);

    }catch (error) {
        return res.status(500).json({error: error.message});
    }
}

//menambahkan data pengembalian buku
const addBookReturn = async (req, res) => {
    const {id, book_identifier} = req.body;
    const dailyFine = 500;

    try {
        const borrowRecord = await Borrow.Borrow.findById(id);
        if (!borrowRecord) {
            return res.status(404).json({error: "peminjaman tidak ditemukan"});
        }

        const currentDate = new Date();
        let fine =0;

        if (currentDate > borrowRecord.expectedReturnedAt) {
            const keterlambatan = Math.ceil((currentDate - borrowRecord.expectedReturnedAt) / (1000 * 60 * 60 * 24));
            fine = keterlambatan * dailyFine;
        }

        const book = await Book.findById(borrowRecord.bookId);
        const stock = book.stocks.find(stock => stock.book_identifier === book_identifier && stock.status === "unavailable");

        if(stock) {
            stock.status ="available";
            await book.save();
        }

        borrowRecord.returnedAt = currentDate;
        await borrowRecord.save();

        return res.json({
            message: "data pengembalian berhasil ditambahkan",
            data: borrowRecord,
            fine: fine > 0 ? `denda keterlambatan: ${fine}` : "tidak ada denda"
        });

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = {addBookBorrow, getActiveBookBorrow, addBookReturn}