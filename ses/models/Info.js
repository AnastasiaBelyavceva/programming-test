const {Schema, model} = require('mongoose')
const Info = new Schema({
    fd:{
        type:String,
        required: true
    },
    sd :{
        type:String,
        required:true
    }
})

module.exports = model('Info', Info)

