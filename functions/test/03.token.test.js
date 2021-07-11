const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should(); // do not remove
chai.use(chaiHttp);

/**
 * Tests for Token validations
 * @type {object}
 * @const
 * @namespace IntegrationTest
 */

describe('Token', () => {
    it('Should return 400 when header does not contain Authorization', (done) => {
        const url = `${BASE_URL}/token/validate`;
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

    it('Should return 500 when JWT Token is expired', (done) => {
        const url = `${BASE_URL}/token/validate`;
        chai.request(url)
            .get('/')
            .set('Authorization', EXPIRED_TOKEN)
            .end(function (err, res) {
                const body = {                    
                    message: 'jwt expired',
                    valid: false,
                }
                res.body.should.be.eql(body);
                done();
            });
    }).timeout(TIMEOUT);

    it('Should return 200 when JWT Token is valid', (done) => {
        const url = `${BASE_URL}/token/validate`;
        chai.request(url)
            .get('/')
            .set('Authorization', TOKEN)
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    }).timeout(TIMEOUT);
});