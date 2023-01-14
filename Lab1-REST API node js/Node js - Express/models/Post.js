const mongoose = require('mongoose')

var PostSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },

    paymentID:{
        type:Number,
        required: true,
    },

    status: {
        type:String,
        reuqired:true
    },

    amount:Number,
    currency:String,

    date: {
        type: Date,
        default: Date.now
    },

    paymentGateway: String,
    customer:String,
    billAdress:String
})

module.exports.PostSch = mongoose.model('/routers.js', PostSchema)

//const PostSch = mongoose.model('/routers.js', PostSchema))
//module.exports = { PostSch: mongoose.model('routers.js', PostSchema)}
