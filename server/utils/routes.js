const QA = require('../controllers/qa'),
    jwt = require('express-jwt'),
    jwksRsa = require('jwks-rsa');

module.exports = function(app) {
    app.get("/questions", QA.allQuestions);
    app.get("/questions/:id", QA.getQuestion);

    const checkJwt = jwt({
        secret: jwksRsa.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `https://instantdistraction.auth0.com/.well-known/jwks.json`
        }),
      
        // Validate the audience and the issuer.
        audience: 'Uc6CioVC3cPVv8l46zcxVau25SMTABn3',
        issuer: `https://instantdistraction.auth0.com/`,
        algorithms: ['RS256']
      });

    app.post("/questions", checkJwt, QA.addNewQuestion);
    app.post("/questions/:id/answers", checkJwt, QA.addNewAnswer);
}