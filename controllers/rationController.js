const RationCard = require("../models/RationCard")
const Quota = require("../models/Quota")
const Transaction = require("../models/Transaction")

exports.getAllUsers = async (req, res) => {
  const users = await RationCard.find()
    .sort({ issuedThisMonth: 1, cardNumber: 1 })

  res.render("users", { users })
}

exports.showAddUserForm = (req, res) => {
  res.render("addUser")
}

exports.addUser = async (req, res) => {
  try {
    await RationCard.create(req.body)
    res.redirect("/ration")
  } catch (err) {
    res.send("Error adding user: " + err.message)
  }
}

exports.resetIssuedStatus = async (req, res) => {
  try {
    await RationCard.updateMany({}, { $set: { issuedThisMonth: false } })
    res.redirect("/ration")
  } catch (err) {
    console.error(err)
    res.status(500).send("Failed to reset issued status")
  }
}

exports.getAllQuotas = async (req, res) => {
  const quotas = await Quota.find()
  res.render("quotaList", { quotas })
}

exports.showAddQuotaForm = (req, res) => {
  res.render("quotaForm", { quota: null })
}

exports.showEditQuotaForm = async (req, res) => {
  const quota = await Quota.findById(req.params.id)
  if (!quota) return res.send("Quota not found")

  res.render("quotaForm", { quota })
}

exports.saveQuota = async (req, res) => {
  const { id, cardType, itemName, perPersonQty, pricePerKg } = req.body

  const items = itemName.map((name, i) => ({
    itemName: name,
    perPersonQty: Number(perPersonQty[i]),
    pricePerKg: Number(pricePerKg[i])
  }))

  if (id) {
    await Quota.findByIdAndUpdate(id, { items })
  } else {
    await Quota.create({ cardType, items })
  }

  res.redirect("/ration/quota")
}

exports.showSupplies = async (req, res) => {
  const user = await RationCard.findById(req.params.id)
  if (!user) return res.send("User not found")

  const quota = await Quota.findOne({ cardType: user.cardType })
  if (!quota) return res.send("Quota not set for this card type")

  const calculatedItems = quota.items.map(item => ({
    itemName: item.itemName,
    allowedQty: item.perPersonQty * user.members
  }))

  res.render("supplies", { user, supplies: quota ? quota.items : [] })
}

exports.showBillingPage = async (req, res) => {
  const user = await RationCard.findById(req.params.id)
  const quota = await Quota.findOne({ cardType: user.cardType })

  res.render("billing", { user, items: quota.items })
}

exports.createBill = async (req, res) => {
  const { itemName, quantity, price } = req.body

  const items = itemName.map((name, i) => {
    const qty = Number(quantity[i])
    const pr = Number(price[i])

    return { itemName: name, quantity: qty, price: pr,total: qty * pr }
  })

  const grandTotal = items.reduce((sum, i) => sum + i.total, 0)

  await Transaction.create({
    user: req.params.id,
    items,
    grandTotal
  })

  await RationCard.findByIdAndUpdate(req.params.id, {
    issuedThisMonth: true,
    lastIssuedAt: new Date()
  })

  res.redirect("/ration")
}
