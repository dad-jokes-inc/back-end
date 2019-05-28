// const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { authenticate } = require('../auth/authenticate');
const secret = require('../auth/secret');
const Users = require('../users/users-model');
const jokesRouter = require('../jokes/jokes-router');

module.exports = server => {
    server.post('/api/register', register);
    server.post('/api/login', login);
    server.get('/api/jokes', authenticate, jokesRouter);
}

function register(req, res) {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    Users.add(user)
    .then(saved => {res.status(201).json(saved)})
    .catch(err => {res.status(500).json(err)})
}

function login(req, res) {
    let {username, password } = req.body;
    Users.findBy({ username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
            const token = generateToken(user)
            res.status(200).json({ message: `hi ${user.username}`, token})
        }else{
            res.status(401).json({ message:'no token found' })
        }
    })
    .catch(err => { res.status(500).json(err)})
}

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };

    const options = {
        expiresIn: '1d',
    };

    return jwt.sign(payload, secret.jwtKey, options);
};



// function getJokes(req, res){
//     const requestOptions = {
//         headers: { accept: 'application/json'},
//     };

//     axios
//     .get('https://icanhazdadjoke.com/search', requestOptions)
//     .then(response => {
//       res.status(200).json(response.data.results);
//     })
//     .catch(err => {
//       res.status(500).json({ message: 'Error Fetching Jokes', error: err });
//     });
// }


