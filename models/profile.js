class Profile {

  constructor(dataProfile){
    this.id = dataProfile.id;
    this.Username = dataProfile.Username;
    this.Password = dataProfile.Password;
    this.Contact_id = dataProfile.Contact_id;
  }

  static findAll(con, callback) {
    con.all(`SELECT * FROM Profile`, function (err,rows) {
      if(!err)
      {
        callback(false, rows)
      } else {
        callback(true,null)
      }
    })
  }

  static findCont(con, ident ,callback) {
    con.all(`SELECT * FROM Profile JOIN Contact ON Profile.Contact_id = Contact.id WHERE Contact.id = ${ident}`, function (err,rows) {
      if(!err)
      {
        callback(false, rows)
      } else {
        callback(true,null)
      }
    })
  }

  static AddNew(con, data) {
    con.all(`INSERT INTO Profile(Username, Password, Contact_id) VALUES
    ('${data.Username}', '${data.Password}', '${data.Contact_id}')`);
  }

  static edit(con, ident ,callback) {
    con.all(`SELECT * FROM Profile WHERE id = '${ident}'`, function (err,rows) {
        if(!err)
        {
          callback(false, rows)
        }else{
          callback(true,null)
        }
    })
  }
  static updateEdit(con, ident, data) {
    con.all(`UPDATE Profile SET Username = '${data.UsernameEjs}', Password = '${data.PasswordEjs}', Contact_id = '${data.Contact_idEjs}' WHERE id = ${ident}`);
  }

  static deleteCont(con, ident){
    con.all(`DELETE FROM Profile WHERE id = '${ident}'`);
  }

}

module.exports = Profile;
