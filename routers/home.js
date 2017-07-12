const express = require('express');
var router = express.Router();

//-------untuk require export DB-----//
var setupDB = require('../models/dbmodel');
let dbCreate = new setupDB('./db/data.db');

router.get('/', function(req, res) {
  // Contact.findAll(dbCreate.connection, function(err, rows){
  //   console.log(rows);
  // });
  res.render('home');
});


module.exports = router;
