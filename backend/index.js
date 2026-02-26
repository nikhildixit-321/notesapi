require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connect = require('./db.js');
const app = express();

// Import controllers
const { createNote, getAllNotes, getNoteById, updateNote, deleteNote } = require('./contoller/note.js');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connect(process.env.MONGODB_URL);

// Routes
app.get('/api/notes', getAllNotes);
app.get('/api/notes/:id', getNoteById);
app.post('/api/notes', createNote);
app.put('/api/notes/:id', updateNote);
app.delete('/api/notes/:id', deleteNote);

// Health check route
app.get('/', (req, res) => {
    res.send("Notes API is running!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});