const express = require ('express')
const app = express()
const port = 3000

app.use(express.urlencoded())

const connectDB=require('./config/db')


app.set('view engine','ejs')

app.get('/',(req,res)=>{
    return res.render('login')
})

app.post('/',(req,res)=>{
    return res.render('adminDashboard')
})

connectDB()

app.listen(port,()=>{
    console.log('connected')
})