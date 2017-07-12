//models

class ContactGroup {
  constructor(dataObject) {
    this.id = dataObject.id;
    this.ContactId = dataObject.ContactId;
    this.GroupId = dataObject.GroupId;
  }

static findAllContactGroup(connection, callback){
  connection.all(`SELECT * FROM Contacts_Groups`, function(err, rows) {
    if(!err) {
      callback(false, rows)
    } else {
      callback(true, null)
    }
  })
}

static insertContactGroup(connection, data){
  connection.run(`INSERT INTO Contacts_Groups (ContactId, GroupId)
  VALUES (${data.ContactId}, ${data.GroupId})`)
}

static joinTogether(connection, callback){
  connection.all('SELECT * FROM Groups AS g INNER JOIN Contacts_Groups AS cg ON g.id = cg.ContactId INNER JOIN Contacts AS c ON c.id = cg.ContactId', function(err,rows){
if(!err){
  callback(false, rows)
}  else {
  callback(true, null)
}
  })
}
}





module.exports = ContactGroup;
