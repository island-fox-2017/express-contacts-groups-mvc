//profile
const ModelProfile = require("./model/modelProfile")
let profile = new ModelProfile()
const ModelContacts = require ("./model/modelContacts")
let contacts = new ModelContacts()
const ModelGroups = require("./model/modelGroups")
var groups = new ModelGroups()

//router
var groupsRouter = require("./router/groupsRouter")
var contactRouter = require("./router/contactRouter")
var profileRouter = require("./router/profileRouter")

//lirary
var express = require("express")
var path = require("path")
var bodyParser = require("body-parser")
var app = express();
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./db/database.db')
app.set("view engine", "ejs");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))


app.get("/home", function(req, res) {
  res.render("index")
})
app.get("/", function(req, res) {
  res.redirect("/home")
})

//=============================

app.use("/home/profile", profileRouter)
//add
app.use("/home/profile/add", profileRouter)
app.use("/home/profile/add", profileRouter)
//edit
app.use("/home/profile/edit/:id", profileRouter)
app.use("/home/profile/edit/:id", profileRouter)
//Detail
app.use("/home/profile/contacts/:id", profileRouter)
//hapus
app.use("/home/profile/delete/:id", profileRouter)

//=========================Contacts===============================

//display all contact list
app.use("/home/contacts", contactRouter)
//display form isi Kontak
app.use("/home/contacts/add", contactRouter)
//insert ke database
app.use("/home/contacts/add", contactRouter)
//display database
app.use("/home/contacts/edit/:id", contactRouter)
//insert hasil edit database
app.use("/home/contacts/edit/:id", contactRouter)
//delete record
app.use("/home/contacts/delete/:id", contactRouter)

//===================GROUPS==================================

app.use("/home/groups", groupsRouter)
app.use("/home/groups/add", groupsRouter)
app.use("/home/groups/add", groupsRouter)
app.use("/home/groups/edit/:id", groupsRouter)
app.use("/home/groups/edit/:id", groupsRouter)
app.use("/home/groups/delete/:id", groupsRouter)


app.listen(3091);
