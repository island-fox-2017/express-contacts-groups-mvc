class Groups{
  constructor(){
  }
  
  static selectAll(conn,callback){
    let query = `select * from Groups`;
    conn.all(query, function (err, rows){
      if(!err) callback(false, rows);
      else console.log(err);;
    })
  }
  
  static selectById(conn, id, callback){
    let query = `select * from Groups where id = '${id}' `;
    conn.all(query, function (err, rows){
      if(!err) callback(false, rows);
      else callback(true, null);
    })
  }
  
  static insert(conn, data){
    let query = `insert into Groups (name_of_group) values ('${data.name_of_group}')`;
    conn.run(query)
  }
  
  static update(conn, id, data){
    let query = `update Groups set name_of_group = '${data.name_of_group}' where id = '${id}'`;
    conn.run(query);
  }
  
  static delete(conn, id){
    let query = `delete from 'Groups' where id='${id}'`;
    conn.run(query);
  }
  
  // static selectContactJoinGroup()
}

module.exports = Groups;
