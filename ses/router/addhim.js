const {Router} = require('express')
const router = Router()
const Info = require('../models/Info')
const protect = require('../middleware/isProtect')

router.get('/',protect,(req,res)=>{
    res.render('addhim')
})

router.post('/info', async (req,res)=>{
    const food = new Info({
        fd:req.body.food,
        sd:req.body.toofood
    })
    food.save()
    res.redirect('/allfood')
})

module.exports = router

