process.env.NODE_ENV = 'test';

const chai = require('chai');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const faker = require('faker');
const TrapModel = require('../trap/trap.model');

const server = require('../app');

chai.use(chaiHttp);
chai.should();

const trapId = 'mysupersecreturlxj34';

describe('DB save/find', () => {
  const newTrap = new TrapModel({
    trap_id: trapId,
    remote_ip: faker.internet.ip(),
    method: 'DELETE',
    scheme: faker.internet.protocol(),
    body: {},
    query_params: {},
    cookies: {},
    headers: { connection: 'keep-alive', 'user-agent': faker.internet.userAgent() },
  });

  before((done) => {
    TrapModel.deleteMany({}, (err) => {
      if (err) done(err);
      else done();
    });
  });

  describe('#save()', () => {
    it('should save without error', (done) => {
      newTrap.save((err) => {
        if (err) done(err);
        else done();
      });
    });
  });

  describe('#find()', () => {
    it('respond with matching records', (done) => {
      TrapModel.find({ trap_id: trapId }, (err, res) => {
        if (err) done(err);
        res.should.have.length(1);
        done();
      });
    });
  });

  after(() => {
    mongoose.connection.close();
    console.log('Connection closed!');
  });
});
