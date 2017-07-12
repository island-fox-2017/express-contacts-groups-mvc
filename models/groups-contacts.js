const ModelDb = require('./DbModel');

class GroupsContacts {
  constructor(data) {
    this.id = data.id;
    this.contact_id = data.contact_id;
    this.group_id = data.group_id;
  }

  static showContactsGroups (conn, callback) {
    conn.all(`SELECT * FROM contact_group;`, function(err, rows) {
      if(!err) {
        callback(false, rows)
      }
      else {
        callback(true, null)
      }
   })
  }

  static joinContactsGroups (conn, callback) {
    conn.all(`SELECT * FROM Groups AS g
              INNER JOIN contact_group AS cg
                ON g.id = cg.group_id
                INNER JOIN Contacts AS c
                ON c.id = cg.contact_id`, function(err, rows) {
                  if(!err) {
                    callback(false, rows)
                  }
                  else {
                    callback(true, null)
                  }
                })
  }

  static insertContactsGroups (conn, data) {
    conn.run(`INSERT INTO contact_group (contact_id, group_id)
              VALUES (${data.contact_id}, ${data.group_id})`)
  }

  static deleteContactsGroups (conn, param) {
    conn.run(`DELETE FROM contact_group WHERE id = ${param.id}`)
  }

}//END of Class


module.exports = GroupsContacts;
