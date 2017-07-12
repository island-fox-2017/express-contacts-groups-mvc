"use strict"

class Profiles {
  constructor() {

  };

  static findAll(db, callback) {
    db.all("SELECT * FROM Profiles;", (err, rows) => {
      if (!err) {
        callback(false, rows);
      } else {
        callback(true, null);
      }
    }); //all
  } //static

//For dropdown menu, we use data from Contacts table
  static addFindAll(db, callback) {
    db.all("SELECT * FROM Contacts;", (err, rows) => {
      if (!err) {
        callback(false, rows);
      } else {
        callback(true, null);
      }
    }); //all
  } //static

  static insertProfiles(db, json) {
    let insertProfiles = `INSERT INTO Profiles (username, password, contact_id) VALUES ('${json.username}', '${json.password}', ${json.contact_id});`;

    db.run(insertProfiles);
  };//static

  static allProfiles(db, id, callback) {
    db.all(`SELECT * FROM Profiles WHERE id = '${req.params.id}';`, (err, data_profiles) => {
      db.all(`SELECT * FROM Contacts;`, (err, data_contacts) => {
        res.render('edit_profiles', {
          data_profiles: data_profiles,
          data_contacts: data_contacts
        });
      });
    });
  }; //static

  static editProfiles(db, json) {
    let editProfiles = `UPDATE Profiles SET username = '${json.username}', password = '${json.password}', contact_id = ${json.contact_id} WHERE id = '${json.id}';`;

    db.run(editProfiles);
  };

}; //class

module.exports = Profiles;
