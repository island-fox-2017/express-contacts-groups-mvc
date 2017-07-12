var express = require('express')
var router = express.Router()

const dbmodel = require('../models/DbModel');
const Contact = require('../models/contacts');
const ContactProfile = require('../models/contact-profile');
const ContactAddress = require('../models/contact-address');

let dbModel = new dbmodel ('./db/data.db');

router.get('/', function (req, res) {
  Contact.showContacts(dbModel.connection, function (err, rows) {
    if (!err) {
      res.render('contacts', {data: rows})
    }
  })
})

router.post('/', function(req, res) {
  Contact.insertDataContacts(dbModel.connection, req.body);
  res.redirect('/contacts');
});

router.get('/edit/:id', function(req, res) {
  Contact.showDataContactsById(dbModel.connection, req.params.id, function (err, rows) {
    if (!err) {
      res.render('edit', {data:rows})
    }
  })
})

router.post('/update/:id', function(req, res) {
  Contact.updateDataContactsById(dbModel.connection, req.body, req.params.id);
  res.redirect('/contacts')
})

router.get('/delete/:id', function(req, res) {
  Contact.deleteDataContacts(dbModel.connection, req.params.id);
  Contact.deleteDataContactGroupByContactId(dbModel.connection, req.params.id);
  Contact.deleteDataProfileByContactId(dbModel.connection, req.params.id);
  Contact.deleteDataAddressByContactId(dbModel.connection, req.params.id);
  res.redirect('/contacts');
})

router.get('/detail_profile/:id', function(req, res) {
  ContactProfile.showDetailContactProfileByContactId(dbModel.connection, req.params.id, function(error, rows) {
    if (!error) {
      res.render('contact-profile', {data: rows})
    }
  })
});

router.get('/detail_address/:id', function(req, res) {
  ContactAddress.showDetailContactAddressByContactId(dbModel.connection, req.params.id, function(error, rows) {
    if (!error) {
      res.render('contact-address', {data: rows})
    }
  })
});

router.get('/details/:id', function(req, res){
  Contact.forDetailGroup(dbModel.connection, req.params.id, function(err, rows){
    let datas = detailContactGroups(rows);
    res.render('contact-detail', {data: datas});
  })
})

function detailContactGroups(obj){
  let result = [];
  let check = {};

  for (let i = 0; i < obj.length; i++) {
    let tempObj = {}
    for(let j = 0; j < obj.length; j++) {
      if(!check[obj[i].first_name]) {
        tempObj['first_name'] = obj[i].first_name;
        tempObj['last_name'] = obj[i].last_name;
        tempObj['company'] = obj[i].company;
        tempObj['telp_number'] = obj[i].telp_number;
        tempObj['email'] = obj[i].email;
        tempObj['name_group'] = [];
        check[obj[i].first_name] = true;
        result.push(tempObj);
      }
    }
  }

  for(let i = 0; i < result.length; i++) {
    for(let j = 0; j < obj.length; j++) {
      if(result[i].first_name == obj[j].first_name) {
        result[i].name_group.push(obj[j].name_group);
      }
    }
  }
  return result
}

module.exports = router
