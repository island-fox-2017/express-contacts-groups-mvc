const express = require('express')
const app = express()
const bodyParser = require ('body-parser')
// const ejs = require('ejs')
// var sqlite3 = require('sqlite3').verbose();
// const ConnectDB = require('./models/connectDB');
// const Contact = require('./models/contacts')
// const Profile = require('./models/profile')
// const Groups = require('./models/groups')
// const Address = require('./models/addresses')
// var connect = new ConnectDB()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.set('view engine', 'ejs')
// =================INDEX=======================================================
app.get('/',function(req,res) {
   res.render('index',{titleTask : 'Contact&Group'})
})
// ===========================CONTACS===========================================
var contacts = require('./routers/contacts')
app.use('/contacts',contacts)
//===================================GROUPS=====================================
var groups= require('./routers/groups')
app.use('/groups',groups)
// ===================================PROFILE===================================
var profile = require('./routers/profile')
app.use('/profile',profile)
// ===================================ADDRESS===================================
var address= require('./routers/address')
app.use('/address',address)
app.listen(3000)
