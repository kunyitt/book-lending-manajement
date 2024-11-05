const express = require ("express");
const borrowBookController = require("../controllers/borrowBook_controller")
const borrowBookRoutes = express.Router()

borrowBookRoutes
    .post("/borrow/book", borrowBookController.addBookBorrow)
    .get("/borrow/book/list", borrowBookController.getActiveBookBorrow)
    .post("/borrow/book/return", borrowBookController.addBookReturn)

module.exports = borrowBookRoutes;