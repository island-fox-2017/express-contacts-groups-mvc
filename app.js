'use strict'

var path = require('path');
var path_name = path.join(__dirname, 'public');

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
const Group = require('./models/groups')
const Profil = require('./models/profil')

let connector = new DbModel('./dB/database.db')
connector.createAllTable()


app.listen(3003)
