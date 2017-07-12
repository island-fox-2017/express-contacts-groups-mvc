/**
/** EXPRESS CONTACTS-GROUPS
---------------------------
Buatlah sebuah aplikasi sederhana menggunakan Express JS dan SQLITE3 untuk
menampilkan list Contact&Group, menambah data Contact&Group,
melakukan edit data dan delete data berdasarkan data yang dipilih

- Release 0
1. Buatlah file dengan nama setup.js yang akan dijalankan pertama kali untuk membuat
table pada database. Tentukan column mana saja yang akan di set unique.
2. Berikan validasi di setiap create table sehingga meskipun setup dijalankan berulang
kali, tidak error

Structure table:
* Contacts: id type integer, name type string, company type string, telp_number type string, email type string
* Groups: id type integer, name_of_group type string

- Release 1 - Basic Routing for Contacts dan Groups
Buatlah sejumlah route berikut dan tampilkan melalui view engine ejs
----------------------------------------------------------------------
METHOD | ROUTE                | KETERANGAN
----------------------------------------------------------------------
GET    | /contacts            | Menampilkan semua data contacts
POST   | /contacts            | Menerima data form untuk input contact
GET    | /contacts/edit/:id   | Menampilkan data contact spesifik untuk diubah
POST   | /contacts/edit/:id   | Menerima data form untuk update contact
GET    | /contacts/delete/:id | Menghapus data contact berdasarkan id
GET    | /groups              | Menampilkan semua data groups
POST   | /groups              | Menerima data form untuk input group
GET    | /groups/edit/:id     | Menampilkan data group spesifik untuk diubah
POST   | /groups/edit/:id     | Menerima data form untuk update group
GET    | /groups/delete/:id   | Menghapus data group berdasarkan id

- Release 2
  AKAN DIBERITAHUKAN SETELAH LECTURE SIANG
**/

const express = require('express');

//requirements routing
const index = require('./Routers/index');
const addresses = require('./Routers/addresses');
const contacts = require('./Routers/contacts');
const groups = require('./Routers/groups');
const profiles = require('./Routers/profiles');
const contactsGroups = require('./Routers/contacts_groups');

var app = express();

var bodyParser = require('body-parser')

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 
app.use(bodyParser.json())

//app use router
app.use('/', index);
app.use('/contacts', contacts);
app.use('/groups', groups);
app.use('/profiles', profiles);
app.use('/address', addresses);
app.use('/contactsGroups', contactsGroups);


app.listen(3000);
