const {Schema, model} = require('mongoose')
const User = new Schema({
    email:{
        type:String,
        required:true
    },
    pass:{
        type: String,
        required:true
    },
    rules:{
        type:Boolean
    }
})

// коммит
// схемы любимые)
// а гит не запускался просто потому что ты не перезашла в vs code
// терминал не понял, что гит уже установлен)
// капец долго он все добавляет) файлов много

module.exports = model('User', User)
