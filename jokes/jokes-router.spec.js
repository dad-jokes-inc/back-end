const request = require('supertest');
const route = require('./jokes-router');

describe('jokes route', () => {
    describe('endpoints', () => {
        describe('get /', () => {
            it('should return a ok', async () => {
                const res = await request(route).get('/')
                expect(res.status).toBe(200)
            })
        })
    })
})