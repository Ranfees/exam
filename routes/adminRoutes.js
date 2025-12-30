const express = require("express")
const router = express.Router()

const adminController = require("../controllers/adminControllers")

router.get("/login", adminController.showLoginPage)
router.post("/login", adminController.login)
router.get("/logout", adminController.logout)

router.get("/add-admin", adminController.createAdmin)

module.exports = router
