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

// router.get('/', function (req, res) {
//   res.send(Contact.callContactPromise(dbModel.connection));
// });


router.get('/', function (req, res) {
  db.all(`
    SELECT * FROM Contacts;
    `, function(err, rows) {
      if(!err) {
        db.all(`
          SELECT
            *
          FROM
            Groups AS g
          JOIN Contacts_Groups AS cg
            ON g.id = cg.group_id
          JOIN Contacts AS c
            ON c.id = cg.contact_id
          ;
          `, function(err, rows2) {
            if(!err) {
              res.render('contacts', {datas: rows, slice: rows2});
              //res.send(rows2);
            }
          });
      }
    });
});

  //Contact.showContact(dbModel.connection, );

  //var datas = Contact.callContactPromise()
/*
  Contact.showAll(dbModel.connection, function(err, rows) {
    if(!err) {
      res.render('contacts', {datas: rows});
    }
  });


*/


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
