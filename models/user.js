const mongoose = require('mongoose')
const user = mongoose.schema({
 
    name:String,
    house:String,
    card:String,
})
module.exports =user