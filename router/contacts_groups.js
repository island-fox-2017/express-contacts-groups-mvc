var express = require('express');
var router = express.Router();

const dbModel = require('../models/db_model');
const db = new dbModel('./db/contacts.db');
const contactGroup = require('../models/contacts_groups');
const contact = require('../models/contacts');
const group = require('../models/groups');

router.get('/', function(req, res) {
  contactGroup.selectAll(db.connection, function(err, rows) {
    contact.selectAll(db.connection, function(err1, rows1) {
      group.selectAll(db.connection, function(err2, rows2) {        
        res.render('contacts_groups', {contactGroup: rows, name_contact: rows1, name_group: rows2})
      })
    })
  })
})

router.post('/add', function(req,res) {
  contact.selectAll(db.connection, function(err1, rows1) {
    group.selectAll(db.connection, function(err2, rows2) {  
      res.render('contacts_groups_add', {name_contact: rows1, name_group: rows2})
    })
  })
})

router.post('/', function(req, res) {
  contactGroup.insertData(db.connection, req.body)
    res.redirect('/contacts_groups')
})

module.exports = router