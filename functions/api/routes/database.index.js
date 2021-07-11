const express = require('express');
const {
    tokenSign
} = require('../../token');
const schema = require("../../schemas/schemas");
const userApp = express();
const bcrypt = require('bcrypt');
const { User } = require('../orm/user');
const SALT = 10;

/**
 * Route serving user get
 * @name database/user/get
 * @requires express
 * @function
 * @const
 * @namespace Express
 * @param  {string} email [Email]
 * @param  {string} passowrd [Password]
 */
userApp.get("/user/get/:email/:password", async (request, response) => {

    try {
        const obj = await User.getByEmail(request.params.email);
        if (!obj.user) {
            response.status(404).send({
                code: 404,
                message: `User not found`,
            });
            return;
        }

        const compareRigth = await bcrypt.compare(request.params.password, obj.user.password);
        if (!compareRigth) {
            throw new Error('Invalid Password');
            return;
        }

        const user = {
            name: obj.user.name,
            email: obj.user.email ? obj.user.email : '',
            hasSpotify: obj.user.hasSpotify,
        };

        const code = 200;
        const resp = {
            code,
            user: user,
            token: tokenSign(user),
        }
        response.status(code).send(resp);
    } catch (error) {
        response.status(500).send({
            code: 500,
            error: error.message
        });
    }
});

/**
 * Route serving user create
 * @name database/user/ [post]
 * @requires express
 * @function
 * @const
 * @namespace Express
 * @param  {string} email [Email]
 * @param  {string} passowrd [Password]
 */
userApp.post("/user", async (request, response) => {

    try {
        let user = request.body;
        const jsonschema = schema.validateJson(user, schema.userInsert);
        if (!jsonschema.valid) {
            response.status(500).send(jsonschema.errors);
            return;
        }

        user.password = await bcrypt.hash(user.password, SALT);
        const res = await User.insert(user);
        if (!res.success) {
            throw new Error('Error creating user');
        }

        response.status(201).send({
            code: 201,
            message: 'User Created. 🥳 \nLog in now.',
        });

    } catch (error) {
        response.status(500).send({
            code: 500,
            message: error.message,
        });
    }
});

/**
 * Route serving user update
 * @name database/user/update [put]
 * @requires express
 * @function
 * @const
 * @namespace Express
 * @param {express.Request} request - Express request
 * @param {express.Response} response - Express response
 */
userApp.put("/user/update", async (request, response) => {

    try {
        const user = request.body;
        const jsonschema = schema.validateJson(user, schema.userUpdate);
        if (!jsonschema.valid) {
            response.status(500).send(jsonschema.errors);
            return;
        }

        if (user.password) {
            user.password = await bcrypt.hash(user.password, SALT);            
        }

        const res = await User.update(user._id, user);
        let code = 200;
        let message = 'User updated';
        if (!res.success) {
            code = 404;
            message = 'User not found'
        }

        response.status(code).send({
            code,
            message
        });
    } catch (error) {
        response.status(500).send(error);
    }
});


exports.userApp = userApp;