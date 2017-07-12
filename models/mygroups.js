class MyGroup {
  constructor(){

  }

  static showData(db, callback){
    // console.log('SELECT * from CONTACT2017 AS c JOIN contact_group AS cg ON c.id = cg.contact_id JOIN GROUPS AS g ON cg.group_id = g.id');
    db.all(`SELECT * from CONTACT2017 AS c LEFT JOIN contact_group AS cg ON c.id = cg.contact_id LEFT JOIN GROUPS AS g ON cg.group_id = g.id`, function (err, data) {
      db.all(`SELECT * from CONTACT2017`, function (err, datakontak) {
        db.all(`select * from GROUPS`, function (err, datagroup) {
          if(!err){
            callback(false, datagroup)
          } else {
            callback(true, null)
          }
        })
        if(!err){
          callback(false, datakontak)
        } else {
          callback(true, null)
        }
      })
      if(!err){
        callback(false, data)
      } else {
        callback(true, null)
      }
    });
  }

  static insertData(){

  }

  static deleteData(){

  }

  static readUpdateData(){

  }

  static readData(){

  }


}

module.exports = MyGroup
