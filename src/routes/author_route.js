const express = require("express")
const authorController = require("../controllers/author_controller")
const authorRoutes = express.Router()
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


authorRoutes
    .get("/authors", authorController.getAllAuthor)
    .get("/author/:id", authorController.getAuthor)
    .post("/author", authorController.addAuthor)
    .put("/author/:id", authorController.updateAuthor)
    .delete("/author/:id", authorController.deleteAuthor)
    .post("/author/upload", upload.single('image'), authorController.uploadAuthorImage)

module.exports = authorRoutes;