var authTokens = require('./users').authTokens;

function defineUser(req){
    const authToken = req.cookies['AuthToken'];
    // Inject the user to the request
    req.user = authTokens[authToken];
}

module.exports = defineUser;