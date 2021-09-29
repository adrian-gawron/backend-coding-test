'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');

describe('API tests', () => {
  before((done) => {
    db.serialize((err) => {
      if (err) {
        return done(err);
      }

      buildSchemas(db);

      done();
    });
  });

  describe('GET /health', () => {
    it('should return health', (done) => {
      request(app)
          .get('/health')
          .expect('Content-Type', /text/)
          .expect(200, done);
    });
  });

  describe('POST /rides', () => {
    it('should create rides', (done) => {
      request(app)
          .post('/rides')
          .send(
              {'start_lat':1,
              'start_long':1,
              'end_lat':1,
              'end_long':1,
              'rider_name':'Rider name',
              'driver_name':'Driver name',
              'driver_vehicle':'Driver vehicle'},
          )
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, [{
            rideID:1,
            startLat:1,
              startLong:1,
              endLat:1,
              endLong:1,
              riderName:'Rider name',
              driverName:'Driver name',
              driverVehicle:'Driver vehicle'}], done);
    });
  });

  describe('POST /rides', () => {
    it('should return validation error: start_lat < -90', (done) => {
      request(app)
          .post('/rides')
          .send(
              {'start_lat':-91,
              'start_long':1,
              'end_lat':1,
              'end_long':1,
              'rider_name':'Rider name',
              'driver_name':'Driver name',
              'driver_vehicle':'Driver vehicle'},
          )
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, {
            error_code: 'VALIDATION_ERROR',
        message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'}, done);
    });
  });

  describe('POST /rides', () => {
    it('should return validation error: end_lat < -90', (done) => {
      request(app)
          .post('/rides')
          .send(
              {'start_lat':1,
              'start_long':1,
              'end_lat':-91,
              'end_long':1,
              'rider_name':'Rider name',
              'driver_name':'Driver name',
              'driver_vehicle':'Driver vehicle'},
          )
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, {
            error_code: 'VALIDATION_ERROR',
        message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'}, done);
    });
  });

  describe('POST /rides', () => {
    it('should return validation error: rider name', (done) => {
      request(app)
          .post('/rides')
          .send(
              {'start_lat':1,
              'start_long':1,
              'end_lat':1,
              'end_long':1,
              'rider_name':'',
              'driver_name':'Driver name',
              'driver_vehicle':'Driver vehicle'},
          )
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, {
            error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string'}, done);
    });
  });

  describe('POST /rides', () => {
    it('should return validation error: driver name', (done) => {
      request(app)
          .post('/rides')
          .send(
              {'start_lat':1,
              'start_long':1,
              'end_lat':1,
              'end_long':1,
              'rider_name':'Rider name',
              'driver_name':'',
              'driver_vehicle':'Driver vehicle'},
          )
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, {
            error_code: 'VALIDATION_ERROR',
        message: 'Driver name must be a non empty string'}, done);
    });
  });

  describe('POST /rides', () => {
    it('should return validation error: vehicle name', (done) => {
      request(app)
          .post('/rides')
          .send(
              {'start_lat':1,
              'start_long':1,
              'end_lat':1,
              'end_long':1,
              'rider_name':'Rider name',
              'driver_name':'Driver name',
              'driver_vehicle':''},
          )
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, {
            error_code: 'VALIDATION_ERROR',
        message: 'Vehicle name must be a non empty string'}, done);
    });
  });

  describe('GET /rides', () => {
    it('should return all rides', (done) => {
      request(app)
          .get('/rides')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, [{
            rideID:1,
            startLat:1,
              startLong:1,
              endLat:1,
              endLong:1,
              riderName:'Rider name',
              driverName:'Driver name',
              driverVehicle:'Driver vehicle'}], done);
    });
  });

  describe('GET /rides', () => {
    it('get all rides should return not found error after using offset', (done) => {
      request(app)
          .get('/rides?offset=5')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, {
            error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides',}, done);
    });
  });

  describe('GET /rides/rideID', () => {
    it('should return ride based on rideId', (done) => {
      request(app)
          .get('/rides/1')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, [{
            rideID:1,
            startLat:1,
              startLong:1,
              endLat:1,
              endLong:1,
              riderName:'Rider name',
              driverName:'Driver name',
              driverVehicle:'Driver vehicle'}], done);
    });
  });

  describe('GET /rides/rideID', () => {
    it('should return ride based on rideId', (done) => {
      request(app)
          .get('/rides/test')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, {
            error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides',}, done);
    });
  });

  describe('GET /rides/rideID', () => {
    it('get should return server error', (done) => {
      db.close()
      request(app)
          .get('/rides/odf dfspdf ')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, {
            error_code: 'SERVER_ERROR',
          message: 'Unknown error',}, done);
    });
  });

  describe('GET /rides', () => {
    it('get all rides should return server error after closing db connection', (done) => {
      request(app)
          .get('/rides')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, {
            error_code: 'SERVER_ERROR',
          message: 'Unknown error',}, done);
    });
  });

  describe('POST /rides', () => {
    it('post should return server error', (done) => {
      request(app)
          .post('/rides')
          .send(
              {'start_lat':1,
              'start_long':1,
              'end_lat':1,
              'end_long':1,
              'rider_name':'Rider name',
              'driver_name':'Driver name',
              'driver_vehicle':'Vehicle name'},
          )
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, {
            error_code: 'SERVER_ERROR',
          message: 'Unknown error'}, done);
    });
  });
});
