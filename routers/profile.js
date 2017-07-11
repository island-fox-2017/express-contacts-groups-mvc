'use strict'
var express = require('express')
var router = express.Router()

var dbModel = require('../models/dbModel')
var connector = new dbModel('./database/data.db')

var profileModel = require('../models/profileModel')


// routing profiles
router.get('/profiles', function(req,res) {
  profileModel.selectAll(connector.connection, function(err, data, data2) {
    res.render('profile', {dataProfile: data, dataKontak: data2})
  })
})

router.post('/profiles', function(req,res) {
  profileModel.insertData(connector.connection, req.body)
  res.redirect('/profiles')
})

router.get('/profiles/edit/:id', function(req,res) {
  profileModel.getEditData(connector.connection, req.params, function(err,data,data2) {
    res.render('edit_profile', {dataEdit: data, dataKontak: data2})
  })
})

router.post('/profiles/edit/:id', function(req,res) {
  profileModel.updateData(connector.connection, req.body, req.params)
  res.redirect('/profiles')
})

router.get('/profiles/delete/:id', function(req, res) {
  profileModel.deleteData(connector.connection, req.params)
  res.redirect('/profiles')
})


module.exports = router
