'use strict'

class GroupsContacts{
  constructor(data){
    this.id = data.id;
    this.groups_id = data.groups_id;
    this.contacts_id = data.contacts_id;
  }

  static findAll(conn, callback){
    conn.all(`SELECT * FROM GroupsContacts`, function(err, rows){
      if(!err){
        callback(false, rows)
      }else {
        callback(true, null)
      }
    })
  }

  static joinAll(conn, callback){
    conn.all(`SELECT *
      FROM Groups  g
      INNER JOIN GroupsContacts  gc
        ON g.id = gc.groups_id
        INNER JOIN Contacts  c
        ON c.id = gc.contacts_id`, function(err, rows){
          if(!err){
            callback(false, rows)
          }else {
            callback(true, null)
          }
        })
  }

  static insertData(conn, data){
    conn.run(`INSERT INTO GroupsContacts (groups_id, contacts_id)
    VALUES (${data.groups_id}, ${data.contacts_id})`)
  }



}//END CLASS

module.exports = GroupsContacts;
