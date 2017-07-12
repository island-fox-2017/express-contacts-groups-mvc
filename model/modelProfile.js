const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./db/database.db")

const ModelContacts = require ("../model/modelContacts")
let contacts = new ModelContacts()

// const ModelProfile = require("./model/modelProfile")
// let profile = new ModelProfile()
class ModelProfile {
  constructor() {

  }
  selectTableDetail(conn, id, callback){
    conn.all(`SELECT Data_Profile.id, Data_Profile.username,
      Data_Profile.password,Data_Profile.contact_id, Data_Contact.name, Data_Contact.company,
      Data_Contact.telp_number, Data_Contact.email FROM Data_Profile
      JOIN Data_Contact ON Data_Profile.contact_id = Data_Contact.id
      WHERE Data_Profile.contact_id = ${id}`, function(err, rows){
        if(!err){
          callback(false,rows)
        }
        else{
          callback(true,null)
        }

      })
  }
  selectTableAll(conn, callback){
    db.all(`SELECT * FROM Data_Profile`, function(err, rows){
      if(!err){
        callback(false, rows)
      }
      else{
        callback(true,nulls)
      }
    })
  }
  selectTableForm(conn, callback){
    conn.all(`SELECT * FROM Data_Contact`, function(err, rows){
      if(!err){
        callback(false,rows)
      }
      else {
        callback(true,null)
      }
    })
  }
  insertTable(conn, data){
    conn.run(`INSERT INTO Data_Profile(username, password, contact_id) VALUES
       ("${data.username}","${data.password}","${data.contact_id}")`)
  }
  selectDetail(conn, id, callback){
    db.all(`SELECT * FROM Data_Profile WHERE id = "${id}"`, function(err, rows){
      if (!err) {
        callback(false,rows)
      }
      else{
        callback(true,null)
      }
    })
  }
  updateTable(conn, data, id){
    conn.run(`UPDATE Data_Profile SET username = "${data.username}", password = "${data.password}", contact_id = "${data.contact_id}" WHERE id = "${id}"`)

  }
  deleteTable(conn, id){
      conn.run(`DELETE FROM Data_Profile WHERE id = ${id}` )
  }
}

// let profile = new ModelProfile()

module.exports = ModelProfile
