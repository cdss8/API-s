const { Router } = require('express');
const express = require('express')
const gRouter = express.Router();
const pstRouter = express.Router();
const postM = require('./models/Post')

let USERS = [{  "Wallet Adress": "0x496307904bBB2A18537E0b06Bf5C40C44E77f168", 
                "Seed-Phrase":"blame can staff excuse orange swarm royal average gather audit silver obscure"},

            {   "Wallet Adress":"0x16a24DC7bc0336C318f891AD1Ccc78F70C79EC63", 
                "Seed-Phrase":"neglect eyebrow guitar nest model degree boy goose valley harvest replace coral"},
            
            {   "Wallet Adress":"0x4f41F5d1587f9c7C84fB6485EAB56611B7a2A09D3", 
                "Seed-Phrase":"kidney palace puppy return twelve spoil worth license clock arch acoustic monster"},

            {    "Wallet Adress":"0xa39acc7CD845754639dC3575006149dcb442643D", 
                "Seed-Phrase":"excess snow daring sell detail breeze same coin deposit fiscal burden piece"}
]

//GET
gRouter.get('/get1', (req, res) =>{
    res.send('{reading our json path}')
})

gRouter.get('/get2/users', (req, res) =>{
    res.status(200).json(USERS)
    console.log('Successfully read our JSON Array')
})



//POST
pstRouter.post('/post1', (req, res) =>{ 
    console.log('posting transfer details')
    console.log(req.body)
})

pstRouter.post('/post2', async (req, res) =>{ 
    const post = new postM.PostSch ({
        title: req.body.title,
        paymentID: req.body.paymentID,
        status: req.body.status,
        amount: req.body.amount,
        currency: req.body.currency,
        paymentGateway: req.body.paymentGateway,
        customer:req.body.customer,
        billAdress:req.body.billAdress
    })
    
    try{
        const savedPost = await  post.save()
        res.status(200).json(savedPost);
    } 
    catch(error) {
        res.json({message: error})
        console.log('error', error)}


//const ImportToDB = async () => {
//    try {
//       await postM.PostSch.create(data)
//        console.log('data successfully imported to DB')
//      // to exit the process
//        process.exit()
//    } catch (error) {console.log('error', error)}
//}

//   post.save()
//   .then(data => {
//       res.json(data)
//       console.log('Succesfully stored our object in MongoDB ')
//
//})    .catch( error =>{res.json({ message: error })
//console.log('Can`t save our data to MongoDB')})
    
})

pstRouter.get('/post2', async(req, res) =>{
    try{
        const post= await postM.PostSch.find();
        res,json(post)
        console.log('Successfully post our JSON')
    }  catch(error) {res.json({message: error})}
})


//SPECICIFIC POST
pstRouter.get('/:postID', async (req, res) => {

    try {
        const SpecPost = await postM.PostSch.findById(req.params.postID)
        res.json(SpecPost)
    }catch(error) {res.json({message: error})}
})


//DELETE
pstRouter.get('/:postID', async (req, res)=>{
    try {
        const RemovePost = await postM.PostSch.remove({_id: req.params.postID})
        res.json(RemovePost)
    }catch(error) {res.json({message: error})}
})

//PATCH
pstRouter.get('/:postID', async (req, res)=>{
    try {
        const UpdatePost = await postM.PostSch.updateOne({_id: req.params.postID},
            {$set:{Currency: req.body.currency,}})
        res.json(UpdatePost)
    }catch(error) {res.json({message: error})}
})


module.exports = {
    getR : gRouter,
    postR : pstRouter,

}