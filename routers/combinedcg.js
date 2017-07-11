var express = require('express')
var router = express.Router();

var dbmodel = require('../models/dbModels');
var DBmodel = new dbmodel('./db/data.db');

var combinedcg = require('../models/combinedcg');

router.get('/', function(req, res){
  combinedcg.findAll(DBmodel.connection, function(err, rows){

    // return outcome;
    // var oriList =[];
    // for (i=0; i<rows.length; i++) {
    //   oriList.push(rows[i].GroupID);
    // }
    //
    // var list = oriList.filter(function (x, i, a) { return a.indexOf(x) == i;
    // var outcome = [];
    // // console.log(rows);
    //
    // for (x=0; x<list.length; x++) {
    //   for (y=0; y<rows.length; y++){
    //     if (list[x] == rows[y].GroupID){
    //       outcome.push(rows[y].Name);
    //     }
    //   }
    // }
    // console.log(outcome);

    res.render('combinedcg', {data_combinedcg: rows});
  });
});

// });

module.exports = router;
