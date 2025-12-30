const mongoose = require("mongoose")

const quotaSchema = new mongoose.Schema({
  cardType: {
    type: String,
    enum: ["APL", "BPL"],
    required: true,
    unique: true
  },

  items: [
    {
      itemName: {
        type: String,
        required: true
      },

      perPersonQty: {
        type: Number,    
        required: true,
        min: 0
      },

      pricePerKg: {
        type: Number,  
        required: true,
        min: 0
      }
    }
  ]
})

module.exports = mongoose.model("Quota", quotaSchema)
