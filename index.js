const express = require('express');
const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle GET request for the home page
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Route to handle GET request for the about page
app.get('/about', (req, res) => {
    res.send('About Us');
});

// Route to handle GET request for items
const items = ['Apple', 'Banana', 'Cherry'];
app.get('/items', (req, res) => {
    res.json(items);
});

// Route to handle POST request to add a new item
app.post('/items', (req, res) => {
    const newItem = req.body.item;
    items.push(newItem);
    res.json(items);
});

// Route to handle POST request to submit data
app.use('/submit', (req, res) => {
    const data = req.body;
    res.send(`Received: ${JSON.stringify(data)}`);
});

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
