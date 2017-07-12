const sqlite3 = require('sqlite3').verbose();

class dbModel{
  constructor(filename){
    this.connection = new sqlite3.Database(filename)
  }

  createContact(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS Contact (id INTEGER primary key AUTOINCREMENT, Name TEXT, Company TEXT, Telp INTEGER, Email TEXT)`);
  }
  createProfile(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS Profile (id INTEGER primary key AUTOINCREMENT, Username TEXT, Password TEXT, ContactID INTEGER)`);
  }
  createAddress(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS Address (id INTEGER primary key AUTOINCREMENT, Street TEXT, City TEXT, Zipcode INTEGER, ContactID INTEGER)`);
  }
  createGroups(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS Groups (id INTEGER primary key AUTOINCREMENT, GroupsName TEXT)`);
  }
}

// let db = new dbModel('./db/data.db')

module.exports = dbModel;
