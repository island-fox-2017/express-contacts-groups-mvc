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


router.get("/",function(req, res) {
    groups.selectTableAll(db, function(err, rows){
    res.render("groups",{ data_groups : rows})
  })
})

router.get("/add", function(req, res) {
  res.render("groups-form")
})

router.post("/add",function(req, res) {
  groups.insertTable(db, req.body)
  res.redirect("/home/groups")
})

router.get("/edit/:id", function(req, res) {
   groups.formUpdateTable(db, req.params.id, function(err, rows){
    res.render("groups-edit", {data_groups : rows})
  })
})

router.post("/edit/:id",function(req, res) {
  groups.updateTable(db, req.body, req.params.id)
  res.redirect("/home/groups")
})

router.get("/delete/:id", function(req, res) {
  groups.deleteTable(db, req.params.id)
  res.redirect("/home/groups")
})

module.exports = router
