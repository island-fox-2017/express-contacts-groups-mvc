//profile
const ModelProfile = require("./model/modelProfile")
let profile = new ModelProfile()
const ModelContacts = require ("./model/modelContacts")
let contacts = new ModelContacts()
const ModelGroups = require("./model/modelGroups")
var groups = new ModelGroups()

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
  // res.send("apasii")
})
app.get("/", function(req, res) {
  res.redirect("/home")
})

app.get("/home/profile", function(req, res) {
  db.all(`SELECT * FROM Data_Profile`, function(err, db_Profile) {
    res.render("profile", {data_pro : db_Profile})
  })
})

//add
app.get("/home/profile/add", function(req, res) {
  db.all(`SELECT * FROM Data_Contact`, function(err, db_Contact) {
    res.render("form-profile", {data_Con : db_Contact})
  })
})
app.post("/home/profile/add", function(req, res) {
  db.run(`INSERT INTO Data_Profile(username, password, contact_id) VALUES
     ("${req.body.username}","${req.body.password}","${req.body.contact_id}")`)
     res.redirect("/home/profile")
})

//edit
app.get("/home/profile/edit/:id",function(req, res) {
  db.all(`SELECT * FROM Data_Profile WHERE id = "${req.params.id}"`, function(err, db_Profile) {
    db.all(`SELECT * FROM Data_Contact`,function(err, db_Contact) {
      res.render("edit-profile", {data_pro : db_Profile, data_Con : db_Contact})
    })
  })
})
app.post("/home/profile/edit/:id",function(req, res) {
  db.run(`UPDATE Data_Profile SET username = "${req.body.username}", password = "${req.body.password}", contact_id = "${req.body.contact_id}" WHERE id = "${req.params.id}"`)
     res.redirect("/home/profile")
})
//Detail
app.get("/home/profile/contacts/:id", function(req, res) {
  db.all(`SELECT Data_Profile.id, Data_Profile.username,
    Data_Profile.password,Data_Profile.contact_id, Data_Contact.name, Data_Contact.company,
    Data_Contact.telp_number, Data_Contact.email FROM Data_Profile
    JOIN Data_Contact ON Data_Profile.contact_id = Data_Contact.id
    WHERE Data_Profile.contact_id = ${req.params.id}`, function(err, db_Contact) {
    res.render("detail", {data_cont : db_Contact});
    // console.log(db_Contact);
  })
})
//hapus
app.get("/home/profile/delete/:id",function(req, res) {
  // profile.deleteTable(db, req.params.id)
  profile.deleteTable(db, req.params.id)
  res.redirect("/home/profile")

})

//=========================Contacts===============================

//display all contact list
app.get("/home/profile/contacts/", function(req, res) {
   contacts.selectTableAll(db, function(err, rows) {
     res.render("contacts", {data : rows})
  })
})

//display form isi Kontak
app.get("/home/contacts/add", function(req, res) {
  res.render("form-contact")
})

//insert ke database
app.post("/home/profile/contacts/add", function(req, res) {
  contacts.insertTable(db, req.body)
  res.redirect("/home/profile/contacts")
})

//display database
app.get("/home/profile/contacts/edit/:id",function(req, res) {
   contacts.formUpdateTable(db, req.params.id, function(err, rows){
    res.render("edit-contact", {data : rows})
  })
})
//insert hasil edit database
app.post("/home/profile/contacts/edit/:id",function(req, res) {
  contacts.updateTable(db, req.body, req.params.id)
  res.redirect("/home/profile/contacts")
})
//delete record
app.get("/home/profile/contacts/delete/:id", function(req, res) {
  contacts.deleteTable(conn, id)
  res.redirect("/home/profile/contacts")
})

//===================GROUPS==================================

app.get("/home/groups",function(req, res) {
    groups.selectTableAll(db, function(err, rows){
    res.render("groups",{ data_groups : rows})
  })
})

app.get("/home/groups/add", function(req, res) {
  res.render("groups-form")
})

app.post("/home/groups/add",function(req, res) {
  groups.insertTable(db, req.body)
  res.redirect("/home/groups")
})

app.get("/home/groups/edit/:id", function(req, res) {
   groups.formUpdateTable(db, req.params.id, function(err, rows){
    res.render("groups-edit", {data_groups : rows})
  })
})
app.post("/home/groups/edit/:id",function(req, res) {
  groups.updateTable(db, req.body, req.params.id)
  res.redirect("/home/groups")
})
app.get("/home/groups/delete/:id", function(req, res) {
  groups.deleteTable(db, req.params.id)
  res.redirect("/home/groups")
})


app.listen(3091);
