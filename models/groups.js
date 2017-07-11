'use strict'

class Groups{
  constructor(dataObj){
    this.id = dataObj.id;
    this.name_of_group = dataObj.name_of_group;
  }

  static findAll(conn, callback){
    conn.all(`SELECT * FROM Groups`, function(errs, rows){
        if(!errs){
          callback(false, rows)
        }else {
          callback(true, null)
        }
    })
  }

  static findById(conn, id, callback){
    conn.all(`SELECT * FROM Groups WHERE id = ${id}`, function(err, rows){
      if(!err){
        callback(false, rows[0])
      }else {
        callback(true, null)
      }
    })
  }

  static insertData(conn, data){
    conn.run(`INSERT INTO Groups (name_of_group) VALUES ('${data.name_of_group}')`)
  }

  static deleteData(conn, id){
    conn.run(`DELETE FROM Groups WHERE id = ${id}`)
  }

  static updateData(conn, data, id){
    conn.run(`UPDATE Groups SET name_of_group = '${data.name_of_group}' WHERE id = ${id}`)
  }

}//END CLASS

module.exports = Groups;
