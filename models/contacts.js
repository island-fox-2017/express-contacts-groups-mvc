'use stric'

class Contacts{
  constructor(dataObj){
    this.id = dataObj.id;
    this.name = dataObj.name;
    this.company = dataObj.company;
    this.telp_number = dataObj.telp_number;
    this.email = dataObj.email;
  }

  static findAll(conn, callback){
    conn.all(`SELECT * FROM Contacts`, function(err, rows){
      if(!err){
        callback(false, rows)
      }else {
        callback(true, null)
      }
    })
  }

  static insertData(conn, obj){
    conn.run(`INSERT INTO Contacts (name, company, telp_number, email)
      VALUES ('${obj.name}', '${obj.company}', '${obj.telp_number}', '${obj.email}')`)
  }

  static deleteData(conn, id){
    conn.run(`DELETE FROM Contacts WHERE id = ${id};`);
  }

  static findById(conn, id, callback){
    conn.all(`SELECT * FROM Contacts WHERE id = ${id}`, function(err, rows){
      if(!err){
        callback(false, rows[0])
      }else {
        callback(true, null)
      }
    })
  }

  static updateData(conn, data, id){
    conn.run(`UPDATE Contacts SET
      name = '${data.name}',
      company = '${data.company}',
      telp_number = '${data.telp_number}',
      email = '${data.email}'
      WHERE id = '${id}';`)
  }

  static joinToAddress(conn, id, callback){
    conn.all(`SELECT * FROM Address JOIN Contacts
      ON Contacts.id = Address.contacts_id
      WHERE Address.contacts_id = ${id}`, function(err,rows){
        if(!err){
          callback(false, rows)
        }else {
          callback(true, null)
        }
      })
  }

}//end class


module.exports = Contacts;
