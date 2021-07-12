const chai = require('chai');
const chaiHttp = require('chai-http');
const {
    ObjectID
} = require('mongodb');
const expect = chai.expect;
const should = chai.should(); // do not remove
chai.use(chaiHttp);


/**
 * Tests for user query
 * @type {object}
 * @const
 * @namespace IntegrationTest
 */
describe('Get User', () => {
    it('Should return 200 in query when user exist', (done) => {
        const url = `${BASE_URL}/database/user/get/${USER.exist.email}/${USER.exist.password}`;
        chai.request(url)
            .get('/')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                res.body.should.have.keys('code', 'token', 'user');

                global.TOKEN = res.body.token;
                done();
            });
    }).timeout(TIMEOUT);

    it('Should return 404 in query when user does not exist', (done) => {
        const url = `${BASE_URL}/database/user/get/${USER.notExist.email}/${USER.notExist.password}`;
        chai.request(url)
            .get('/')
            .end(function (err, res) {
                expect(res).to.have.status(404);
                res.body.should.have.keys('code', 'message');
                done();
            });
    }).timeout(TIMEOUT);
});

/**
 * Tests for creating users
 * @type {object}
 * @const
 * @namespace IntegrationTest
 */
describe('Create User', () => {

    it('Should return 500 when creating a user with missing headers.', (done) => {
        const url = `${BASE_URL}/database/user`;
        chai.request(url)
            .post('/')
            .end(function (err, res) {
                expect(res).to.have.status(500);
                done();
            });
    }).timeout(TIMEOUT);

    it('Should return 500 when creating a user that already exist', (done) => {
        const url = `${BASE_URL}/database/user`;
        chai.request(url)
            .post('/')
            .send({
                email: USER.exist.email,
                password: USER.exist.password,
            })
            .end(function (err, res) {
                expect(res).to.have.status(500);
                done();
            });
    }).timeout(TIMEOUT);


});

/**
 * Tests for updating users
 * @type {object}
 * @const
 * @namespace IntegrationTest
 */
 describe('Update User', () => {

    it('Should return 500 when updating a user with missing body.', (done) => {
        const url = `${BASE_URL}/database/user/update`;
        chai.request(url)
            .put('/')
            .end(function (err, res) {
                expect(res).to.have.status(500);
                done();
            });
    }).timeout(TIMEOUT);

    it('Should return 404 when updating a user that not exist', (done) => {
        const url = `${BASE_URL}/database/user/update`;
        chai.request(url)
            .put('/')
            .send({
                _id: ObjectID().toHexString(),
                name: 'Eduardo',
            })
            .end(function (err, res) {
                expect(res).to.have.status(404);
                res.body.should.have.keys('code', 'message');
                done();
            });
    }).timeout(TIMEOUT);

    it('Should return 200 when updating a user that exist', (done) => {
        const url = `${BASE_URL}/database/user/update`;
        chai.request(url)
            .put('/')
            .send({
                _id: '60e9aca05efc37eaae0de797',
                name: 'Eduardo',
            })
            .end(function (err, res) {
                expect(res).to.have.status(200);
                res.body.should.have.keys('code', 'message');
                done();
            });
    }).timeout(TIMEOUT);


});