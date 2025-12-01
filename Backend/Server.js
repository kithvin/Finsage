// Import the Express framework for building web applications
const express = require('express');

// Create an instance of the Express application
const app = express();

// Define the port number for the server to listen on, defaulting to 5000 if not specified in the environment variables
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define the root route to respond with a JSON message indicating the server is running
app.get('/', (req, res) => {
    res.json({ message: 'Finsage Backend is running!' });
});

// Start the server and listen on the specified port, logging a message to the console when the server is running
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});