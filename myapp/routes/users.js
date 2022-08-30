var express = require('express');
var router = express.Router();
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('register');
});
router.get('/list', function (req, res, next) {
  res.render('list')
});

module.exports = router;
