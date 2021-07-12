const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should(); // do not remove
chai.use(chaiHttp);

/**
 * Spotify api consumption test
 * @type {object}
 * @const
 * @namespace IntegrationTest
 */

describe('Connect', () => {
    it('Should return 400 when header does not contain Code', (done) => {
        const url = `${BASE_URL}/spotify/connect`;
        chai.request(url)
            .get('/')
            .end(function (err, res) {
                const body = {
                    'code': 400,
                    'message': 'Bad Request'
                }
                res.body.should.be.eql(body);
                done();
            });
    }).timeout(TIMEOUT);

});

describe('Playlists', () => {

    it('Should return 400 when header does not contain Authorization', (done) => {
        const url = `${BASE_URL}/spotify/playlist`;
        chai.request(url)
            .get('/')
            .end(function (err, res) {
                const body = {
                    'code': 400,
                    'message': 'Bad Request'
                }
                res.body.should.be.eql(body);
                done();
            });
    }).timeout(TIMEOUT);

    it('Should return 200 when header Authorization is valid', (done) => {
        const url = `${BASE_URL}/spotify/playlist`;
        chai.request(url)
            .get('/')
            .set('Authorization', TOKEN)
            .end(function (err, res) {
                expect(res).to.have.status(200);
                res.body.should.have.keys('code', 'message', "playLists");
                global.PLAYLIST_ID = res.body.playLists[0].id;
                done();
            });
    }).timeout(TIMEOUT);

    // it('Should return 500 when header Authorization has expired', (done) => {
    //     const url = `${BASE_URL}/spotify/playlist`;
    //     chai.request(url)
    //         .get('/')
    //         .set('Authorization', EXPIRED_TOKEN)
    //         .end(function (err, res) {
    //             expect(res).to.have.status(500);
    //             done();
    //         });
    // }).timeout(TIMEOUT);
});

describe('Tracks', () => {

    it('Should return 400 when header does not contain Authorization', (done) => {
        const url = `${BASE_URL}/spotify/tracks`;
        chai.request(url)
            .get('/')
            .end(function (err, res) {
                const body = {
                    'code': 400,
                    'message': 'Bad Request'
                }
                res.body.should.be.eql(body);
                done();
            });
    }).timeout(TIMEOUT);

    it('Should return 200 when header Authorization is valid', (done) => {
        const url = `${BASE_URL}/spotify/tracks`;
        chai.request(url)
            .get('/')
            .set('Authorization', TOKEN)
            .set('id', PLAYLIST_ID)
            .end(function (err, res) {
                expect(res).to.have.status(200);
                res.body.should.have.keys('code', 'message', "tracks");
                done();
            });
    }).timeout(TIMEOUT);

    it('Should return 500 when header id not present', (done) => {
        const url = `${BASE_URL}/spotify/tracks`;
        chai.request(url)
            .get('/')
            .set('Authorization', TOKEN)
            .end(function (err, res) {
                expect(res).to.have.status(500);
                done();
            });
    }).timeout(TIMEOUT);



    // it('Should return 500 when header Authorization has expired', (done) => {
    //     const url = `${BASE_URL}/spotify/tracks`;
    //     chai.request(url)
    //         .get('/')
    //         .set('Authorization', EXPIRED_TOKEN)
    //         .end(function (err, res) {
    //             expect(res).to.have.status(500);
    //             done();
    //         });
    // }).timeout(TIMEOUT);


});