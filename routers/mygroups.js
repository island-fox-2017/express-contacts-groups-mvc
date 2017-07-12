const express = require('express');
var router = express.Router();
const MyGroup = require('../models/mygroups');
const dbModel = require('../models/dbModel');
let dataModel = new dbModel('./db/data.db')

router.get('/', function (req, res) {
  MyGroup.readData(dataModel.connection, function (err, data) {
    MyGroup.readData(dataModel.connection, function (err, datakontak) {
      MyGroup.readData(dataModel.connection, function (err, datagroup) {
      })
    })
    res.render('my_group', {grouping_data: data, datakontak: datakontak, datagroup: datagroup})
  });
})

module.exports = router
