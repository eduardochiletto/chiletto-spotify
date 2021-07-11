const express = require('express');
const tokenApp = express();

/**
 * Route serving token validation
 * @name /token/validate
 * @requires express
 * @function
 * @const
 * @namespace Express
 * @param {express.Request} request - Express request
 * @param {express.Response} response - Express response
 */
tokenApp.get("/validate", async (request, response) => {

    try {
        const res = {
            code: request.tv.valid ? 200 : 403,
        };

        if (request.tv.valid) {
            res.user = request.tv.decoded;
        }
        response.status(res.code).send(res);
    } catch (error) {
        response.status(500).send(error);
    }
});

exports.tokenApp = tokenApp;