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


class Address{
  constructor(data){
    this.id = data.id;
    this.Street = data.Street;
    this.City = data.City;
    this.Zipcode = data.Zipcode;
    this.ContactID = data.ContactID;
  }

  static showAddress(conn, callback){
    conn.all(`SELECT * FROM Address`, function(err, rows){
      if(!err)
      {
        callback(false, rows)
      }
      else {
        callback(true, null)
      }
    })
  }

  static contactProfile(conn, callback){
    conn.all(`SELECT * FROM Contact`, function(err, rows){
      if(!err)
      {
        callback(false, rows)
      }
      else {
        callback(true, null)
      }
    })
  }

  static addAddress(conn, data){
    conn.run(`INSERT INTO Address(Street, City, Zipcode, ContactID) VALUES ('${data.street}', '${data.city}', '${data.zipcode}', '${data.contactID}')`);
  }

  static editAddress(conn, params, callback){
    conn.all(`SELECT * FROM Address WHERE id = '${params.id}'`, function(err, result){
      if(!err)
      {
        callback(false, result);
      }
      else {
        callback(true, null);
      }
    });
  }

  static updateAddress(conn, body, params){
    conn.run(`UPDATE Address SET Street = '${body.street}', City = '${body.city}',Zipcode = '${body.zipcode}', ContactID = '${body.ContactID}' WHERE id = '${params.id}' `);
  }

  static deleteAddress(conn, params){
    conn.run(`DELETE FROM Address WHERE id = '${params.id}'`);
  }

  static joinAddress(conn, params, callback){
    conn.all(`SELECT Address.id, Address.Street, Address.City,
      Address.Zipcode, Address.ContactID, Contact.id,
      Contact.Name, Contact.Company, Contact.Telp, Contact.Email
      FROM Address JOIN Contact ON Address.ContactID = Contact.id
      WHERE Address.id = ${params.id}`, function(err, rows){
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


module.exports = Address
