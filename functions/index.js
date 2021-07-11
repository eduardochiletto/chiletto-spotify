const functions = require("firebase-functions");
const express = require("express");
const {
  userApp
} = require("./api/routes/database.index");
const {
  tokenApp
} = require("./api/routes/token.index");
const {
  spotifyApp
} = require("./api/routes/spotify.index");
const {
  tokenValidate
} = require("./token");

const app = express();
app.use(
  require("cors")({
    origin: true,
  })
);

app.use((err, request, response, next) => {
  response.status(500).send({
    code: 500,
    err,
  });
});


app.all('*', async function (request, response, next) {

  if (request.path.includes('/v1/version')) {
    response.status(200).send({
      number: '0.0.1'
    });
  return;
  }

  if (request.path.includes('/v1/token/validate') || request.path.includes('/v1/spotify/')) {

    if (!request.headers.authorization) {
      response.status(400).send({
        code: 400,
        message: 'Bad Request'
      });
      return;
    }

    try {
      request.tv = await tokenValidate(request.headers.authorization);
    } catch (error) {
      response.status(500).send(error);
      return;
    }
  }
  next();
})

/**
 * Express route to control the user
 * @type {object}
 * @const
 * @namespace Routes
 */
app.use('/v1/database/', userApp);

/**
 * Express route to control the token validation
 * @type {object}
 * @const
 * @namespace Routes
 */
app.use('/v1/token/', tokenApp);

/**
 * Express route to control the Spotify's api
 * @type {object}
 * @const
 * @namespace Routes
 */
app.use('/v1/spotify/', spotifyApp);

module.exports = {
  api: functions.https.onRequest(app),
}