'use strict'

class Profiles {
  constructor() {
  }

    static tampil(conn,callback){
      conn.all(`SELECT * FROM Profiles;`,function(err,rows){
        if(!err){
          callback(false,rows)
        } else {
          callback(true,null)
               }
        })
      }

    static tambah(conn,req){
      conn.run(`INSERT INTO Profiles(nama,company,telp_number,email) VALUES
    ('${req.Name}','${req.Company}','${req.Telp_number}','${req.Email}')`)
    }

    static edit(conn,req,callback){
      conn.all(`SELECT * FROM Profiles WHERE id = ${req}`,function(err,rows){
        if(!err){
          callback(false,rows)
        } else {
          callback(true,null)
//console.log(err);
        }
      })
    }

    static update(conn,req,reqparams){
      conn.all(`UPDATE Profiles SET nama = '${req.Name}', company = '${req.Company}',
       telp_number = '${req.Telp_number}', email = '${req.Email}' WHERE id = ${reqparams}`)
    }

    static delete(conn,reqparams){
      conn.run(`DELETE FROM Profiles WHERE id = ${reqparams}`)
    }
}

module.exports = Contact
