'use strict'

class Addresses {
  constructor(data) {
    this.id = data.id;
    this.street = data.street;
    this.city = data.city;
    this.zip = data.zip;
    this.idcontact = data.idcontact;
  }

  static findAll(conn, callback) {
    conn.all(`SELECT * FROM ADDRESS;`, function(err, rows) {
      if(!err) {
      callback(false, rows)
      } else {
      callback(true, null)
      }
    })
  }
  static findById(conn, id, callback) {
    conn.all(`SELECT * FROM ADDRESSES WHERE id = ${id}`, function(err, rows) {
      callback(rows[0])
    })
  }

  static insertData(connection, data2) {
    connection.run(`INSERT INTO Anddress (street, city, zip, ) VALUES ('${data2.street}', '${data2.city}', '${data2.zip}', '${data2.contacts_id}');`)
  }

  static updateData(connection, data, id) {
    connection.run(`UPDATE Address SET street = '${data.street}', city = '${data.city}', zip = '${data.zip}', contacts_id='${data.contacts_id}' WHERE id = ${id};`)
  }

  static deleteData(connection, id) {
    connection.run(`DELETE FROM Address WHERE id=${id}`)
  }
}


module.exports = Addresses
