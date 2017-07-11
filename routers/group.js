'use strict'
var express = require('express')
var router = express.Router()

var dbModel = require('../models/dbModel')
var connector = new dbModel('./database/data.db')

var groupModel = require('../models/groupModel')


// routing groups
router.get('/groups', function(req,res) {
  groupModel.selectAll(connector.connection, function(err,data) {
    res.render('group', {dataGrup: data})
  })
})

router.post('/groups', function(req,res) {
  groupModel.insertData(connector.connection, req.body)
  res.redirect('/groups')
})

router.get('/groups/delete/:id',function(req, res) {
  groupModel.deleteData(connector.connection, req.params)
  res.redirect('/groups')
})

router.get('/groups/edit/:id', function (req,res) {
  groupModel.getEditData(connector.connection, req.params, function(err,data) {
    res.render('edit_group', {dataEdit: data})
  })
})

router.post('/groups/edit/:id', function(req,res) {
  groupModel.updateData(connector.connection, req.body, req.params)
  res.redirect('/groups')
})



module.exports = router
