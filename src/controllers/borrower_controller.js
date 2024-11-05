const Borrower = require('../models/borrower_model');

//mendapatkan list peminjam
const getAllBorrower = async (req, res) => {
    try {
        const borrowers = await Borrower.getAllBorrower();
        return res.json(borrowers);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

//mendapatkan detail peminjam
const getBorrower = async (req, res) => {
    const {id} = req.params;
    if (!id) return res.status(400).json({error: "id peminjam tidak ada"});

    try {
        const borrower = await Borrower.getBorrower(id);
        if (!borrower) return res.status(404).json({error: "peminjam tidak ditemukan"});
        return res.json(borrower);
    }catch (error) {
        return res.status(500).json({error: error.message});
    }
}

//menambahkan data peminjam baru
const addBorrower = async (req, res) => {
    const {name} = req.body;

    if(!name) return res.status(400).json({error: "informasi tidak tersedia"})

    try {
        const newBorrower = await Borrower.addBorrower(req.body);
        return res.status(201).json(newBorrower);
    }catch (error) {
        return res.status(500).json({error: error.message});
    }
}

//mengupdate peminjam
const updateBorrower = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;

    if (!id) return res.status(400).json({error: "id peminjam tidak ada"})
    if (!name) return res.status(400).json({error: "informasi tidak tersedia"});

    try {
        const updateBorrower = await Borrower.updateBorrower(req.params.id, req.body);
        return res.json(updateBorrower);
    }catch  (error) {
        return res.status(500).json({error: error.message});
    }
}

//menghapus peminjam
const deleteBorrower = async (req, res) => {
    const {id} = req.params;
    try {
        await Borrower.deleteBorrower(req.params.id);
        return res.status(200).json({message: "data peminjam berhasil dihapus"});
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
}


module.exports = { getAllBorrower, getBorrower, addBorrower, updateBorrower, deleteBorrower}