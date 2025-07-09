const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use session for authentication
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

// User model
const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

// Register Route
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists
        const userExists = await User.findOne({ username });
        if (userExists) return res.status(400).send('User already exists!');

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).send('User registered successfully!');
    } catch (err) {
        res.status(500).send('Error registering user.');
    }
});

// Login Route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('User does not exist.');

        // Compare password with hashed password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password.');

        // Set session or create JWT token
        req.session.user = user.username;  // For session-based login
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).send('Error during login.');
    }
});

// Sign In Route
app.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('User does not exist.');

        // Compare password with hashed password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password.');

        // Set session or create JWT token
        req.session.user = user.username;  // For session-based login
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Sign In successful', token });
    } catch (err) {
        res.status(500).send('Error during sign-in.');
    }
});

// Logout Route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error during logout.');
        res.redirect('/');
    });
});

// Home Route (protected with session)
app.get('/', (req, res) => {
    if (req.session.user) {
        res.send(`<h1>Welcome ${req.session.user}</h1><a href="/logout">Logout</a>`);
    } else {
        res.send('<h1>Welcome to the Login System</h1><a href="/login">Login</a>');
    }
});

// Handle sign-in navigation
app.get('/signin', (req, res) => {
    res.sendFile(__dirname + '/signin.html');
});

// Handle login page navigation
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
