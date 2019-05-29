const router = require('express').Router();
const Jokes = require('./jokes-model');

router.get('/', async (req, res) => {
    try{
        const jokes = await Jokes.find();
        res.status(200).json(jokes)
    }catch(error){
        res.status(500).json({ message: 'Error occurred when retrieving jokes'})
    }
});

router.post('/', async (req, res) => {
    const content = req.body
    if(content){
        try{
            console.log('joke', content)
            Jokes.add(content)
            .then(newJokes => {
                res.status(201).json(newJokes)
            })
            .catch(err => {res.status(500).json(err)})
            
        } catch(error){ res.status(500).json({ message: 'Something wrong when you write the joke, please try again'})}
    } else{
        res.status(400).json({ message: 'Please provide content'})
    }
});

router.put('/:id', async (req, res) => {
    const changes = req.body;
    if(changes.content){
        try{
            const updated = await Jokes.update(req.params.id, changes);
            if(updated){
                res.status(200).json(updated)
            }else{
                res.status(404).json({ message: 'Can not locate the joke you are looking for...'})
            }
        } catch(error) {
            res.status(500).json({ message: 'Something wrong when we try to locate the jokes'})
        }
    } else{
        res.status(400).json({ message: 'please provide the if of the track'})
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const count = await Jokes.remove(req.params.id);
        if(count>0){
            res.status(204).end();
        } else {
            res.status(404).json({
                message: 'that joke does not exist, perhaps it was deleted already'
            })
        }
    } catch(error) {
        res.status(500).json({ message: 'We have problem to deleting the joke'})
    }
});

router.use((req, res, next) => {
    res.status(404).json({ message: 'no jokes here yet, but you are in the jokesRouter'})
})

module.exports = router;