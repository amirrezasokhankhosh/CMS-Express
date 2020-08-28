var express = require('express');
var router = express.Router();
var defineUser = require('./authTokens');
var queries = require('../db/queries');


// CHECK FOR VALIDATIONS 

function isValidCategorie(categorie) {
  const hasCategorie_1 = typeof categorie.categorie_1 == 'string' && categorie.categorie_1.trim() != '';
  const hasCategorie_2 = typeof categorie.categorie_2 == 'string' && categorie.categorie_1.trim() != '';
  const hasCategorie_3 = typeof categorie.categorie_3 == 'string' && categorie.categorie_1.trim() != '';
  const hasCategorie_4 = typeof categorie.categorie_4 == 'string' && categorie.categorie_1.trim() != '';
  return hasCategorie_1 || hasCategorie_2 || hasCategorie_3 || hasCategorie_4;
}

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

router.get('/categories' , function(req , res , next){
  defineUser(req);
  if (req.user) {
    queries.getAllCategories().then(categories => {
      context = {categories : categories};
      res.render('categories' , context);
    });
  } else {
    res.redirect('/users/login');
  }
});

router.get('/new_categorie' , function(req , res , next){
  defineUser(req);
  if (req.user) {
    res.render('new_categorie');
  } else {
    res.redirect('/users/login');
  }
});

router.post('/new_categorie_save' , function(req , res , next){
  defineUser(req);
  if (req.user) {
    if(isValidCategorie(req.body)){
      var categorie = req.body;
      queries.getAllCategories().then(categories => {
        for (var i = 0 ; i < categories.length ; i++){
          if (categorie.categorie_1 === categories[i].categorie_1 && categorie.categorie_2 === categories[i].categorie_2 && categorie.categorie_3 === categories[i].categorie_3 && categorie.categorie_4 === categories[i].categorie_4){
            context = {message : 'This category Already exist .'};
            return res.render('new_categorie' , context);
          }
        }
        queries.createCategories(req.body).then(() => {
          res.redirect('/categories');
        });
      });
      
    } else {
      context = {message : 'Please enter at leaste one categorie'};
      res.render('new_categorie' , context);
    }
  } else {
    res.redirect('/users/login');
  }
});

module.exports = router;
