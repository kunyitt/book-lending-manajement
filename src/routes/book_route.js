const express = require("express")
const bookController = require("../controllers/book_controller")
const bookRoutes = express.Router()
const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + '-' + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });


bookRoutes
    .get("/books", bookController.getAllBooks)
    .get("/book/:id", bookController.getBook)
    .post("/book", bookController.addBook)
    .put("/book/:id", bookController.updateBook)
    .delete("/book/:id", bookController.deleteBook)
    .post("/book/upload", upload.single('image'), bookController.upBookCover)

module.exports = bookRoutes;