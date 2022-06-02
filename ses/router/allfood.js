const {Router} = require('express')
const router = Router()
const Info = require('../models/Info')
const User = require('../models/User')
const protect = require('../middleware/isProtect')


router.get('/', protect,async (req,res) =>{
   const model = await Info.find();
    const user = await User.find();
    console.log(user)
    res.render('himfood',{
        model,
        user
    })

})

module.exports = router
