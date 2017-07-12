class Profile {
  constructor(dataObject) {
    this.id = dataObject.id;
    this.username = dataObject.username;
    this.password = dataObject.password;
    this.ContactId = dataObject.ContactId;
  }

// find all
  static findAllProfiles(connection, callback) {
    connection.all(`SELECT * FROM Profiles LEFT JOIN Contacts ON Contacts.id = Profiles.ContactId`, function(err, rows) {
      if(!err) {
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }

// insert / add
static insertProfiles(connection, data) {
  connection.all(`INSERT INTO Profiles(username, password, ContactId)
  VALUES('${data.username}', '${data.password}', '${data.ContactId}')
  `)
}

// find by id
static findByIdProfiles(connection, parameter, callback){
  //console.log(parameter);
  connection.all(`SELECT * FROM Profiles WHERE id = ${parameter.id}`, function(err,rows){
    if(!err) {
      callback(false, rows[0])
    } else {
      callback(true,null)
    }
  })
}

// update
static updateProfiles(connection, data, parameter) {
  connection.all(`UPDATE Profiles SET
  username = '${data.username}',
  password = '${data.password}' WHERE id = '${parameter.id}';`)
  }

// delete
static deleteProfiles(connection, parameter) {
  connection.all(`DELETE FROM Profiles WHERE id ='${parameter.id}'`)
  }
}

// show_details
// static showDetails(connection,  ){
//   connection.all(`SELECT * FROM Profiles LEFT JOIN Contacts ON Contacts.id = Profiles.ContactId`)
// }
// static findByIdProfiles(connection, parameter, callback){
//   //console.log(parameter);
//   connection.all(`SELECT * FROM Profiles WHERE id = ${parameter.id}`, function(err,rows){
//     if(!err) {
//       callback(false, rows)
//     } else {
//       callback(true,null)
//     }
//   })
// }



module.exports = Profile
