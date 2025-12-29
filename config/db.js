const mongoose=require('mongoose')

function connectDB(){
   mongoose.connect('mongodb+srv://admin:12341234@cluster0.c5bva6q.mongodb.net/reshen')
}

module.exports=connectDB