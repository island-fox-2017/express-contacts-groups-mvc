
class Contact {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.company = data.company;
    this.telp_number = data.telp_number;
    this.email = data.email;
  }
  static showAll(connection, callback){
    connection.all(`SELECT Contact.id , Contact.name, Contact.company, Contact.telp_number , Contact.email ,Groups.name_of_group
                    FROM Contact
                      LEFT JOIN ContactGroup ON Contact.id =ContactGroup.contact_id
                      left JOIN Groups ON Groups.id = ContactGroup.group_id`, function(err,rows){
                        if(!err){
                          callback(false,rows)
                        }else {
                          callback(true,null)
                        }
    })
  }
  static insertContact(connection, nameData , companyData, telp_numberData , emailData){
    connection.run(`INSERT INTO Contact (name,company,telp_number,email)
                    VALUES('${nameData}','${companyData}','${telp_numberData}','${emailData}')`)
  }
  static deleteContact(connection,id){
    connection.run(`DELETE FROM Contact WHERE id = ${id}`)
  }
  static showEdit(connection,id,callback){
    connection.all(`SELECT * FROM Contact WHERE rowid = ${id}`, function(err,rows){
      if(!err){
        callback(false,rows)
      }else {
        callback(true,null)
      }
    })
  }
  static editInput(connection ,id, nameData , companyData, telp_numberData , emailData ){
    connection.run(`UPDATE Contact SET
      name = '${nameData}',
      company = '${companyData}',
      telp_number = '${telp_numberData}',
      email = '${emailData}'
      WHERE id = '${id}'`)

  }
  static showAddress(connection,id,callback){
    connection.all(`SELECT * FROM Addresses WHERE contact_id = ${id}`,function (err,rows) {
      if(!err){
        callback(false,rows)
      }else {
        callback(true,null)
      }
    })
  }

}

module.exports = Contact;