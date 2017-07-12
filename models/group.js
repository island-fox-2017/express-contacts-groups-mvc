class Group {
  constructor(dataObject) {
    this.id = dataObject.id;
    this.name_of_group = dataObject.name_of_group;
  }

// find all
  static findAllGroups(connection, callback) {
    connection.all(`SELECT * FROM Groups; `, function(err, rows) {
      if(!err) {
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }

// insert / add
static insertGroups(connection, data) {
  connection.all(`INSERT INTO Groups(name_of_group)
  VALUES('${data.name_of_group}')
  `)
}

// find by id
static findByIdGroups(connection, parameter, callback){
  connection.all(`SELECT * FROM Groups WHERE id = '${parameter.id}'`, function(err,rows){
    if(!err) {
      callback(false, rows[0])
    } else {
      callback(true,null)
    }
  })
}

// update
static updateGroups(connection, data, parameter) {
  connection.all(`UPDATE Groups SET
  name_of_group = '${data.name_of_group}' WHERE id = '${parameter.id}';`)
  }

// delete
static deleteGroups(connection, parameter) {
  connection.all(`DELETE FROM Groups WHERE id ='${parameter.id}'`)
  }
}
module.exports = Group
