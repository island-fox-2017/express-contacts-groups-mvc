class Contact {
  constructor(data) {
    this.id = data.id;
    this.name = data.Name;
    this.company = data.Company;
    this.telp = data.Telp;
    this.email = data.Email;
  }

  static showContact(conn, callback) {
    conn.all(`SELECT * FROM CONTACT;`, function(err, rows) {
      if (!err) {
        callback(false, rows)
      } else {
        callback(true, null);
      }
    });
  }

  static addContact(conn, data) {
    conn.run(`INSERT INTO Contact(Name, Company, Telp, Email) VALUES ('${data.name}', '${data.company}', '${data.telp}', '${data.email}')`);
  }

  static editContact(conn, data, callback) {
    conn.all(`SELECT * FROM Contact WHERE id = '${data.id}'`, function(err, rows) {
      if (!err) {
        callback(false, rows)
      } else {
        callback(true, null);
      }
    });
  }

  static editContactData(conn, datas, id) {
    conn.run(`UPDATE Contact SET Name = '${datas.Name}', Company = '${datas.Company}', Telp = '${datas.Telp}', Email = '${datas.Email}' WHERE id = ${id} `);
  }

  static deleteContact(conn, params){
    conn.run(`DELETE FROM Contact WHERE id = '${params.id}'`);
  }
}

module.exports = Contact
