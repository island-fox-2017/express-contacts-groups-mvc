const sqlite3 = require('sqlite3').verbose()

class ModelCreate {
  constructor(filename) {
    this.connection = new sqlite3.Database(filename)
  }
  tableProfile(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS Data_Profile (id INTEGER primary key AUTOINCREMENT, username TEXT, password TEXT, contact_id INTEGER)`)
  }
  tableContact(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS Data_Contact(id INTEGER primary key AUTOINCREMENT, name TEXT, company TEXT, telp_number INTEGER, email TEXT, address_id INTEGER);`)

  }
  tableGroup(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS Data_Groups(id INTEGER primary key AUTOINCREMENT, groups TEXT)`)
  }
  tableAddress(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS Data_Address(id INTEGER primary key AUTOINCREMENT, street TEXT, city TEXT, zip_code INTEGER, contact_id INTEGER)`)
  }
}
let create = new ModelCreate('./db/database.db')

create.tableProfile()
create.tableContact()
create.tableGroup()
create.tableAddress()
