const express = require('express')
const exhb = require('express-handlebars')
const conf = require('config')
const handlebars = require('handlebars')
const session = require('express-session')
const saveSes = require('connect-mongodb-session')(session)
const port = conf.get('port')
const mongo = require('mongoose')
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");
const isAuth = require("./middleware/isAuth")


const Index = require('./router/index')
const addHim = require('./router/addhim')
const allFood = require('./router/allfood')

const app = express()

app.use(express.urlencoded({extended:true}))

const hbs = exhb.create({
    defaultLayout:'main',
    extname:'hbs',
    handlebars:allowInsecurePrototypeAccess(handlebars)
})

const store = new saveSes({
    collection:"mySession",
    uri:conf.get('uri')
})

app.use(session({
    secret:'keys',
    resave:true,
    saveUninitialized:true,
    store:store
}))// что делают эти опции?

app.engine("hbs", hbs.engine)
app.set('view engine', "hbs")
app.set('views', "views")

app.use(isAuth)
app.use('/', Index)
app.use('/addhim', addHim)
app.use('/allfood', allFood)



async function connect(){
    try{
        await mongo.connect(conf.get('uri'))
        app.listen(port,()=>{
            console.log('Server work')
        })}
    catch(e){
        console.log(e)
    }

}

connect()
