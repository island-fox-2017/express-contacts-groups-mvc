var express = require("express");
var router = express.Router();

//ejs
var path = require("path")
var bodyParser = require("body-parser")
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

//import profile
const ModelProfile = require("../model/modelProfile")
let profile = new ModelProfile()
const ModelContacts = require ("../model/modelContacts")
let contacts = new ModelContacts()
const ModelGroups = require("../model/modelGroups")
var groups = new ModelGroups()

//db
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./db/database.db')


//display all contact list
router.use("/", function(req, res) {
   contacts.selectTableAll(db, function(err, rows) {
     res.render("contacts", {data : rows})
  })
})
