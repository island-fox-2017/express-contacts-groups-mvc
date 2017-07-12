class Contacts {
  constructor(){
  }
  
  static selectAll(conn,callback){
    let query = `select * from Contacts`;
    conn.all(query, function (err, rows){
      if(!err) callback(false, rows);
      else console.log(err);;
    })
  }
  
  static selectConjGroups(conn,callback){
    let query = `select Contacts.id, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email, Groups.name_of_group from Contacts join Contacts_groups on Contacts.id = Contacts_groups.contacts_id join Groups on Groups.id = Contacts_groups.group_id`;
    conn.all(query, function (err, rows){
      if(!err) callback(false, rows);
      else console.log(err);;
    })
  }
  
  static selectById(conn, id, callback){
    let query = `select * from Contacts where id = '${id}' `;
    conn.all(query, function (err, rows){
      if(!err) callback(false, rows);
      else callback(true, null);
    })
  }
  
  static insert(conn, data){
    let query = `insert into Contacts (name, company, telp_number, email) values ('${data.name}','${data.company}','${data.telp_number}','${data.email}')`;
    conn.run(query)
  }
  
  static update(conn, id, data){
    let query = `update Contacts set name = '${data.name}', company = '${data.company}', telp_number = '${data.telp_number}', email = '${data.email}' where id = '${id}'`;
    conn.run(query);
  }
  
  static delete(conn, id){
    let query = `delete from 'Contacts' where id='${id}'`;
    conn.run(query);
  }
  
  static selectContactAddress(conn, id, callback){
    let query = `select address.id, address.street, address.city, address.zip_code from Address join Contacts on contacts_id = Contacts.id where contacts_id = '${id}'`;
    conn.all(query, function(err, rows){
      if (!err) callback(false, rows);
      else callback(true, null);
    })
  }
}


module.exports = Contacts;
