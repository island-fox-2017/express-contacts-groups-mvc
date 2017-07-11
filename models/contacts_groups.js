class ContactsGroups {
  constructor(parameter) {
    this.id = parameter.id
    this.contacts_id = parameter.contacts_id
    this.groups_id = parameter.groups_id
  }
  
  static selectAll(conn, callback) {
    conn.all(`SELECT * FROM contacts_groups`, function(err, rows) {
      if (!err) {
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }
  
  static insertData(conn, body) {
    conn.run(`INSERT INTO contacts_groups (contacts_id, groups_id) 
              VALUES ('${body.contact_id}', '${body.group_id}')`)
  }
  
}

module.exports = ContactsGroups