const express = require("express")
const borrowerController = require("../controllers/borrower_controller")
const borrowerRoutes = express.Router()

borrowerRoutes
    .get("/borrowers", borrowerController.getAllBorrower)
    .get("/borrower/:id", borrowerController.getBorrower)
    .post("/borrower", borrowerController.addBorrower)
    .put("/borrower/:id", borrowerController.updateBorrower)
    .delete("/borrower/:id", borrowerController.deleteBorrower)

module.exports = borrowerRoutes;