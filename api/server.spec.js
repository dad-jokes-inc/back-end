const request = require('supertest');
const server = require('./server');

describe('server', () => {
    test('should set the test env', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })

})