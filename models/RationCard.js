const mongoose = require("mongoose")

const rationCardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  cardType: {
    type: String,
    enum: ["APL", "BPL"],
    required: true
  },
  members: {
    type: Number,
    default: 1
  },

  issuedThisMonth: {
    type: Boolean,
    default: false
  },
  lastIssuedAt: {
    type: Date
  }

})

module.exports = mongoose.model("RationCard", rationCardSchema)
