'use strict'


const express = require('express');
const app = express();
var router = express.Router();

const DB = require('../model/dbModel');
const Contact = require('../model/Contacts');

let dbModel = new DB("./db/data.db")

router.get('/contact',function(req,res){
Contact.tampil(connect.connection,function(err,rows){
  res.render('contact',{pesan: rows})
  })
})


module.exports = router
