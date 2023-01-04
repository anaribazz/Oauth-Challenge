const express = require('express');
const app = express();
const { expressjwt: expressJwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const guard = require('express-jwt-permissions')();

const port = process.env.PORT || 8080;

const jwtCheck = expressJwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-lwy1n1m82745b7dp.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://challengesapi.com',
    issuer: 'https://dev-lwy1n1m82745b7dp.us.auth0.com/',
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/challenges', guard.check(['read:challenges']), function (req, res) {

    res.json({
      challenge1:'this is the first challenge',
      challenge2: 'this is the second challenge'
    });
});

app.listen(port);