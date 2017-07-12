class contcombinedCG {

  static findAll(con, callback) {
    con.all(` SELECT  * FROM Contact JOIN CG ON Contact.id  = CG.ContactID JOIN ContactGroup ON ContactGroup.id  = CG.GroupID `, function (err,rows) {
      if(!err)
      {
        callback(false, rows)
      } else {
        callback(true,null)
      }
    })
  }

  static deleteCont(con, ident){
    con.all(`DELETE FROM CG WHERE ContactID = '${ident}'`);
  }


}

module.exports = contcombinedCG;
