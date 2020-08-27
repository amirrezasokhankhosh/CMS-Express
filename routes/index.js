var express = require('express');
var router = express.Router();
var defineUser = require('./authTokens');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dashboard' , function(req , res , next){
  defineUser(req);
  if (req.user) {
    res.render('dashboard');
  } else {
    res.redirect('/users/login');
  }
});


module.exports = router;
