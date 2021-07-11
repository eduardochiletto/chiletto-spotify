const express = require('express');
const { User } = require('../orm/user');
const {
    spotify
} = require('../spotify-lib');


const ERROR_MESSAGE = 'An error ocurred while connect with Spotify. Please, try again';
const spotifyApp = express();

/**
 * Route serving spotify authorization
 * @name /spotify/connect
 * @requires express
 * @function
 * @const
 * @namespace Express
 * @param {express.Request} request - Express request
 * @param {express.Response} response - Express response
 */
spotifyApp.post('/connect', async (request, response) => {

    try {
        if (!request.headers.code) {
            response.status(400).send({
                code: 400,
                message: 'Bad Request'
            });
            return;
        }

        const res = await spotify.getAuthorizaton(request.headers.code);
        if (res.success) {
            const obj = await User.getByEmail(request.tv.decoded.email);
            obj.user.access_token = res.access_token;
            obj.user.refresh_token = res.refresh_token;
            obj.user.hasSpotify = true;
            await User.update(obj.user._id, obj.user);
        }

        response.status(200).send({
            code: res.success ? 200 : 403,
            message: res.success ? 'Ok' : 'An error ocorred.',
        });

    } catch (error) {
        response.status(500).send({
            code: 500,
            error,
        });
    }
});

/**
 * Route serving spotify playlists
 * @name /spotify/playlist
 * @function
 * @const
 * @namespace Express
 * @requires express
 * @param {express.Request} request - Express request
 * @param {express.Response} response - Express response
 */

spotifyApp.get('/playlists', async (request, response) => {
    getPlayLists(request, response)
});

/**
 * Route serving tracks from a Spotify playlist
 * @name /spotify/tracks
 * @requires express
 * @function
 * @const
 * @namespace Express
 * @param {express.Request} request - Express request
 * @param {express.Response} response - Express response
 */
spotifyApp.get('/tracks', async (request, response) => {
    getTracks(request, response);
});

/**
 * Get user's public playlists
 * @function
 * @name getPlayLists
 * @inner
 * @const
 * @namespace Express
 * @param {express.Request} request - Express request
 * @param {express.Response} response - Express response
 */
async function getPlayLists(request, response) {
    const obj = await User.getByEmail(request.tv.decoded.email);

    const res = {
        code: 200,
        message: 'Sucess',
    };

    try {
        res.playLists = await spotify.getUserPlaylists(obj.user);
    } catch (error) {
        if (error.message.includes('token expired')) {
            await refreshToken(obj.user);
            getPlayLists(request, response);
            return;
        }

        res.code = 500;
        res.message = ERROR_MESSAGE;
        res.error = error;
    }
    response.status(res.code).send(res);
}

/**
 * Returns all tracks from a specific playlist
 * @function
 * @name getTracks
 * @inner
 * @const
 * @namespace Express
 * @param {express.Request} request - Express request
 * @param {express.Response} response - Express response
 */
async function getTracks(request, response) {
    const obj = await User.getByEmail(request.tv.decoded.email);

    const res = {
        code: 200,
        message: 'Sucess',
    };

    try {
        let tracks = [];
        let _continue = true;
        let offset = 0;
        while (_continue) {
            const list = await spotify.getPlaylistTracks(obj.user, request.headers.id, offset);
            offset += 50;
            _continue = list.length > 0;
            tracks = tracks.concat(list);
        }

        res.tracks = tracks;

    } catch (error) {
        if (error.message.includes('token expired')) {
            await refreshToken(obj.user);
            getPlayLists(request, response);
            return;
        }

        res.code = 500;
        res.message = ERROR_MESSAGE;
        res.error = error;
    }
    response.status(res.code).send(res);
}

/**
 * Refresh user's access token
 * @function
 * @name refreshToken
 * @inner
 * @const
 * @namespace Express
 * @param {object} user - User object
 */
async function refreshToken(user) {
    user.access_token = await spotify.refreshToken(user);
    await User.update(user._id, user);
}

exports.spotifyApp = spotifyApp;