process.env.NODE_ENV = 'test';

const chai = require('chai');

const chaiHttp = require('chai-http');
const server = require('../app');

chai.use(chaiHttp);
chai.should();

describe('endpoints are available', () => {
  describe('/GET homepage', () => {
    it('homepage is available', () => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
        });
    });
  });

  describe('/GET mysupersecreturlxj34/requests', () => {
    it('route for display requests is available', () => {
      chai.request(server)
        .get('/mysupersecreturlxj34/requests')
        .end((err, res) => {
          res.should.have.status(200);
        });
    });
  });

  describe('mysupersecreturlxj34', () => {
    it('route for sending requests to be captured is available by GET method', () => {
      chai.request(server)
        .get('/mysupersecreturlxj34')
        .end((err, res) => {
          res.should.have.status(201);
        });
    });
    it('route for sending requests to be captured is available by POST method', () => {
      chai.request(server)
        .post('/mysupersecreturlxj34')
        .end((err, res) => {
          res.should.have.status(201);
        });
    });
  });
});
