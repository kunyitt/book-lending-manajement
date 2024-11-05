const express = require("express")
const bookRoutes = require("./book_route")
const authorRoutes = require("./author_route")
const categoryRoutes = require("./category_route")
const borrowerRoutes = require("./borrower_route")
const borrowBookRoutes = require("./borrowBook_route")

const routes = express.Router()

routes.use(bookRoutes)
routes.use(authorRoutes)
routes.use(categoryRoutes)
routes.use(borrowerRoutes)
routes.use(borrowBookRoutes)

module.exports = routes