var express = require('express');
var router = express.Router();
var mysql = require('mysql');
let alert = require('alert');


var con = mysql.createPool({
  connectionLimit: 60,
  host: 'easylearning.guru',
  user: 'kcc_student',
  password: 'Kccitm.edu.in1',
  database: 'kccStudent'
});

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Library' });
});

router.get('/register', function (req, res, next) {
  res.render('register')
});


router.post('/register', function (req, res, next) {
  var sql = "INSERT INTO `libru` (`name`, `copies`, `author`) \
  VALUES ('"+ req.body.name + "', '" + req.body.copies + "', '" + req.body.author + "');"
  con.getConnection(function (err, connection) {
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Database created");
      console.log(result);
      res.redirect('list');
    });
  });
});

router.get('/list', function (req, res, next) {
  con.query("select * from libru", function (err, result) {
    if (err) throw err;
    console.log(result);
    res.render('list', { "data": result })
  });
});
router.post('/deleteList', function (req, res, next) {
  console.log(req.body.name);
  // res.json({ "Name": "Hello" })
  con.query("DELETE FROM libru where name =?",[req.body.id], function (err, result) {
    if (err) console.log("Oops... Something went wrong");
    console.log(result);
    res.json({code:1})
  });
});

module.exports = router;
