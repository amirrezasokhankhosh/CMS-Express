var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const queries = require('../db/queries');

function getHashedPassword (password) {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

function isValidUser(user){
  const hasFirstName = typeof user.firstName == 'string' && user.firstName.trim() != '';
  const hasLastName = typeof user.lastName == 'string' && user.lastName.trim() != '';
  const hasEmail = typeof user.email == 'string' && user.email.trim() != '';
  const hasPassword = typeof user.password == 'string' && user.password.trim() != '';
  return hasFirstName && hasLastName && hasEmail && hasPassword;
}

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString('hex');
}

const authTokens = {};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register' , function(req , res , next){
  context = {message : ''};
  res.render('register' , context);
});

router.post('/register_save' , function(req , res , next){
  const { email, firstName, lastName, password, confirmPassword } = req.body;

  // Check if the password and confirm password fields match
  if (password === confirmPassword) {

      // Check if user with the same email is also registered
      queries.getOneUserByEmail(email).then((returnedUser) =>{
        if(returnedUser){
          context = {message : 'This email is already used by another user'};
          return res.render('register' , context);
        }
      });


      const hashedPassword = getHashedPassword(password);

      // Store user into the database if you are using one
      // CHECK FOR VALIDATIONS
      user = {
          firstName,
          lastName,
          email,
          password: hashedPassword
      };
      if(isValidUser(user)){
        queries.createUser(user).then(() => {
          context = {message: 'Registration Complete. Please login to continue.'}
          return res.redirect('/users/login');
        });
      } else {
        context = {message : 'Complete the form correctly .'};
        return res.render('register' , context);
      }
      
  } else {
      context = {message : 'Enter the exact password in confirm password input place .'};
      return res.render('register', context);
  }
});

router.get('/login' , function(req , res , next){
  context = {message : ''};
  res.render('login' , context);
});

router.post('/login_check' , function(req , res , next){
  const { email, password } = req.body;
  const hashedPassword = getHashedPassword(password);
  queries.getOneUserByEmail(email).then((returnedUser) =>{
    if(returnedUser && returnedUser.password === hashedPassword){
      const authToken = generateAuthToken();
      // Store authentication token
      authTokens[authToken] = returnedUser;

      // Setting the auth token in cookies
      res.cookie('AuthToken', authToken);

      // Redirect user to the protected page
      res.redirect('/dashboard');
    } else {
      context = {message : 'Invalid username or password'}
      res.render('login' , context);
    }
  });
});

router.get('/logout' , function(req , res , next){
  req.user = null;
  const authToken = req.cookies['AuthToken'];
  authTokens[authToken] = null;
  res.redirect('/users/login');
});


module.exports = {
  router: router,
  authTokens: authTokens
};