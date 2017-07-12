var express = require('express')
var router = express.Router();

const DbModel = require('../models/dbmodel');
const Profile = require('../models/profile');

let dbModel = new DbModel('../data.db');


// PROFILE START HERE
// GET   | /profiles            | tampilin profile
router.get('/', function(req, res){
  Profile.findAllProfiles(dbModel.connection, function(err,rows){
    if(!err) {
      res.render('profiles', {
        panggilData: rows
      })
    }
  })
})

// POST   | /profiles            | Untuk input profile
router.post('/', function(req,res){
  Profile.insertProfiles(dbModel.connection, req.body)
  res.redirect('/')
})

// GET    | /profiles/edit/:id   | Menampilkan data profile spesifik untuk diubah
// POST   | /profiles/edit/:id   | Menerima data form untuk update profile
router.get('/edit/:id', function(req, res){
  Profile.findByIdProfiles(dbModel.connection, req.params, function(err,rows){
    if(!err) {
    //  console.log(rows);
      res.render('editprofile', {
        panggilData: rows
      })
    }
  })
})

router.post('/edit/:id', function(req, res){
  Profile.updateProfiles(dbModel.connection, req.body, req.params)
  res.redirect('/');
})

// GET    | /profiles/delete/:id | Menghapus data profile berdasarkan id
router.get('/delete/:id', function(req,res){
  Profile.deleteProfiles(dbModel.connection, req.params)
res.redirect('/');
})


//satu lagi utk nampilin show details profile ( BELUMM.. )
// router.get('/profiles/show_details/:id', function(req,res) {
//   Profile.showDetails(dbModel.connection, function(err, rows){
//     if(!err) {
//       res.render('profilekecontact', {
//         panggilData: rows
//       })
//     }
//   })
// })

module.exports = router
