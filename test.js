const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./db/contact_group.db'); //dilihat dari folder project

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')))

const DbModel = require('./models/DbModel');
const Contact = require('./models/contact');

let dbModel = new DbModel('./db/contact_group.db');

const index = require('./routes/index')

app.listen(3000)

//Models
app.get('/', function(req, res){
  res.render('index')
})

app.get('/contacts', function(req, res){
  Contact.findAll(dbModel.connection, function(err, rows){
    if(!err){
      res.render('contacts', {data_contact : rows})
    }
  })
})

app.post('/contacts', function(req, res){
  Contact.create(dbModel.connection, req.body)
    res.redirect('/contacts')
})

app.get('/contacts/edit/:id', function(req, res){
  Contact.findById(dbModel.connection, req.params.id, function(err, rows){
    if(!err){
      res.render('editContacts', {dataContact : rows})
    }
  });
})

app.post('/contacts/edit/:id', function(req, res){
  Contact.update(dbModel.connection, req.body, req.params.id);
  res.redirect('/contacts')
})

app.get('/contacts/delete/:id', function(req, res){
  Contact.destroy(dbModel.connection, req.params.id);
  res.redirect('/contacts');
})









//Routing
app.use('/', index)
