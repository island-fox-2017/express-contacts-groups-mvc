'use strict'

class Address{
  constructor(data){
    this.id = data.id;
    this.street = data.street;
    this.city = data.city;
    this.zip_code = data.zip_code;
    this.contacts_id = data.contacts_id;
  }

  static findAll(conn, callback){
    conn.all(`SELECT * FROM Address`, function(err, rows){
      if(!err){
        callback(false, rows)
      }else {
        callback(true, null)
      }
    })
  }

  static findById(conn, id, callback){
    conn.all(`SELECT * FROM Address WHERE id = ${id}`, function(err, rows){
      if(!err){
        callback(false, rows[0])
      }else {
        callback(true, null)
      }
    })
  }

  static insertData(conn, obj){
    conn.run(`INSERT INTO Address (street, city, zip_code, contacts_id)
    VALUES ('${obj.street}', '${obj.city}', '${obj.zip_code}', ${obj.contacts_id})`)
  }

  static deleteData(conn, id){
    conn.run(`DELETE FROM Address WHERE id = ${id}`);
  }

  static updateData(conn, data, id){
    conn.run(`UPDATE Address SET
      street = '${data.street}',
      city = '${data.city}',
      zip_code = '${data.zip_code}',
      contacts_id = ${data.contacts_id}
      WHERE id = ${id};`);
  }

}//END class


module.exports = Address;
