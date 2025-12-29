const mongoose = require('mongoose')
const login = mongoose.schema({
 
    name:String,
    password:String,
})
module.exports= login