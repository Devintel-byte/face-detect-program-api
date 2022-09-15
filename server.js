const express = require('express');
const bodyParser = require('body-parser');
//const bcrypt = require('bcrypt');
var cors = require('cors');

const app = express();

// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '221',
            name: 'Michael',
            email: 'michjelly@gmail.com',
            password: 'jelly',
            entries: 0,
            joined: new Date()
        },
        {
            id: '222',
            name: 'Micah',
            email: 'michcarjack@gmail.com',
            password: 'carjack',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '123',
            hash: '',
            email: 'esthercway@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {
    
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json('success');
        } else {
            res.status(400).json('error logging in');
        }
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    database.users.push({
            id: '223',
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user)
        }
    })
    if (!found) {
        res.status(404).json('user not found!');
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries)
        }
    })
    if (!found) {
        res.status(404).json('user not found!');
    }
})

// bcrypt.hash(password, saltRounds, function(err, hash) {
//     console.log(hash);
// });

// // Load hash from your password DB.
// bcrypt.compare('fanbelt', '$2b$10$tKPYbz8x0SdKf.e1FMDS2uHa0GvgIXu1fn36H/44xCS1dsiaGpkE2', function(err, result) {
//     console.log('first guess', result);
// });
// bcrypt.compare('craft', '$2b$10$tKPYbz8x0SdKf.e1FMDS2uHa0GvgIXu1fn36H/44xCS1dsiaGpkE2', function(err, result) {
//     console.log('second guess', result);
// });

app.listen(3000, () => {
    console.log('app is running on port 3000');
});
