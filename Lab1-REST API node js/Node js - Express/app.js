
const express = require('express')
const mongoose = require('mongoose')
const cors=require('cors')
const app = express()
const bodyParser = require('body-parser')
require('dotenv/config')

app.use(express.json())
app.use(bodyParser.json()) // reading our req 
app.use(cors())


async function connect(){
    try{
        mongoose.connect(process.env.DB_URL);
        console.log('Connected to MongoDB')
    } 
    catch (error){
        console.error('Error, review your connection')
    }
}
connect();


const Routers = require('./routers')
app.use('/',Routers.getR)
app.use('/',Routers.postR)

//middleware for post model


//routes 
//running a middleware
//app.use('/api',()=>{
//    console.log('successfully running this middleware')
//})

app.get('*', (req, res) =>{
    res.send('{mesagge}:{working with JSON}')
})


app.listen(7000, ()=>{
    console.log('Connected to port 7000')
});