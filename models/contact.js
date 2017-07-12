class Contact {
  constructor(dataObject) {
    this.id = dataObject.id;
    this.name = dataObject.name;
    this.company = dataObject.company;
    this.telp_number = dataObject.telp_number;
    this.email = dataObject.email;
  }

// find all
  static findAllContact(connection, callback) {
    connection.all(`SELECT * FROM Contacts; `, function(err, rows) {
      if(!err) {
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }

// insert / add
static insertContact(connection, data) {
  connection.all(`INSERT INTO Contacts(name, company, telp_number, email)
  VALUES('${data.name}', '${data.company}', '${data.telp_number}', '${data.email}')
  `)
}

// find by id
static findByIdContact(connection, parameter, callback){
  connection.all(`SELECT * FROM Contacts WHERE id = '${parameter.id}'`, function(err,rows){
    if(!err) {
      callback(false, rows[0])
    } else {
      callback(true,null)
    }
  })
}

// update
static updateContact(connection, data, parameter) {
  connection.all(`UPDATE Contacts SET
  name = '${data.name}',
  company = '${data.company}',
  telp_number = '${data.telp_number}',
  email = '${data.email}' WHERE id = '${parameter.id}';`)
}
// hasOwnProperty

// delete
static deleteContact(connection, parameter) {
  connection.all(`DELETE FROM Contacts WHERE id ='${parameter.id}'`)
}

// showAddress
static showAddress(connection, parameter, callback){
    connection.all(`SELECT * FROM Addresses JOIN Contacts
      ON Contacts.id = Addresses.ContactId
      WHERE Addresses.ContactId = ${parameter}`, function(err,rows){
        if(!err){
          callback(false, rows)
        }else {
          callback(true, null)
        }
      })
  }
}


module.exports = Contact;
