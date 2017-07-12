class ContactsGroups{
  constructor(){
    
  }
  
  static selectAll(conn, callback){
    let query = `select * from Contacts_groups`;
    conn.all(query, function(err, rows){
      if (!err) callback(false, rows);
      else callback(true, null);
    })
  }
  
  static selectById(conn, id, callback){
    let query = `select * from Contacts_groups where id = '${id}'`;
    conn.all(query, function (err, rows){
      if (!err) callback(false, rows);
      else callback(true, null);
    })
  }
    
  static insert(conn, data){
    let query = `insert into Contacts_groups (contacts_id, group_id) values ('${data.contacts_id}', '${data.group_id}')`;
    conn.run(query);
    }
    
    static update(conn, id, data){
      let query = `update Contacts_groups set contacts_id = '${data.contacts_id}', group_id = '${data.group_id}' where id = '${id}'`;
      conn.run(query);
    }
    
    static delete(conn, id){
      let query = `delete from Contacts_groups where id = '${id}'`;
      conn.run(query);
    }  
}

module.exports = ContactsGroups;