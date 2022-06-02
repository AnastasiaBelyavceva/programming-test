const {Router} = require('express')
const User = require('../models/User')
const router = Router()

router.get('/', (req,res)=>{
    res.render('index')
})

router.post('/reg', async (req,res)=>{
    const {email, pass, passConfirm, rules} = req.body
    const haveOrNot = await User.findOne({email})
    if(pass === passConfirm){
        if(haveOrNot){
            alert('exist yet')
            res.redirect('/')
        }
        else {
            const user = new User({
                email, pass, rules
            })
            await user.save()
        }
        res.redirect('/allfood')
    }
    else{
        //alert("Passwort is different")
        res.redirect('/')
    }
})

router.post('/enter',async (req,res)=>{
    try{
        const {email, pass} = req.body
        const haveOrNot = await User.findOne({email})
        if(haveOrNot){
            const truePass = pass=== haveOrNot.pass
            if(truePass){
                req.session.user = haveOrNot
                req.session.isAuthen = true
                req.session.save(()=>{
                    res.redirect('/')
                })
            }
            else{
                console.log('Wrong password')
                res.redirect('/')
            }
        }
        else{
            console.log('User is do not exist')
            res.redirect('/')
        }
    }
    catch (e){
        console.log(e)
    }
})

router.get('/loguot', async (req,res)=>{
    req.session.destroy(()=>{
        try{
            console.log("Get out")
            res.redirect('/')
        }
        catch (e){
            console.log(e)
        }
    })
})//как это должно работать (я понимаю как, но как), куда ссылку вставлять

module.exports = router
