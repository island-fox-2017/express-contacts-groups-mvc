class combinedCG {

  static findAll(con, callback) {
    con.all(`SELECT  * FROM ContactGroup JOIN CG ON ContactGroup.id  = CG.GroupID JOIN Contact ON CG.ContactID  = Contact.id`, function (err,rows) {
      if(!err)
      {
        callback(false, rows)
      } else {
        callback(true,null)
      }
    })
  }

  static deleteCont(con, ident){
    con.all(`DELETE FROM CG WHERE GroupID = '${ident}'`);
  }

}

module.exports = combinedCG;
