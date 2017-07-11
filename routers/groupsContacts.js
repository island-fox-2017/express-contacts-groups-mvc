'use strict'

const express = require('express');
const router = express.Router();
const DbModel = require('../models/dbModels');
const Groups = require('../models/groups');
const Contacts = require('../models/contacts');
const GroupsContacts = require('../models/groupsContacts');
let dbModel = new DbModel('./db/data.db');


const connection = dbModel.connection;

//groupsContacts Routing
router.get('/', function(req, res){
  GroupsContacts.findAll(connection, function(err, rows){
    Contacts.findAll(connection, function(err, rows2){
      Groups.findAll(connection, function(err, rows3){
        res.render('groups-contacts', {datas: rows, data_c: rows2, data_g: rows3});
      })
    })
  })
})

router.post('/', function(req, res){
  GroupsContacts.insertData(connection, req.body);
  res.redirect('/groups-contacts');
})


module.exports = router;
