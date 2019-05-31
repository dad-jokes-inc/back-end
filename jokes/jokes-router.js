const router = require('express').Router();
const Jokes = require('./jokes-model');


router.get('/',  (req, res) => {

    Jokes.find().then(jokes => {
        res.status(200).json(jokes)
    }).catch(err => {
        res.status(500).json(err)
    })
});

router.post('/', async (req, res) => {
    const content = req.body 
    if(content){
        try{
            Jokes.add(content, req.decoded.subject)
            .then(newJokes => {
                res.status(201).json(newJokes)
            })
            .catch(err => {res.status(500).json(err)})
            
        } catch(error){ res.status(500).json({ message: 'Something wrong when you write the joke, please try again'})}
    } else{
        res.status(400).json({ message: 'Please provide content'})
    }
});

router.get('/user/:id', async (req, res) => {
    try{
        const jokes = await Jokes.findByUser(req.params.id);
        res.status(200).json(jokes)
    }catch(error){
        res.status(500).json({ message: 'Error occurred when retrieving jokes'})
    }
})

router.get('/:id', async (req, res) => {
    const{ id } = req.params;
    try{
        const joke = await Jokes.findById(id);
        res.status(200).json(joke)
    }catch(error){
        res.status(500).json({ message: 'Error occurred when retrieving jokes'})
    }
})



router.put('/:id', async (req, res) => {
    const changes = req.body;
    
    if(changes.joke){
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
        res.status(400).json({ message: 'please provide the id of the joke'})
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