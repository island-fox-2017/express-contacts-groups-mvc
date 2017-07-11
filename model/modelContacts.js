const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./db/database.db")

class ModelContacts {
  constructor(data) {
  //   this.id = data.id
  //   this.name = data.name
  //   this.company = data.company
  //   this.telp = data.telp_number
  //   this.email = data.email
  }
  selectTableAll(conn, callback){
    conn.all(`SELECT * FROM Data_Contact`, function(err, rows){
      if(!err){
        callback(false,rows)
      }
      else{
        callback(true,null)
      }
    })
  }

  insertTable(conn, data){
    conn.run(`INSERT INTO Data_Contact(name, company, telp_number, email) VALUES
    ("${data.name}","${data.company}","${data.telp})","${data.email}")`)
  }
  formUpdateTable(conn, id, callback){
    conn.all(`SELECT * FROM Data_Contact WHERE id = "${id}"`, function(err, rows){
      if(!err){
        callback(false,rows)
      }
      else {
        callback(true,rows)
      }

    })
  }

  updateTable(conn, data, id){
    db.run(`UPDATE Data_Contact SET name = "${data.name}", company = "${data.company}", telp_number = "${data.telp}", email = "${data.email}" WHERE id = "${id}"`)
  }

  deleteTable(conn, id){
    conn.run(`DELETE FROM Data_Contact WHERE id = "${id}"`)
  }
}

// let profile = new ModelProfile()

module.exports = ModelContacts
