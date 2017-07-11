'use strict'

class Group {
  constructor(data) {
    this.id = data.id;
    this.name_group = data.name_group;
  }
  static findAll(conn, callback) {
    conn.all(`SELECT * FROM Group;`, function(err, rows) {
      if(!err) {
      callback(false, rows)
      } else {
      callback(true, null)
      }
    })
  }
static findById(conn, id, callback) {
  conn.all(`SELECT * FROM Group WHERE id = ${id}`, function(err, rows) {
    callback(rows[0])
  })
}

static insertData(connection, req) {
  connection.run(`INSERT INTO Group (name_group) VALUES (${req.name_group}';`)
}

static deleteData(connection, req) {
  connection.run(`DELETE FROM Group WHERE id=${req.id}`)
}

static updateData(connection, data, id) {
  connection.run(`UPDATE Group SET name = '${data.name_group}', company = '${id.name_group}',`)
}
}


module.exports = Group
