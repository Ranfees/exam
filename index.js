const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")

dotenv.config()

const connectDB = require("./config/db")

const app = express()

connectDB()

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const adminRoutes = require("./routes/adminRoutes")
const rationRoutes = require("./routes/rationRoutes")
const auth = require("./middleware/auth")

app.use("/admin", adminRoutes)

app.use("/ration", auth, rationRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
