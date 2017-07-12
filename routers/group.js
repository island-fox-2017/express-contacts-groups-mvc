const express = require('express');
var router = express.Router();

//-------untuk require export DB-----//
var setupDB = require('../models/dbmodel');
let dbCreate = new setupDB('./db/data.db');

//-------------GAP---------------//
// //------------GROUP-------------//
// //-------------GAP-------------//
//
const Group = require('../models/group');
//
//show group table
router.get('/', function(req, res) {
  Group.showGroup(dbCreate.connection, function(err, rows) {
    res.render('group', {
      dataGroup: rows
    });
  });
});
// going to group form for add group
router.get('/addgroup', function(req, res) {
  res.render('groupaddform');
})
//add value on form group page
router.post('/addgroup', function(req, res) {
  Group.addGroup(dbCreate.connection, req.body);
  res.redirect('/group');
});
//edit group
router.get('/edit/:id', function(req, res) {
  Group.editGroup(dbCreate.connection, req.params, function(err, rows) {
    res.render('groupedit', {
      dataGroup: rows
    });
  });
});
//edit value of group
router.post('/edit/:id', function(req, res) {
  Group.editGroupData(dbCreate.connection, req.body, req.params.id);
  res.redirect('/group');
})
//delete group datas
router.get('/delete/:id', function(req, res) {
  Group.deleteGroups(dbCreate.connection, req.params)
  res.redirect('/group');
});


module.exports = router;
