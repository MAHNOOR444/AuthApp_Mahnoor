const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { validateEmail, validatePassword, validateUsername } = require('./utils/validation');

const app = express();
const PORT = process.env.PORT || 3000;

// Simple in-memory "database" for storing users
const users = [];

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome' });
});

app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

app.get('/signup', (req, res) => {
    res.render('signup', { error: null });
});

app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.render('signup', { error: 'Please provide all fields' });
    }

    if (!validateUsername(username)) {
        return res.render('signup', { error: 'Username must be alphanumeric and at least 3 characters long' });
    }

    if (!validateEmail(email)) {
        return res.render('signup', { error: 'Please provide a valid email' });
    }

    if (!validatePassword(password)) {
        return res.render('signup', { error: 'Password must be at least 8 characters long' });
    }

    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.render('signup', { error: 'User already exists' });
    }

    users.push({ username, email, password });
    res.redirect('/login');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render('login', { error: 'Please provide email and password' });
    }

    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.render('login', { error: 'Invalid email or password' });
    }

    res.render('home', { user });
});

// Start server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app; // For testing
