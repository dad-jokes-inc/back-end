
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { authenticate } = require('../auth/authenticate');
const secret = require('../auth/secret');
const Users = require('../users/users-model');
const jokesRouter = require('../jokes/jokes-router');
const publicRouter = require('../public/public-router');
const userRouter = require('../users/user-router');

module.exports = server => {
    server.post('/api/register', register);
    server.post('/api/login', login);
    server.use('/api/jokes', authenticate, jokesRouter);
    server.use('/api/public', publicRouter);
    server.use('/api/users', userRouter);
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




