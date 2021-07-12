const SpotifyWebApi = require('spotify-web-api-node');

// You need to create an application in https://developer.spotify.com/dashboard/login
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URL,
});

/**
 * This class controls the Spotify's API. 
 * @name Spotify
 * @class
 * @const
 * @namespace SpotifyAPI
 */

class Spotify {

    /**
     * Returns an object whith access_token and refresh_token
     * @param  {string} code  [Pass the code informed by spotify in the url parameters]
     * @returns {object} object [Returns a json object]
     * @example 
     * const res = await spotify.getAuthorizaton(request.headers.code);
     */
    async getAuthorizaton(code) {
        return new Promise(async (resolve, reject) => {

            try {
                const data = await spotifyApi.authorizationCodeGrant(code);
                resolve({
                    success: true,
                    access_token: data.body.access_token,
                    refresh_token: data.body.refresh_token,
                });
            } catch (error) {
                reject({
                    success: false,
                    access_token: '',
                    refresh_token: '',
                })
            }
        });
    };

    /**
     * Refreshes the user's token on spotify.
     * @param  {object} user  [Pass the user object]
     * @returns {string} acess_token [Returns a new acess_token]
     * @example 
     * const access_token = await spotify.refreshToken(user);
     */
    async refreshToken(user) {
        spotifyApi.setAccessToken(user.access_token);
        spotifyApi.setRefreshToken(user.refresh_token);
        return (await spotifyApi.refreshAccessToken()).body.access_token;
    };

    /**
     * Return all user's public playslits on spotify
     * @param  {object} user  [Pass the user object]
     * @returns {object} items [A set of playlists]     
     * @example 
     * const playlists = await spotify.getUserPlaylists(user);
     */
    async getUserPlaylists(user) {
        return new Promise(async (resolve, reject) => {
            spotifyApi.setAccessToken(user.access_token);
            spotifyApi.setRefreshToken(user.refresh_token);

            try {
                const playLists = await spotifyApi.getUserPlaylists();
                resolve(playLists.body.items);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Returns as tracks from a specific list limited to 50 per request
     * @param  {object} user  [Pass the user object]
     * @returns {string} playlistId [id of playlist]
     * @returns {number} offset [total items to be returned (cannot exceed 50)]
     * @example 
     * let tracks = [];
     * let _continue = true;
     * let offset = 0;
     * while (_continue) {
     *      const list = await spotify.getPlaylistTracks(user playlistId, offset);
     *      offset += 50;
     *      _continue = list.length > 0;
     *      tracks = tracks.concat(list);
     * }

     */
    async getPlaylistTracks(user, playlistId, offset) {
        return new Promise(async (resolve, reject) => {
            spotifyApi.setAccessToken(user.access_token);
            spotifyApi.setRefreshToken(user.refresh_token);
            if (!offset) {
                offset = 1;
            }

            try {
                const tracks = await spotifyApi.getPlaylistTracks(playlistId, {
                    offset,
                    limit: 50,
                    fields: 'items'
                });
                resolve(tracks.body.items);
            } catch (error) {
                reject(error);
            }
        });
    }
}

exports.spotify = new Spotify();