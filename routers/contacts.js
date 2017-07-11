var express = require('express')
var router = express.Router()

const ConnectDB = require('../models/connectDB');
var connect = new ConnectDB()
const Contact = require('../models/contacts')

router.get('/', function(req,res){
  Contact.showAll(connect.dataBase, function(err,rows) {
    res.render('contact',{contactsInput : rows})
  })
})
router.post('/',function(req, res){
  Contact.insertContact(connect.dataBase , req.body.name,req.body.company,req.body.phone,req.body.email)
  res.redirect('/contacts')
})
router.get('/delete/:id',function(req ,res) {
  Contact.deleteContact(connect.dataBase,req.params.id)
  res.redirect('/contacts');
})
router.get(`/edit/:id`,function (req,res) {
  Contact.showEdit(connect.dataBase, req.params.id, function(err,rows){
      res.render('edit',{editInput : rows })
  })
})
router.post('/edit/:id',function (req,res) {
  Contact.editInput(connect.dataBase , req.body.id ,req.body.name,req.body.company ,req.body.company,req.body.email)
  res.redirect('/contacts')
})
router.get('/show-address/:id', function(req, res) {
  // db.all(`SELECT Addresses.id , Addresses.street , Addresses.city, Addresses.zipCode`)
})
module.exports = router;
