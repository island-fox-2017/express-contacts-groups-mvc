var express = require('express')
var router = express.Router();

var dbmodel = require('../models/dbModels');
var DBmodel = new dbmodel('./db/data.db');

var Cg = require('../models/cg');
var Contact = require('../models/contact');
var Group = require('../models/group');

  router.get('/', function(req, res){
    Cg.findAll(DBmodel.connection, function(err, data){
      if(!err)
      {
        Contact.findAll(DBmodel.connection, function(err, data2){
          if(!err)
          {
            Group.findAll(DBmodel.connection, function(err, data3)
            {
              res.render('cg', {dataCG: data, dataCont: data2, dataGroup: data3});
            });
          }
        });
      }});
  });

  router.post('/', function(req, res){
      Cg.AddNew(DBmodel.connection, req.body);
      res.redirect('/contactandgroup');
  });



module.exports = router;
