class CG {
  constructor(dataCG){
    this.id = dataCG.id;
    this.ContactID = dataCG.ContactID;
    this.GroupID = dataCG.GroupID;
  }

  static findAll(con, callback) {
    con.all(`SELECT  * FROM CG`, function (err,rows) {
      if(!err)
      {
        callback(false, rows)
      } else {
        callback(true,null)
      }
    })
  }

  static AddNew(con, data) {
    con.all(`INSERT INTO CG(ContactID, GroupID) VALUES ('${data.ContactID}', '${data.GroupID}')`);
  }

}

module.exports = CG;
