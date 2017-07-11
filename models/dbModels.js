'use strict'

const sqlite3 = require('sqlite3').verbose();


class DbModel{
    constructor(filename){
      this.connection = new sqlite3.Database(filename);
    }

    createTabelContact(){
      this.connection.run(`CREATE TABLE IF NOT EXISTS Contacts (
        id INTEGER primary key AUTOINCREMENT,
        name varchar(50),
        company varchar(50),
        telp_number varchar(15),
        email varchar(50)
      );`)
    }

    createTabelGroups(){
      this.connection.run(`CREATE TABLE IF NOT EXISTS Groups (
        id INTEGER primary key AUTOINCREMENT,
        name_of_group varchar(50)
      );`)
    }

    createTabelProfiles(){
      this.connection.run(`CREATE TABLE IF NOT EXISTS Profiles (
        id INTEGER primary key AUTOINCREMENT,
        username varchar(50),
        password varchar(50),
        contacts_id INTEGER
      );`);
    }

    createTabelAddress(){
      this.connection.run(`CREATE TABLE IF NOT EXISTS Address(
        id INTEGER primary key AUTOINCREMENT,
        street varchar(50),
        city varchar(50),
        zip_code varchar(50),
        contacts_id INTEGER
      );`);
    }

    createTableGroupsContacts(){
      this.connection.run(`CREATE TABLE IF NOT EXISTS GroupsContacts (
        id INTEGER primary key AUTOINCREMENT,
        contacts_id INTEGER,
        groups_id INTEGER
      );`);
    }

    createAllTable(){
      this.createTabelAddress();
      this.createTabelProfiles();
      this.createTabelGroups();
      this.createTabelContact();
      this.createTableGroupsContacts();
    }
}

module.exports = DbModel;