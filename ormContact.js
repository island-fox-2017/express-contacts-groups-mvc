const dbModel = require('./models/dbmodel');
const Contact = require('./models/Contact');

let dbModel = new dbModel('./db/data.db');

Contact.findAll(dbModel.connection, function(err, rows){
  if(!err)
  {
    console.log(rows);
  }
})
