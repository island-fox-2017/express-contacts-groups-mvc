const express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.json()); // digunakan saat menjalankan fungsi POST
app.use(bodyParser.urlencoded({
  extended: true
})); // hasil post di encoded

var path_name = path.join(__dirname, 'public'); // untuk memanggil isi file dari public yg non ejs, ejs tidak boleh di dalam folder public, karna public hanya untuk file yang bersifat static
var express_static = express.static(path_name);

//-------untuk require export DB-----//
var setupDB = require('./models/dbmodel');
let dbCreate = new setupDB('./db/data.db');

//--------CREATE TABLE DB-------------//
app.get('/dbcontact', function(req, res) {
  dbCreate.createContact();
  res.send('database created');
})

app.get('/dbgroup', function(req, res) {
  dbCreate.createGroups();
  res.send('database created');
})

app.get('/dbprofile', function(req, res) {
  dbCreate.createProfile();
  res.send('database created');
})

app.get('/dbaddress', function(req, res) {
  dbCreate.createAddress();
  res.send('database created');
})

const home = require('./routers/home')
const contacts = require('./routers/contact')
const groups = require('./routers/group')
const profiles = require('./routers/profile')
const addresses = require('./routers/address')

app.use('/home', home);
app.use('/contact', contacts);
app.use('/group', groups);
app.use('/profile', profiles);
app.use('/address', addresses);


// //---------------ORM-------------------//
// //------------ORM CONTACT-------------//
// const Contact = require('./models/contact'); // require contact.js berdasarkan classnya
// //show homepage
// app.get('/home', function(req, res) {
//   // Contact.findAll(dbCreate.connection, function(err, rows){
//   //   console.log(rows);
//   // });
//   res.render('home');
// });
// //show table contact
// app.get('/contact', function(req, res) {
//   Contact.showContact(dbCreate.connection, function(err, rows) {
//     res.render('contact', {
//       data_contact: rows
//     });
//   });
// });
// //show insert data to form
// app.get('/contact/add', function(req, res) {
//   res.render('form');
// });
// //insert and submit data form Contact
// app.post('/contact/add', function(req, res) {
//   Contact.addContact(dbCreate.connection, req.body);
//   res.redirect('/contact');
// });
// //take data to form edit page
// app.get('/contact/edit/:id', function(req, res) {
//   Contact.editContact(dbCreate.connection, req.params, function(err, rows) {
//     res.render('edit', {
//       data: rows
//     })
//   })
// })
// //edit submit and back to contact page
// app.post('/contact/edit/:id', function(req, res) {
//   Contact.editContactData(dbCreate.connection, req.body, req.params.id);
//   res.redirect('/contact');
// });
// //delete contact
// app.get('/contact/delete/:id', function(req, res) {
//   Contact.deleteContact(dbCreate.connection, req.params);
//   res.redirect('/contact');
// });

// //-------------GAP---------------//
// //------------GROUP-------------//
// //-------------GAP-------------//
//
// const Group = require('./models/group');
//
// //show group table
// app.get('/group', function(req, res) {
//   Group.showGroup(dbCreate.connection, function(err, rows) {
//     res.render('group', {
//       dataGroup: rows
//     });
//   });
// });
// // going to group form for add group
// app.get('/group/addgroup', function(req, res) {
//   res.render('groupaddform');
// })
// //add value on form group page
// app.post('/group/addgroup', function(req, res) {
//   Group.addGroup(dbCreate.connection, req.body);
//   res.redirect('/group');
// });
// //edit group
// app.get('/group/edit/:id', function(req, res) {
//   Group.editGroup(dbCreate.connection, req.params, function(err, rows) {
//     res.render('groupedit', {
//       dataGroup: rows
//     });
//   });
// });
// //edit value of group
// app.post('/group/edit/:id', function(req, res) {
//   Group.editGroupData(dbCreate.connection, req.body, req.params.id);
//   res.redirect('/group');
// })
// //delete group datas
// app.get('/group/delete/:id', function(req, res) {
//   Group.deleteGroups(dbCreate.connection, req.params)
//   res.redirect('/group');
// });

// //----------Profile------------//
// //-----------------------------//
// const Profile = require('./models/profile');
//
// //show profile table
// app.get('/profile', function(req, res) {
//   Profile.showProfile(dbCreate.connection, function(err, rows) {
//     res.render('profile', {
//       dataProfiles: rows
//     });
//   });
// });
// //go to profile
// //menampilkan dropdown data contact!!
// app.get('/profile/add/', function(req, res) {
//   Profile.contactProfile(dbCreate.connection, function(err, rows) {
//     res.render('profileform', {
//       contactData: rows
//     });
//   });
// });
// //submit data profile
// app.post('/profile/add', function(req, res) {
//   Profile.addProfile(dbCreate.connection, req.body)
//   res.redirect('/profile');
// });
// //go to profile edit form page
// app.get('/profile/edit/:id', function(req, res) {
//   Profile.editProfile(dbCreate.connection, req.params, function(err, rows) {
//     Contact.showContact(dbCreate.connection, function(err, rows2) {
//       res.render('profileedit', {
//         dataProfile: rows,
//         dataContact: rows2
//       });
//     });
//   });
// });
// //update profile data
// app.post('/profile/edit/:id', function(req, res) {
//   Profile.updateProfile(dbCreate.connection, req.body, req.params);
//   res.redirect('/profile');
// });
//
// app.get('/profile/delete/:id', function(req, res) {
//   Profile.deleteProfile(dbCreate.connection, req.params)
//   res.redirect('/profile');
// });
//
// //relation one to one
// app.get('/profile/detail/:id', function(req, res) {
//   Profile.joinProfile(dbCreate.connection, req.params, function(err, rows) {
//     res.render('detailprof', {
//       detailProf: rows
//     });
//   });
// });

//-------------Address------------//
//-------------------------------//

// const Address = require('./models/address');
//
// //show table Address
// app.get('/address', function(req, res) {
//   Address.showAddress(dbCreate.connection, function(err, rows) {
//     res.render('address', {
//       dataAddress: rows
//     });
//   });
// });
// //add new address
// app.get('/address/add', function(req, res){
//   Address.contactProfile(dbCreate.connection, function(err, rows){
//   res.render('addressform', {dataContact: rows});
//   })
// })
// //add and submit address data
// app.post('/address/add', function(req, res){
//   Address.addAddress(dbCreate.connection, req.body)
//   res.redirect('/address');
// })
// //edit form
// app.get('/address/edit/:id', function(req, res) {
//   Address.editAddress(dbCreate.connection, req.params, function(err, rows) {
//     Contact.showContact(dbCreate.connection, function(err, rows2) {
//       res.render('addressedit', {
//         dataAddress: rows,
//         dataContact: rows2
//       });
//     });
//   });
// });
// //update profile data
// app.post('/address/edit/:id', function(req, res) {
//   Address.updateAddress(dbCreate.connection, req.body, req.params);
//   res.redirect('/address');
// });
//
// //delete
// app.get('/address/delete/:id', function(req, res) {
//   Address.deleteAddress(dbCreate.connection, req.params)
//   res.redirect('/address');
// });
//
// //relation one to many
// app.get('/address/detail/:id', function(req, res) {
//   Address.joinAddress(dbCreate.connection, req.params, function(err, rows) {
//     res.render('detailaddress', {
//       detailAdd: rows
//     });
//   });
// });

app.listen(3000);
