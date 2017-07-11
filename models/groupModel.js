'use strict'

class Group {
  constructor(data) {
    this.id = data.id
    this.name = data.name_of_group
  }

  static selectAll(connection, callback) {
    connection.all(`SELECT * FROM Groups;`, function(err,dataGroup) {
      if(!err) {
        callback(false, dataGroup)
      }
      else {
        callback(true, null)
      }
    })
  }

  static insertData(connection, request) {
    connection.run(`INSERT INTO Groups (name_of_group) VALUES ('${request.formGroupName}');`)
  }

  static deleteData(connection,request) {
    connection.run(`DELETE FROM Groups WHERE id='${request.id}';`)
  }

  static getEditData(connection, request, callback) {
    connection.all(`SELECT * FROM Groups WHERE id = '${request.id}';`, function(err,data) {
      if(!err) {
        callback(false, data)
      }
      else {
        callback(true, null)
      }
    })
  }

  static updateData(connection, request1, request2) {
    connection.run(`UPDATE Groups SET name_of_group = '${request1.formGroupName}' WHERE id = '${request2.id}';`)
  }

  static showMember(connection, request, callback) {
    connection.all(`SELECT * FROM Groups AS g LEFT JOIN Contacts_Groups AS cg ON g.id = cg.Groups_id LEFT JOIN Contacts AS c ON cg.Contacts_id = c.id WHERE g.id = ${request.id};`, function(err,dataMember) {
      if (!err) {
        callback(false, dataMember)
      }
      else {
        callback(true, null)
      }
    })
  }

  // static deleteMember(connection, request) {
  //   connection.run(`DELETE FROM Contacts_Groups WHERE id = ${request.id};`)
  // }

}


module.exports = Group
