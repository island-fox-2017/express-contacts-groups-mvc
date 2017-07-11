var express = require('express')
var router = express.Router();

var dbmodel = require('../models/dbModels');
var DBmodel = new dbmodel('./db/data.db');

var Contact = require('../models/contact');

router.get('/', function(req, res){
  Contact.findAll(DBmodel.connection, function(err, rows){
    res.render('contact', {data_contact: rows});
  });
});

//go to form page
router.get('/add', function(req, res){
  res.render('form');
});

// to add new contact
router.post('/add', function(req, res){
  Contact.AddNew(DBmodel.connection, req.body);
  res.redirect('/contact');
})

// go to edit page
router.get('/edit/:id', function(req, res){
  Contact.edit(DBmodel.connection, req.params.id, function(err, rows){
    res.render('edit', {data: rows});
  });
});

// post edit from the form page
router.post('/edit/:id', function(req, res){
  Contact.updateEdit(DBmodel.connection, req.params.id, req.body)
  res.redirect('/contact');
});

// delete contact data
router.get('/delete/:id', function(req, res){
  Contact.deleteCont(DBmodel.connection, req.params.id);
  res.redirect('/contact');
});

router.get('/address/:id', function(req, res){
  Contact.findAdd(DBmodel.connection, req.params.id, function(err, data){
    if(!err)
    {
    res.render('contactAdd', {dataAdd: data});
    }
  });
});


module.exports = router;
