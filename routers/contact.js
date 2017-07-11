'use strict'

const express = require('express');
const router = express.Router();
const DbModel = require('../models/DbModel');
const Contact = require('../models/Contacts');
let dbModel = new DbModel('./db/data.db');

const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./db/data.db');

// Contact Routing

// router.get('/', function(req, res) {
//   Contact.showData(dbModel.connection, function(err, rows) {
//     if(!err) {
//       //res.send(rows);
//       res.render('contacts', {datas: rows});
//     }
//   });
// });

router.get('/', function (req, res) {
  Contact.callContactPromise(dbModel.connection)
  .then(function(result) {
    res.render('contacts', {datas: result[0], slice: result[1]});
  })
});


router.post('/', function (req, res) {
  Contact.insertData(dbModel.connection, req.body);
  res.redirect('/contacts')
});

router.get('/delete/:id', function(req, res) {
  Contact.deleteData(dbModel.connection, req.params.id);
  res.redirect('/contacts');
});

router.get('/edit/:id', function (req, res) {
  Contact.editData(dbModel.connection, req.params.id, function(err, rows) {
    if(!err) {
      res.render('edit', {data: rows});
    }
  });
});

router.post('/edit/:id', function (req, res) {
  Contact.updateData(dbModel.connection, req.body);
  res.redirect('/contacts');
});

module.exports = router;
