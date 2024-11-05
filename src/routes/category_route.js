const express = require("express")
const categoryController = require("../controllers/category_controller")
const categoryRoutes = express.Router()

categoryRoutes
    .get("/categories", categoryController.getAllCategory)
    .get("/category/:id", categoryController.getCategory)
    .post("/category", categoryController.addCategory)
    .put("/category/:id", categoryController.updateCategory)
    .delete("/category/:id", categoryController.deleteCategory)

module.exports = categoryRoutes;