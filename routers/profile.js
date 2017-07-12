const express = require('express');
var router = express.Router();

//-------untuk require export DB-----//
var setupDB = require('../models/dbmodel');
let dbCreate = new setupDB('./db/data.db');


//----------Profile------------//
//-----------------------------//
const Contact = require('../models/contact');
const Profile = require('../models/profile');

//show profile table
router.get('/', function(req, res) {
  Profile.showProfile(dbCreate.connection, function(err, rows) {
    res.render('profile', {
      dataProfiles: rows
    });
  });
});
//go to profile
//menampilkan dropdown data contact!!
router.get('/add/', function(req, res) {
  Profile.contactProfile(dbCreate.connection, function(err, rows) {
    res.render('profileform', {
      contactData: rows
    });
  });
});
//submit data profile
router.post('/add', function(req, res) {
  Profile.addProfile(dbCreate.connection, req.body)
  res.redirect('/profile');
});
//go to profile edit form page
router.get('/edit/:id', function(req, res) {
  Profile.editProfile(dbCreate.connection, req.params, function(err, rows) {
    Contact.showContact(dbCreate.connection, function(err, rows2) {
      res.render('profileedit', {
        dataProfile: rows,
        dataContact: rows2
      });
    });
  });
});
//update profile data
router.post('/edit/:id', function(req, res) {
  Profile.updateProfile(dbCreate.connection, req.body, req.params);
  res.redirect('/profile');
});

router.get('/delete/:id', function(req, res) {
  Profile.deleteProfile(dbCreate.connection, req.params)
  res.redirect('/profile');
});

//relation one to one
router.get('/detail/:id', function(req, res) {
  Profile.joinProfile(dbCreate.connection, req.params, function(err, rows) {
    res.render('detailprof', {
      detailProf: rows
    });
  });
});

module.exports = router;
