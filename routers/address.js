var express = require('express')
var router = express.Router()

const ConnectDB = require('../models/connectDB');
var connect = new ConnectDB()
const Address = require('../models/addresses')

router.get('/',function (req,res) {
  Address.showAll(connect.dataBase,function(err, address,kontak){
      res.render('address',{contactName : kontak, addressData : address})
  })

})
router.post('/',function(req,res){
  Address.insertAdress(connect.dataBase,req.body.street,req.body.city, req.body.postalCode,req.body.addressList)
  res.redirect('/address')
})
router.get('/edit/:id',function(req,res){
  Address.showEdit(connect.dataBase,req.params.id,function (err,edit,kontak) {
    res.render('editAddress',{contactName : kontak, editAddress: edit})
  })
})
router.post('/edit/:id',function (req,res) {
  Address.editInput(connect.dataBase,req.body.id,req.body.city,req.body.postalCode,req.body.contact_id)
  res.redirect('/address');
})
router.get('/delete/:id',function(req,res){
  Address.deleteAdress(connect.dataBase,req.params.id)
  res.redirect('/address')
})
module.exports = router;
