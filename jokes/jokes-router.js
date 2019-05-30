const router = require('express').Router();
const Jokes = require('./jokes-model');
const db = require('../data/dbConfig');
const Users = require('../users/users-model');

router.get('/',  (req, res) => {

    Jokes.find().then(jokes => {
        res.status(200).json(jokes)
    }).catch(err => {
        res.status(500).json(err)
    })
    
    // try{
    //     const jokes = await Jokes.find();
    //     res.status(200).json(jokes)
    // }catch(error){
    //     res.status(500).json({ message: 'Error occurred when retrieving jokes'})
    // }
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
    console.log(id)
    try{
        const joke = await Jokes.findById(id);
        res.status(200).json(joke)
    }catch(error){
        res.status(500).json({ message: 'Error occurred when retrieving jokes'})
    }
})


// router.put('/:id', async (req, res) => {
//     const {joke, user_id} = req.body;
//     console.log(req.body);
//     if(joke){
//         console.log('joke:', joke)
//         const {id} =req.params;
//         const sameUser = await Users.findById(id);
//         const updated = await Jokes.update(req.params.id, req.body);
//         console.log('id:', id)
//         try{
//             if(updated.user_id != sameUser.id) {
//             res.status(400).json({message: 'you cannot edit'})
//             } else { 
//                 res.status(200).json({message: 'edit complete'})
//                 }
//             } 
//         catch(error){
//             res.status(400).json({message:'no, but in edit route'})
//         }   
//     }else{
//         res.status(400).json({message:'please provide id of the joke'})
//     }
// })


router.put('/:id', async (req, res) => {
    const changes = req.body;
    if(changes.joke){
        try{
            const updated = await Jokes.update(req.params.id, changes);
            if(updated){
                console.log(changes);
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