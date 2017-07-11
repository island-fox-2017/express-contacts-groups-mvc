'use strict'

class Contacts {
  constructor(data) {
    this.id = data.id;
    this.name = data.nama;
    this.company = data.company;
    this.telp = data.number_telp;
  }

  static findAll(conn, callback) {
    conn.all(`SELECT * FROM CONTACTS;`, function(err, rows) {
      if(!err) {
      callback(false, rows)
      } else {
      callback(true, null)
      }
    })
  }
static findById(conn, id, callback) {
  conn.all(`SELECT * FROM CONTACTS WHERE id = ${id}`, function(err, rows) {
    callback(rows[0])
  })
}


static selectAll(connection, callback) {
  connection.all(`SELECT * FROM Contacts;`, function(err, dataContacts) {
    if(!err) {
      callback(false, dataContacts)
    } else {
      callback(true, null)
      }
    })
  }

static insertData(connection, req) {
  connection.run(`INSERT INTO Contacts (name, company, number_telp, email) VALUES ('${req.name}', '${req.company}', '${req.number_telp}', '${req.email}');`)
}

static deleteData(connection, req) {
  connection.run(`DELETE FROM Contacts WHERE id=${req.id}`)
}

static getEditData(connection, req, callback) {
  connection.all(`SELECT * FROM Contacts WHERE id = '${req.id}';`, function(err, data) {
    if(!err) {
      callback(false, data)
    } else {
      callback(true, null)
      }
  })
}

static updateData(connection, req1, req2) {
  connection.run(`UPDATE Contacts SET name = '${req1.name}', company = '${req1.company}', phone_num = '${req1.number_telp}', email='${requ.email}' WHERE id = ${req2.id}`)
}

static showAddress(connection, req, callback) {
  connection.all(`SELECT Addresses.id AS idAddress, Addresses.street, Addresses.city, Addresses.zip, Addresses.Contacts_id, Contacts.id FROM Addresses JOIN Contacts ON Addresses.Contacts_id = Contacts.id WHERE Contacts.id = ${req.id};`, function(err, dataAddress) {
    if(!err) {
      callback(false, dataAddress)
    } else {
      callback(true, null)
      }
    })
  }

}

module.exports = Contacts
