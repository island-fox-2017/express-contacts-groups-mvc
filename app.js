'use strict'

const express = require('express');
const app = express();
//var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database("./db/data.db")
var bodyParser = require('body-parser');
// let hapus = require('./setup.js');
const DB = require('./model/dbModel');
const Contact = require('./model/Contacts');
const Groups = require('./model/Groups');
var connect = new DB();
var index = require('./Router/index');
var contact = require('./Router/index')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set( "view engine", 'ejs')

//*********************/***************************************************************************


app.use('/',index);
app.use('/contact',contact)
//******************Contact************************************************************************


app.post('/contact',function(req,res){
  Contact.tambah(connect.connection,req.body)
  res.redirect('/contact')
})

app.get('/contact/edit/:id',function(req,res){
  Contact.edit(connect.connection,req.params.id,function(err,rows){
  if (!err)res.render("edit",{data : rows})
  else res.send('eror =${err}')
 })
})

app.post('/contact/edit/:id',function(req,res){
  Contact.update(connect.connection,req.body,req.params.id)
  res.redirect('/contact')
})

app.get('/contact/delete/:id',function(req,res){
  Contact.delete(connect.connection,req.params.id)
  res.redirect('/contact')
})

//******************Groups************************************************************************

app.get('/groups',function(req,res){
Groups.tampil(connect.connection,function(err,rows){
  res.render('groups',{tabelGroups: rows})
  })
})

app.post('/groups',function(req,res){
  Groups.tambah(connect.connection,req.body)
  res.redirect('/groups')
})

app.get('/groups/editgroups/:id',function(req,res){
  Groups.edit(connect.connection,req.params.id,function(err,rows){
  if (!err)res.render("editgroups",{tabelGroups : rows})
  else res.send('eror =${err}')
 })
})

app.post('/groups/editgroups/:id',function(req,res){
  Groups.update(connect.connection,req.body,req.params.id)
  res.redirect('/groups')
})

app.get('/groups/delete/:id',function(req,res){
  Groups.delete(connect.connection,req.params.id)
  res.redirect('/groups')
})

//*******************PROFILE**********************************************

app.get('/profiles',function(req,res){
  db.all("SELECT * FROM Profiles",function(err,rows){
    db.all("SELECT id,nama FROM Contacts",function(err,rows2){
    res.render('profiles',{isiProfile : rows, isiProfile2 : rows2})
    })
  })
})

app.post('/profiles',function(req,res){
  db.all(`INSERT INTO Profiles(username,password,contact_id) VALUES ('${req.body.Name}','${req.body.Password}','${req.body.Contactid}') `)
  res.redirect('/profiles')
})

app.get('/profiles/editprofiles/:id',function(req,res){
  db.all(`SELECT * FROM Profiles WHERE id = ${req.params.id}`,function(err,rows){
    res.render("editprofiles",{isiProfile : rows})
  })
})

app.post('/profiles/editprofiles/:id',function(req,res){
  db.all(`UPDATE Profiles SET username = '${req.body.Name}',password = '${req.body.Password}',contact_id = '${req.body.Contactid}' WHERE id = ${req.params.id}` )
    res.redirect('/profiles')
})

app.get('/profiles/deleteProfiles/:id',function(req,res){
  db.run(`DELETE FROM Profiles WHERE id = ${req.params.id}`)
  res.redirect('/profiles')
})

//*********************************showContact***********************************

app.get('/profiles/showContact/:id',function(req,res){
  db.all(`SELECT * FROM Contacts WHERE Contacts.id = ${req.params.id}`,function(err,rows){
    res.render("showContact",{isiProfile :rows})
  })
})

//***********************************Adress**************************************

app.get('/address',function(req,res){
  db.all("SELECT * FROM Address",function(err,rows){
    db.all("SELECT id,nama FROM Contacts",function(err,rows3){
      res.render('address',{isiAddress : rows,isiAddress3 : rows3})
    })
  })
})

app.post(`/address`,function(req,res){
  db.all(`INSERT INTO Address(street,city,province,zip_code,contact_id) VALUES ('${req.body.Name}','${req.body.City}','${req.body.Province}','${req.body.Zipcode}','${req.body.Contactid}')`)
})

app.get('/address/deleteAddres/:id',function(req,res){
  db.run(`DELETE FROM Address WHERE id = ${req.params.id}`)
  res.redirect('/address')
})

app.get('/contact/showaddress/:id',function(req,res){
  db.all(`SELECT * FROM Address WHERE  Address.contact_id = ${req.params.id}`,function(err,rows){
    res.render('showaddress',{isiAddress : rows})
  })
})
app.listen(3000)


/**
/** EXPRESS CONTACTS-GROUPS
---------------------------
Buatlah sebuah aplikasi sederhana menggunakan Express JS dan SQLITE3 untuk
menampilkan list Contact&Group, menambah data Contact&Group,
melakukan edit data dan delete data berdasarkan data yang dipilih

- Release 0
1. Buatlah file dengan nama setup.js yang akan dijalankan pertama kali untuk membuat
table pada database. Tentukan column mana saja yang akan di set unique.
2. Berikan validasi di setiap create table sehingga meskipun setup dijalankan berulang
kali, tidak error

Structure table:
* Contacts: id type integer, name type string, company type string, telp_number type string, email type string
* Groups: id type integer, name_of_group type string

- Release 1 - Basic Routing for Contacts dan Groups
Buatlah sejumlah route berikut dan tampilkan melalui view engine ejs
----------------------------------------------------------------------
METHOD | ROUTE                | KETERANGAN
----------------------------------------------------------------------
GET    | /contacts            | Menampilkan semua data contacts
POST   | /contacts            | Menerima data form untuk input contact
GET    | /contacts/edit/:id   | Menampilkan data contact spesifik untuk diubah
POST   | /contacts/edit/:id   | Menerima data form untuk update contact
GET    | /contacts/delete/:id | Menghapus data contact berdasarkan id
GET    | /groups              | Menampilkan semua data groups
POST   | /groups              | Menerima data form untuk input group
GET    | /groups/edit/:id     | Menampilkan data group spesifik untuk diubah
POST   | /groups/edit/:id     | Menerima data form untuk update group
GET    | /groups/delete/:id   | Menghapus data group berdasarkan id

- Release 2
  AKAN DIBERITAHUKAN SETELAH LECTURE SIANG
**/
