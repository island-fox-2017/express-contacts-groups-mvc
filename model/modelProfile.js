const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./db/database.db")

class ModelProfile {
  constructor() {

  }
  selectTableAll(){

  }
  insertTable(){

  }
  updateTable(){
    return "hello"
  }
  deleteTable(conn, id){
      conn.run(`DELETE FROM Data_Profile WHERE id = ${id}` )
  }
}

// let profile = new ModelProfile()

module.exports = ModelProfile
