const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RationCard",
    required: true
  },

  items: [
    {
      itemName: String,
      quantity: Number,
      price: Number,
      total: Number
    }
  ],

  grandTotal: Number,

  issuedAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Transaction", transactionSchema)
