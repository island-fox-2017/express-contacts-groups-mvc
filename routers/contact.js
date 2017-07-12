const express = require('express');
var router = express.Router();

//-------untuk require export DB-----//
var setupDB = require('../models/dbmodel');
let dbCreate = new setupDB('./db/data.db');

//---------------ORM-------------------//
//------------ORM CONTACT-------------//
const Contact = require('../models/contact'); // require contact.js berdasarkan classnya

//show table contact
router.get('/', function(req, res) {
  Contact.showContact(dbCreate.connection, function(err, rows) {
    res.render('contact', {
      data_contact: rows
    });
  });
});
//show insert data to form
router.get('/add', function(req, res) {
  res.render('form');
});
//insert and submit data form Contact
router.post('/add', function(req, res) {
  Contact.addContact(dbCreate.connection, req.body);
  res.redirect('/contact');
});
//take data to form edit page
router.get('/edit/:id', function(req, res) {
  Contact.editContact(dbCreate.connection, req.params, function(err, rows) {
    res.render('edit', {
      data: rows
    })
  })
})
//edit submit and back to contact page
router.post('/edit/:id', function(req, res) {
  Contact.editContactData(dbCreate.connection, req.body, req.params.id);
  res.redirect('/contact');
});
//delete contact
router.get('/delete/:id', function(req, res) {
  Contact.deleteContact(dbCreate.connection, req.params);
  res.redirect('/contact');
});



module.exports = router;
