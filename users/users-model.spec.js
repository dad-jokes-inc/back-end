const db = require('../data/dbConfig');
const Users = require('./users-model');

describe('users model', () => {
    describe('add()', () => {
        beforeEach(async () => {
            await db('users').truncate();
        })

        it('should add the provide user to db', async () => {
            await Users.add({ username: 'gaffer', password:'123' });
            const users = await db('users');
            expect(users).toHaveLength(1)
        })
    })

    describe('remove()', () => {
        beforeEach(async () => {
            await db('users').truncate();
        })

        it('should delete', async () => {
            await Users.add({ username: 'ray', password: '123'})
            const users = await db('users')
            expect(users).toHaveLength(1);

            const id = users[0].id;
            await Users.remove(id)
            const changedUsers = await db('users')
            expect(changedUsers).toHaveLength(0)
        })
    })
})