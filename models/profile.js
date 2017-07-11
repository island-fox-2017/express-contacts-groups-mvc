class Profile {
  constructor(data) {
    this.id = data.id;
    this.name = data.username;
    this.password = data.password;
    this.contact_id = data.contact_id;
  }

  static showAll(connection, callback){
    console.log(connection);
    connection.all(`SELECT Profile.id, Profile.username , Profile.password, Profile.contact_id, Contact.name
            FROM  Profile  LEFT JOIN  Contact
            ON Profile.contact_id = Contact.id`, function(err,dataProfile){
            connection.all(`SELECT distinct Contact.name , Contact.id FROM  Contact`
            ,function(err,dataContact){
              if (!err) {
                callback(false,dataProfile,dataContact)
              }
              else {
                callback(true,null,null)
              }
            })
    })
  }
  static insertProfile(connection, usernameData, passwordData, contact_id ){
    connection.run(`INSERT INTO Profile (username,password,contact_id)
                    VALUES('${usernameData}','${passwordData}','${contact_id}')`)
  }
  static deleteProfile(connection,id){
    connection.run(`DELETE FROM Profile WHERE id = ${id}`)
  }
  static showEdit(connection,id,callback){
    connection.all(`SELECT * FROM Profile WHERE rowid = ${id}`,function(err,edit){
      connection.all(`SELECT distinct Contact.name , Contact.id FROM  Contact`,
      function (err,kontak){
        if (!err) {
          callback(false,edit,kontak)
        }else {
          callback(true,null,null)
        }
      })
    })
  }
  static editProfile(connection,id, usernameData, passwordData, contact_id ){
    connection.run(`UPDATE Profile SET
      username = '${usernameData}',
      password= '${passwordData}',
      contact_id= '${contact_id}'
      WHERE id = '${id}'`)

  }
}

module.exports = Profile;
