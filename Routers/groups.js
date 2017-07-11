const express = require('express');
const dbModel = require('../Models/dbModels');
const dbGroups = require('../Models/dbGroups');


var dbmodel = new dbModel('./db/contact_group.db')
var router = express.Router();

router.get('/', function(req, res){
  dbGroups.selectAll(dbmodel.conn, function (err, rows){
    if (!err) res.render('groups', {header : 'Groups Page', data_groups : rows });
    else res.send(`ada error ${err}`);
  })
})

router.post('/', function(req, res){
  dbGroups.insert(dbmodel.conn, req.body);
  res.redirect('/groups')
})

router.get('/edit/:id', function(req, res){
  dbGroups.selectById(dbmodel.conn, req.params.id, function(err, rows){
    if(!err) res.render('edit_group', {header : 'Edit Group Page', data_groups : rows});
    else res.send(`ada error ${err}`);
  })
})

router.post('/edit/:id', function(req, res){
  dbGroups.update(dbmodel.conn, req.params.id, req.body);
  res.redirect('/groups');
})

router.get('/delete/:id', function(req, res){
  dbGroups.delete(dbmodel.conn, req.params.id);
  res.redirect('/groups');
})





module.exports = router;
