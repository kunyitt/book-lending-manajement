const express = require('express')
const routes = require('./routes')
const connectDB = require('./config/mongodb.js')
const cors = require('cors')
const bookRoutes = require('./routes/book_route.js')
const authorRoutes = require('./routes/author_route.js')
const categoryRoutes = require('./routes/category_route.js')
const borrowerRoutes = require('./routes/borrower_route.js')
const borrowBookRoutes = require('./routes/borrowBook_route.js')

const app = express()

require('dotenv').config()

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin : "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
)

connectDB()

app.use("/api/v1",routes)
app.use("/api/v1", bookRoutes)
app.use("/api/v1", authorRoutes)
app.use("/api/v1", categoryRoutes)
app.use("/api/v1", borrowerRoutes)
app.use("api/v1", borrowBookRoutes)


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

