var express = require('express');
var router = express.Router();
var defineUser = require('./authTokens');
var queries = require('../db/queries');


// CHECK FOR VALIDATIONS FUNCTIONS

function isValidCategory(categorie) {
  const hasCategory_1 = typeof categorie.category_1 == 'string' && categorie.category_1.trim() != '';
  const hasCategory_2 = typeof categorie.category_2 == 'string' && categorie.category_1.trim() != '';
  const hasCategory_3 = typeof categorie.category_3 == 'string' && categorie.category_1.trim() != '';
  const hasCategory_4 = typeof categorie.category_4 == 'string' && categorie.category_1.trim() != '';
  return hasCategory_1 || hasCategory_2 || hasCategory_3 || hasCategory_4;
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

///////////////////////////////////////////////////////////////////////////////////////
//////////////////////// ROUTES THAT ARE RELATED TO CATEGORIES ////////////////////////

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

router.get('/new_category' , function(req , res , next){
  defineUser(req);
  if (req.user) {
    res.render('new_category');
  } else {
    res.redirect('/users/login');
  }
});

router.post('/new_category_save' , function(req , res , next){
  defineUser(req);
  if (req.user) {
    if(isValidCategory(req.body)){
      var category = req.body;
      queries.getAllCategories().then(categories => {
        for (var i = 0 ; i < categories.length ; i++){
          if (category.category_1 === categories[i].category_1 && category.category_2 === categories[i].category_3 && category.categorie_3 === categories[i].category_3 && category.category_4 === categories[i].category_4){
            context = {message : 'This category Already exist .'};
            return res.render('new_category' , context);
          }
        }
        queries.createCategories(req.body).then(() => {
          res.redirect('/categories');
        });
      });
      
    } else {
      context = {message : 'Please enter at leaste one categorie'};
      res.render('new_category' , context);
    }
  } else {
    res.redirect('/users/login');
  }
});

router.get('/edit_category/:id' , function(req , res , next){
  defineUser(req);
  if (req.user) {
    queries.getOneCategory(req.params.id).then(category => {
      context = {id : req.params.id , category : category};
      res.render('edit_category' , context);
    });
  } else {
    res.redirect('/users/login');
  }
});

router.post('/edit_category_save/:id' , function(req , res , next){
  defineUser(req);
  if (req.user) {
    if(isValidCategory(req.body)){
      var category = req.body;
      queries.getAllCategories().then(categories => {
        for (var i = 0 ; i < categories.length ; i++){
          if (category.category_1 === categories[i].category_1 && category.category_2 === categories[i].category_2 && category.category_3 === categories[i].category_3 && category.category_4 === categories[i].category_4){
            queries.getOneCategory(req.params.id).then(category => {
              context = {id : req.params.id , category : category, message : 'This category Already exist .'};
              return res.render('edit_category' , context);
            });
          }
        }
        queries.updateCategories(req.params.id , req.body).then(() => {
          return res.redirect('/categories');
        });
      });
      
    } else {
      // i have to rerurn category
      queries.getOneCategory(req.params.id).then(category => {
        context = {id : req.params.id , category : category, message : 'Please enter at leaste one categorie'};
        return res.render('edit_category' , context);
      });
    }
  } else {
    res.redirect('/users/login');
  }
});

router.get('/delete_category/:id' , function(req , res , next){
  defineUser(req);
  if (req.user) {
    queries.deleteOnCategory(req.params.id).then(() => {
      res.redirect('/categories');
    });
  } else {
    res.redirect('/users/login');
  }
})

//////////////////////////////////////////////////////////////////////////////////////


module.exports = router;
