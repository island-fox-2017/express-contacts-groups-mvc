'use strict'

var express = require('express');
var app = express();
const router = express.Router();

var ejs = require('ejs')
app.set('view engine', 'ejs')

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


const DbModel = require('./models/DbModel')
const Contacts = require('./models/contacts')
// const Group = require('./model/groups')
// const Profil = require('./model/profil')

let connector = new DbModel('./dB/database.db')
connector.createAllTable()


// routing index
app.get('/', function(req, res) {
  res.render('index')
})

// routing contacts
app.get('/contacts', function(req, res) {
  contactModel.selectAll(connector.connection, function(err,data) {
      res.render('contact', {datacontacts: data})
  })
})

app.post('/contacts', function(req, res) {
  contactModel.insertData(connector.connection, req.body)
  res.redirect('/contacts')
})

app.get('/contacts/delete/:id',function(req, res) {
  contactModel.deleteData(connector.connection, req.params)
  res.redirect('/contacts')
})

app.get('/contacts/edit/:id', function (req, res) {
  contactModel.getEditData(connector.connection, req.params, function(err, data) {
    res.render('edit_contact', {datadit: data})
  })
})

app.post('/contacts/edit/:id', function(req, res) {
  contactModel.updateData(connector.connection, req.body, req.params)
  res.redirect('/contacts')
})

app.get('/contacts/addresses/:id', function(req, res) {
  contactModel.showAddress(connector.connection, req.params, function(err, data) {
    res.render('show_address', {dataAddress: data})
  })
})

// routing groups
app.get('/groups', function(req, res) {
  groupModel.selectAll(connector.connection, function(err, data) {
    res.render('group', {dataGrup: data})
  })
})

app.post('/groups', function(req, res) {
  groupModel.insertData(connector.connection, req.body)
  res.redirect('/groups')
})

app.get('/groups/delete/:id',function(req, res) {
  groupModel.deleteData(connector.connection, req.params)
  res.redirect('/groups')
})

app.get('/groups/edit/:id', function (req, res) {
  groupModel.getEditData(connector.connection, req.params, function(err,data) {
    res.render('edit_group', {dataEdit: data})
  })
})

app.post('/groups/edit/:id', function(req, res) {
  groupModel.updateData(connector.connection, req.body, req.params)
  res.redirect('/groups')
})

// routing profiles
app.get('/profiles', function(req, res) {
  profileModel.selectAll(connector.connection, function(err, data, data2) {
    res.render('profile', {dataProfile: data, dataContacts: data2})
  })

app.post('/profiles', function(req, res) {
  db.run(`INSERT INTO Profiles (username, password, contacts_id) VALUES ('${req.body.user_name}', '${req.body.password}', ${req.body.idcontact});`)
  res.redirect('/profiles')
})

app.get('/profiles/edit/:id', function(req, res) {
  db.all(`SELECT * FROM Profiles WHERE id = '${req.params.id}';`, function(err,data) {
    db.all(`SELECT * FROM Contacts;`, function(err,data2) {
      res.render('edit_profile', {dataedit: data, datacontacts: data2})
    })
  })
})

app.post('/profiles/edit/:id', function(req, res) {
  db.run(`UPDATE Profiles SET username = '${req.body.username}', password = '${req.body.password}', Contacts_id = '${req.body.contact}' WHERE id = '${req.params.id}';`)
  res.redirect('/profiles')
})

app.get('/profiles/delete/:id', function(req, res) {
  db.run(`DELETE FROM Profiles WHERE id = '${req.params.id}';`)
  res.redirect('/profiles')
})

// routing address
app.get('/addresses', function(req, res) {
  db.all(`SELECT Addresses.id AS idAddress, Addresses.street, Addresses.city, Addresses.zip, Addresses.Contacts_id, Contacts.name FROM Addresses JOIN Contacts ON Addresses.Contacts_id = Contacts.id;`, function(err,data) {
    db.all(`SELECT * FROM Contacts;`, function(err,data2) {
      res.render('address', {dataAdd : data, datacontacts: data2})
    })
  })
})


app.post('/addresses', function(req, res) {
  db.run(`INSERT INTO Addresses (street, city, zip, Contacts_id) VALUES ('${req.body.street}', '${req.body.city}', '${req.body.zip}', ${req.body.idcontact});`)
  res.redirect('/addresses')
})

app.get('/addresses/delete/:id', function(req, res) {
  db.run(`DELETE FROM Addresses WHERE id = '${req.params.id}'`)
  res.redirect('/addresses')
})

app.get('/addresses/edit/:id', function(req, res) {
  db.all(`SELECT * FROM Addresses WHERE id = '${req.params.id}';`, function(err, data) {
    db.all(`SELECT * FROM Contacts;`, function(err, data2) {
      res.render('edit_address', {dataedit: data, datacontacts: data2})
    })
  })
})

app.post('/addresses/edit/:id', function(req,res) {
  db.run(`UPDATE Addresses SET street = '${req.body.street}', city = '${req.body.city}', zip = '${req.body.zip}', Contacts_id = ${req.body.contact} WHERE id = ${req.params.id};`)
  res.redirect('/addresses')
})


app.listen(3003)
