process.env.NODE_ENV = 'test';

const chai = require('chai');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const TrapModel = require('../trap/trap.model');

const server = require('../app');

chai.use(chaiHttp);
chai.should();

const trapId = 'mysupersecreturlxj34';

describe('Traps', () => {
  before((done) => {
    TrapModel.deleteMany({}, (err) => {
      done();
    });
  });
  after(() => {
    mongoose.connection.close();
    console.log('Connection closed!');
  });
  before((done) => {
    const newTrap = new TrapModel({
      trap_id: trapId,
      remote_ip: '127.0.0.1',
      method: 'DELETE',
      scheme: 'https',
      body: {},
      query_params: {},
      cookies: {},
      headers: {},
    });

    newTrap.save((err, trap) => {
      done();
    });
  });

  describe(`get trap for trap_id = ${trapId}`, () => {
    it('is available', (done) => {
      chai.request(server)
        .get(`/${trapId}/requests`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
