'use strict'

const express = require('express');
const router = express.Router();
const DbModel = require('../models/dbModels');
const Address = require('../models/address');
const Contacts = require('../models/contacts')
let dbModel = new DbModel('./db/data.db');

const connection = dbModel.connection;

//Address Routing
router.get('/', function(req, res){
  Address.findAll(connection, function(errs, rows){
    if(!errs){
      Contacts.findAll(connection, function(errs, rows2){
        res.render('address',{datas: rows, data2: rows2});
      })
    }
  })
})

router.post('/', function(req, res){
  Address.insertData(connection, req.body)
  res.redirect('/address')
})

router.get('/delete/:id', function(req, res){
  Address.deleteData(connection, req.params.id);
  res.redirect('/address')
})

router.get('/edit/:id', function(req, res){
  Address.findById(connection, req.params.id, function(err, rows){
    Contacts.findAll(connection, function(err, rows2){
      res.render('editAddress', {datas: rows, data_contact: rows2})
    })
  })
})

router.post('/edit/:id', function(req, res){
  Address.updateData(connection, req.body, req.params.id)
  res.redirect('/address')
})


module.exports = router;
