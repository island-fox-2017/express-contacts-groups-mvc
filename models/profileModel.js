'use strict'

class Profile {
  constructor(data) {
    this.id = data.id
    this.username = data.username
    this.password = data.password
    this.Contacts_id = data.Contacts_id
  }

  static selectAll(connection, callback) {
    connection.all(`SELECT Profiles.id AS idProfile, Profiles.username, Profiles.password, Profiles.Contacts_id, Contacts.name FROM Profiles JOIN Contacts ON Profiles.Contacts_id = Contacts.id;`, function(err, data) {
      connection.all(`SELECT * from Contacts;`, function(err,data2) {
        if(!err) {
          callback(false, data, data2)
        }
        else {
          callback(true, null)
        }
      })
    })
  }

  static insertData(connection, request) {
    connection.run(`INSERT INTO Profiles (username, password, Contacts_id) VALUES ('${request.formUsername}', '${request.formPassword}', ${request.formIdContact});`)
  }

  static getEditData(connection, request, callback) {
    connection.all(`SELECT * FROM Profiles WHERE id = '${request.id}';`, function(err,data) {
      connection.all(`SELECT * FROM Contacts;`, function(err,data2) {
        if (!err) {
          callback(false, data, data2)
        }
        else {
          callback(true, null)
        }
      })
    })
  }

  static updateData(connection, request1, request2) {
    connection.run(`UPDATE Profiles SET username = '${request1.formUsername}', password = '${request1.formPassword}', Contacts_id = '${request1.formIdContact}' WHERE id = '${request2.id}';`)
  }

  static deleteData(connection, request) {
    connection.run(`DELETE FROM Profiles WHERE id = '${request.id}';`)
  }

}

module.exports = Profile
