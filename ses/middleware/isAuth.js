module.exports=function (req, res, next){
    res.locals.isAuth=req.session.isAuthen
    next()
}
//Спросить про это, что это, помимо того,
// что создает сессию, или это не она создает сессию,
// как работает и что-то такое
