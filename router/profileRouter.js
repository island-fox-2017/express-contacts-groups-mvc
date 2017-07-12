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

router.get("/", function(req, res) {
   profile.selectTableAll(db, function(err, rows){
    res.render("profile", {data_pro : rows})
  })
})

router.get("/add", function(req, res) {
   profile.selectTableForm(db, function(err, rows){
    res.render("form-profile", {data_Con : rows})
  })
})

router.post("/add", function(req, res) {
  profile.insertTable(db, req.body)
     res.redirect("/home/profile")
})

router.post("/edit/:id",function(req, res) {
  profile.updateTable(db, req.body, req.params.id)
     res.redirect("/home/profile")
})
//Detail
router.get("/contacts/:id", function(req, res) {
  profile.selectTableDetail(db, req.params.id, function(err, rows){
    res.render("detail", {data_cont : rows})
    // console.log(db_Contact);
  })
})
//hapus
router.get("/delete/:id",function(req, res) {
  profile.deleteTable(db, req.params.id)
  res.redirect("/home/profile")
})

//edit
router.get("/edit/:id",function(req, res) {
  profile.selectDetail(db, req.params.id, function(err,rows) {
    contacts.selectTableAll(db,function(err,rows2) {
      res.render("edit-profile", {data_pro : rows, data_Con : rows2})
    })
  })
})


module.exports = router
