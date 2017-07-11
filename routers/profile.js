var express = require('express')
var router = express.Router();

var dbmodel = require('../models/dbModels');
var DBmodel = new dbmodel('./db/data.db');

var Profile = require('../models/profile');
var Contact = require('../models/contact');

router.get('/', function(req, res){
    Profile.findAll(DBmodel.connection, function(err, data){
      if(!err)
      {
        Contact.findAll(DBmodel.connection, function(err, data2)
        {
        res.render('profile', {dataProfile: data, dataCont: data2});
        });
      }
    });
  });

  // post add new profile
  router.post('/', function(req, res){
      Profile.AddNew(DBmodel.connection, req.body);
      res.redirect('/profile');
  });

  // edit profiles
  router.get('/edit/:id', function(req, res){
    Profile.edit(DBmodel.connection, req.params.id, function(err, result){
      if(!err)
      {
          Contact.findAll(DBmodel.connection, function(err, result2){
          res.render('profileedit', {dataProfile: result, dataCon: result2});
          });
      }
    });
  });

  // post the edited
  router.post('/edit/:id', function(req, res){
    Profile.updateEdit(DBmodel.connection, req.params.id, req.body);
    res.redirect('/profile');
  })

  // delete profile
  router.get('/delete/:id', function(req, res){
    Profile.deleteCont(DBmodel.connection, req.params.id);
    res.redirect('/profile');
  })
  // contact details from profile !!
  router.get('/contact/:id', function(req, res){
    Profile.findCont(DBmodel.connection, req.params.id, function(err, result){
      if(!err)
      {
      res.render('profileContact', {dataProfCont: result});
      }
    });
  });




module.exports = router;
