const DbModel = require('./models/DbModel');
const Contact = require('./models/contact')

let dbModel = new DbModel('./db/contact_group.db');

// console.log(dbModel);
// dbModel.createTable();
// Contact.showContact(dbModel.connection, function(err, rows){
//   if(!err){
//     console.log(rows);
//   }  
// })

Contact.findAll(dbModel.connection, function(err, rows){
  if(!err){
    console.log(rows);
  }  
})

Contact.findById(dbModel.connection, 3, function(row){
  console.log(row);
})


// const DbModel = require('./models/DbModel');
// const Contact = require('./models/Contact');
// 
// let dbModel = new DbModel('./db/data.db');
// 
// Contact.findAll(dbModel.connection, function(err, rows) {
//   if(!err) {
//     console.log(rows);
//   }
// })
