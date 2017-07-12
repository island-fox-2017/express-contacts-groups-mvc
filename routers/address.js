const express = require('express');
var router = express.Router();

//-------untuk require export DB-----//
var setupDB = require('../models/dbmodel');
let dbCreate = new setupDB('./db/data.db');


//-------------Address------------//
//-------------------------------//
const Contact = require('../models/contact');
const Address = require('../models/address');

//show table Address
router.get('/', function(req, res) {
  Address.showAddress(dbCreate.connection, function(err, rows) {
    res.render('address', {
      dataAddress: rows
    });
  });
});
//add new address
router.get('/add', function(req, res){
  Address.contactProfile(dbCreate.connection, function(err, rows){
  res.render('addressform', {dataContact: rows});
  })
})
//add and submit address data
router.post('/add', function(req, res){
  Address.addAddress(dbCreate.connection, req.body)
  res.redirect('/address');
})
//edit form
router.get('/edit/:id', function(req, res) {
  Address.editAddress(dbCreate.connection, req.params, function(err, rows) {
    Contact.showContact(dbCreate.connection, function(err, rows2) {
      res.render('addressedit', {
        dataAddress: rows,
        dataContact: rows2
      });
    });
  });
});
//update profile data
router.post('/edit/:id', function(req, res) {
  Address.updateAddress(dbCreate.connection, req.body, req.params);
  res.redirect('/address');
});

//delete
router.get('/delete/:id', function(req, res) {
  Address.deleteAddress(dbCreate.connection, req.params)
  res.redirect('/address');
});

//relation one to many
router.get('/detail/:id', function(req, res) {
  Address.joinAddress(dbCreate.connection, req.params, function(err, rows) {
    res.render('detailaddress', {
      detailAdd: rows
    });
  });
});

module.exports = router;
