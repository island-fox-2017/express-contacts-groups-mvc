var express = require('express')
var router = express.Router();

var dbmodel = require('../models/dbModels');
var DBmodel = new dbmodel('./db/data.db');

var Group = require('../models/group');

router.get('/', function(req, res){
    Group.findAll(DBmodel.connection, function(err, rows){
      res.render('group', {dataGroup: rows});
    });
});

  //go to group form to add group
  router.get('/group/addgroup', function(req, res){
    res.render('groupaddform');
  });

  //add new group on database
  router.post('/group/addgroup', function(req, res){
    Group.AddNew(DBmodel.connection, req.body);
    res.redirect('/group');
  })

  //go to the group edit form
  router.get('/group/edit/:id', function(req, res){
    Group.edit(DBmodel.connection, req.params.id, function(err, rows){
      res.render('groupedit', {dataGroup: rows});
    });
  });

  //edit data group from groupeditform
  router.post('/group/edit/:id', function(req, res){
    Group.updateEdit(DBmodel.connection, req.params.id, req.body);
    res.redirect('/group');
  })

  //delete data from group info interface
  router.get('/group/delete/:id', function(req, res){
    Group.deleteCont(DBmodel.connection, req.params.id);
    res.redirect('/group');
  });

module.exports = router;
