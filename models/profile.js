const express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.json()); // digunakan saat menjalankan fungsi POST
app.use(bodyParser.urlencoded({
  extended: true
})); // hasil post di encoded

//-------untuk require export DB-----//
var setupDB = require('../models/dbmodel');
let dbCreate = new setupDB('./db/data.db');

const Contact = require('../models/contact'); // require contact.js berdasarkan classnya
// const Profile = require('./models/profile');



class Profile{
  constructor(data){
    this.id = data.id;
    this.Username = data.Username;
    this.Password = data.Password;
    this.ContactID = data.ContactID;
  }

  static showProfile(conn, callback){
    conn.all(`SELECT * FROM Profile;`, function(err, rows){
      if(!err)
      {
        callback(false, rows)
      }
      else{
        callback(true, null)
      }
    })
  }

  static contactProfile(conn, callback){
    conn.all(`SELECT * FROM Contact;`, function(err, rows){
      if(!err)
      {
        callback(false, rows);
      }
      else {
        callback(true, null);
      }
    })
  }

  static addProfile(conn, data){
    conn.run(`INSERT INTO Profile(Username, Password, ContactID) VALUES ('${data.username}', '${data.password}', '${data.contactID}')`);
  }

  static editProfile(conn, params, callback){
    conn.all(`SELECT * FROM Profile WHERE id = '${params.id}'`, function(err, result){
      if(!err)
      {
        callback(false, result);
      }
      else {
        callback(true, null);
      }
    });
  }

  static updateProfile(conn, body, params){
    conn.run(`UPDATE Profile SET Username = '${body.username}', Password = '${body.password}', ContactID = '${body.ContactID}' WHERE id = '${params.id}' `);
  }

  static deleteProfile(conn, params){
    conn.run(`DELETE FROM Profile WHERE id = '${params.id}'`);
  }

  static joinProfile(conn, params, callback){
    conn.all(`SELECT Profile.id, Profile.Username, Profile.Password, Contact.id,
      Contact.Name, Contact.Company, Contact.Telp, Contact.Email
      FROM Profile JOIN Contact ON Profile.ContactID = Contact.id
      WHERE Profile.id = ${params.id}`, function(err, rows){
      if(!err)
      {
        callback(false, rows)
      }
      else {
        callback(true, null)
      }
    });
  }

}

module.exports = Profile
