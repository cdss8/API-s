const express = require('express');
const {v4}= require('uuid')  
const nodemon = require('nodemon')
const path = require('path') 
const app=express();
app.use(express.json())


//default json in the array
let USERS =   [ {id:v4(),  wallet:"0x3cc18fe17879a8af05ca183f71fe14c288e5fa54", password:"minute pause uniform enter else cause shell blanket project dice joy service", marked:false}, 
                {id:v4(),  wallet:"0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d", password:"pitch basic alcohol embody guard clay maze lizard demand despair used habit",  marked:false}]


//GET 1
app.get('/api/users', (req, res)=>{
    res.status(200).json(USERS)
    console.log('Successfully runned GET statement')
})

//GET 2
app.get('/api/users/:id', (req, res)=>{
    const user = USERS.find (u=> u.id === req.params.id)
    USERS.push(user)  
    //USERS[index] = req.body
    //res.status(200).json(USERS[index])
    res.status(200).json(user)
    console.log('successfully submited this user')
})


//POST
app.post('/api/users', (req, res)=>{ //for new users
    //console.log(req.body)
    const user = {id:v4(),...req.body,  marked:false}
    USERS.push(user)   
    res.status(201).json(user)
    console.log('successfully created new user in POST')
})

//DELETE
app.delete('/api/users/:id', (req, res)=>{
    USERS = USERS.filter(u=> u.id !== req.params.id)
    res.status(200).json({message:'user was deleted'})
})

//PUT
app.put('/api/users/:id', (req, res)=>{
    const index = USERS.findIndex(u=> u.id === req.params.id)
    USERS[index] = req.body
    res.status(200).json(USERS[index])
})



app.use(express.static(path.resolve(__dirname, 'client')))//estadisticas del cliente para aabrir forn js 

app.get('*',(req,res)=>{ //connectando ft y bk
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

try {
    app.listen(5000, ()=> console.log('Connected to port 5000'))
} catch(err) {'Review your connection', err.massage}