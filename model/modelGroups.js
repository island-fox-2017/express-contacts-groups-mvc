const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./db/database.db")

class ModelGroups {
  constructor(data) {

  }
  selectTableAll(conn, callback){
    conn.all(`SELECT * FROM Data_Groups`,function(err, rows){
      if(!err){
        callback(false,rows)
      }
      else{
        callback(true,null)
      }
    })
  }
  insertTable(conn, data){
    conn.run(`INSERT INTO Data_Groups(groups) VALUES ("${data.groups}")`)
  }

  formUpdateTable(conn, id, callback){
    conn.all(`SELECT * FROM Data_Groups WHERE id = "${id}"`, function(err, rows){
      if(!err){
        callback(false,rows)
      }
      else{
        callback(true,null)
      }
    })
  }

  updateTable(conn, data, id){
    conn.run(`UPDATE Data_Groups SET groups = "${data.groups}" WHERE id = "${id}"`)
  }
  deleteTable(conn, id){
    conn.run(`DELETE FROM Data_Groups WHERE id = "${id}"`)
  }


}

module.exports = ModelGroups
