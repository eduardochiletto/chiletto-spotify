const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should(); // do not remove
chai.use(chaiHttp);

describe('Spotify', () => {
    require('./05.spotify.test');
});
