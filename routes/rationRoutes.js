const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

const rationController = require("../controllers/rationController")

router.get("/", rationController.getAllUsers)
router.get("/add", rationController.showAddUserForm)
router.post("/add", rationController.addUser)
router.post("/reset-issued", rationController.resetIssuedStatus)

router.get("/quota", rationController.getAllQuotas)
router.get("/quota/add", rationController.showAddQuotaForm)
router.get("/quota/edit/:id", rationController.showEditQuotaForm)
router.post("/quota/save", rationController.saveQuota)

router.get("/:id/supplies", auth, rationController.showSupplies)
router.get("/:id/bill", auth, rationController.showBillingPage)
router.post("/:id/bill", auth, rationController.createBill)

module.exports = router
