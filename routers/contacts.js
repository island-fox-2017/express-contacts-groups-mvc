var express = require('express');
var router = express.Router();

const DbModel = require('../models/dbmodel');
const Contact = require('../models/contact');

let dbModel = new DbModel('../data.db');


// CONTACTS HERE - v 1
// GET    | /contacts            | Menampilkan semua data contacts
router.get('/', function(req,res) {
  Contact.findAllContact(dbModel.connection, function(err,rows){
    if(!err) {
      res.render('contacts', {
        panggilData: rows
      })
    } else {
      console.log(err);
      res.send(err)
    }
  })
})

// POST   | /contacts            | Untuk input contact
router.post('/', function(req, res){
  Contact.insertContact(dbModel.connection, req.body)
  res.redirect('/')
})


// GET    | /contacts/edit/:id   | Menampilkan data contact spesifik untuk diubah
// POST   | /contacts/edit/:id   | Menerima data form untuk update contact
router.get('/edit/:id', function(req,res){
  Contact.findByIdContact(dbModel.connection, req.params, function(err,rows){
    if(!err) {
      res.render('editcontact', {
        panggilData: rows
      })
    }
  })
})

router.post('/edit/:id', function(req,res){
  Contact.updateContact(dbModel.connection, req.body, req.params)
  res.redirect('/');
})

// GET    | /contacts/delete/:id | Menghapus data contact berdasarkan id
router.get('/delete/:id', function(req, res){
  Contact.deleteContact(dbModel.connection, req.params)
  res.redirect('/');
})

//show_address?


module.exports = router
