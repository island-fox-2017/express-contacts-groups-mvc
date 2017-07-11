'use strict'

var sqlite = require('sqlite3');
var db = new sqlite.Database('./dB/database.db');

class  DbModel {
  constructor(data) {
    this.connection = new sqlite.Database('data')
  }
  createTableContacts() {
    this.connection.run(`CREATE TABLE IF NOT EXISTS Contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, number_telp INTEGER, email INTEGER)`)
    console.log('Contacts Created');
  }

  createTableGroups() {
  this.connection.run(`CREATE TABLE IF NOT EXISTS Groups(id INTEGER PRIMARY KEY AUTOINCREMENT, user_name TEXT)`)
  console.log('Groups Created');
  }

  createTableProfile() {
    this.connection.run( `CREATE TABLE IF NOT EXISTS Profil(id INTEGER PRIMARY KEY AUTOINCREMENT,)`)
    console.log('Profil Created');
  }

  createTableAddress() {
    this.connection.run(`CREATE TABLE IF NOT EXISTS Address(id INTEGER PRIMARY KEY AUTOINCREMENT )`)
    console.log('Address Created');
  }

  createAllTable() {
    this.createTableContacts();
    this.createTableGroups();
    this.createTableProfile();
    this.createTableAddress()

  }
}


module.exports = DbModel
