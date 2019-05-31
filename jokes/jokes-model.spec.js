const db = require('../data/dbConfig');
const Jokes = require('./jokes-model');

describe('jokes model', () => {
    describe('add()', () => {
        beforeEach(async ()=> {
            await db('jokes').truncate();
        })
        it('should add jokes in db', async () => {
            await Jokes.add({
                joke:"a joke"
            })
            const jokes = await db('jokes');
            expect(jokes).toHaveLength(1)
        })
    })

    describe('delete()', () => {
        beforeEach(async ()=> {
            await db('jokes').truncate();
        })
        it('should remove joke from db', async () => {
            await Jokes.add({ 
                joke:'a joke'
            })
            const jokes = await db('jokes')
            expect(jokes).toHaveLength(1)

            const id = jokes[0].id
            await Jokes.remove(id);
            const newJokes = await db('jokes')
            expect(newJokes).toHaveLength(0)
        })
    })
})