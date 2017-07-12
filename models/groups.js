class Groups {
  constructor() {

  }
  static showAll(connection, callback){
    connection.all(`SELECT Contact.name, Groups.name_of_group ,ContactGroup.id
                    FROM ContactGroup
                      LEFT JOIN Contact ON Contact.id =ContactGroup.contact_id
                      LEFT JOIN Groups ON Groups.id = ContactGroup.group_id;`,
                   function (err,rows) {
                    if(!err){
                      callback(false,rows)
                    }else {
                      callback(true,null)
                    }
                  })
  }
  static insertGroups(connection, groupName){
    connection.run(`INSERT INTO Groups (name_of_group)
                    VALUES('${groupName}');`)
  }
  static deleteGroups(connection,id){
    connection.run(`DELETE FROM Groups WHERE id = ${id}`)
  }
  static showEdit(connection,id,callback){
    connection.all(`SELECT * FROM Groups WHERE rowid = ${id}`, function(err,rows){
      if(!err){
        callback(false,rows)
      }else {
        callback(true,null)
      }
    })
  }
  static editInput(connection ,id, nameData){
    connection.run(`UPDATE Groups SET
      name_of_group = '${nameData}'
      WHERE id = '${id}'`)

  }
}
module.exports = Groups;
