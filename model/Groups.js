'use strict'

class Groups {
  constructor() {
  }

    static tampil(conn,callback){
      conn.all(`SELECT * FROM Groups;`,function(err,rows){
        if(!err){callback(false,rows)
        } else {
          callback(true,null)
        }
      })
    }

    static tambah(conn,req){
      conn.run(`INSERT INTO Groups(name_of_group)VALUES('${req.Name}')`)
    }


    static edit(conn,req,callback){
      conn.all(`SELECT * FROM Groups WHERE id = ${req}`,function(err,rows){
        if(!err){
          callback(false,rows)
        } else {
          callback(true,null)
//console.log(err);
        }
      })
    }

    static update(conn,req,reqparams){
      conn.run(`UPDATE Groups SET name_of_group = '${req.Name}'WHERE id = ${reqparams}`)
    }

    static delete(conn,reqparams){
      conn.run(`DELETE FROM Groups WHERE id = ${reqparams}`)
    }
}

module.exports = Groups
