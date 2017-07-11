var express = require('express')
var router = express.Router();

var dbmodel = require('../models/dbModels');
var DBmodel = new dbmodel('./db/data.db');

var Address = require('../models/address');
var Contact = require('../models/contact');

router.get('/', function(req, res){
    Address.findAll(DBmodel.connection, function(err, data){
      if(!err)
      {
        Contact.findAll(DBmodel.connection, function(err, data2)
        {
        res.render('address', {dataAdd: data, dataCon: data2});
        });
      }
    });
  });

  // post add new address
  router.post('/', function(req, res){
      Address.AddNew(DBmodel.connection, req.body);
      res.redirect('/address');
  });

  router.get('/edit/:id', function(req, res){
    Address.edit(DBmodel.connection, req.params.id, function(err, result){
      if(!err)
      {
          Contact.findAll(DBmodel.connection, function(err, result2){
          res.render('addressedit', {dataAdd: result, dataCon: result2});
          });
      }
    });
  });

  // post the edited
  router.post('/edit/:id', function(req, res){
    Address.updateEdit(DBmodel.connection, req.params.id, req.body);
    res.redirect('/address');
  })

  router.get('/delete/:id', function(req, res){
    Address.deleteCont(DBmodel.connection, req.params.id);
    res.redirect('/address');
  })


module.exports = router;
