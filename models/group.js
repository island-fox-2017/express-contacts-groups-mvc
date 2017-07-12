class Group {
  constructor(data) {
    this.id = data.id;
    this.groupname = data.groupname;
  }

  static showGroup(conn, callback) {
    conn.all(`SELECT * FROM Groups`, function(err, rows) {
      if (!err) {
        callback(false, rows);
      } else {
        callback(true, null);
      }
    })
  }

  static addGroup(conn, data){
    conn.run(`INSERT INTO Groups(GroupsName) VALUES ('${data.groupname}')`);
  }

  static editGroup(conn, data, callback){
    conn.all(`SELECT * FROM Groups WHERE id = '${data.id}'`, function(err, rows){
      if(!err)
      {
        callback(false, rows);
      }
      else{
        callback(true, null);
      }
    });
  }

  static editGroupData(conn, datas, id){
    conn.run(`UPDATE Groups SET GroupsName = '${datas.groupname}' WHERE id = ${id}`);
  }

  static deleteGroups(conn, params){
    conn.run(`DELETE FROM Groups WHERE id = ${params.id}`);
  }

}

module.exports = Group
