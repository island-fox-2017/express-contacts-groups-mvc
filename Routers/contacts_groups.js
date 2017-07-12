const express = require('express');
const dbModel = require('../Models/dbModels');
const dbContacts = require('../Models/dbContacts');
const dbGroups = require('../Models/dbGroups');
const dbContactsGroups = require('../Models/dbContactsGroups')

var router = express.Router();
var dbmodel = new dbModel('./db/contact_group.db');

router.get('/', function(req, res){
  dbContactsGroups.selectAll(dbmodel.conn, function(err, rows1){
    dbContacts.selectAll(dbmodel.conn, function(err, rows2){
      dbGroups.selectAll(dbmodel.conn, function(err, rows3){
        res.render('contacts_groups', {header : 'This is Groups Contacts', dataContactsGroups : rows1, dataContacts : rows2, dataGroups : rows3})
        console.log(rows2);
      })
    });
  });
});

router.post('/', function(req, res){
  dbContactsGroups.insert(dbmodel.conn, req.body);
  res.redirect('/')
})

module.exports = router;
