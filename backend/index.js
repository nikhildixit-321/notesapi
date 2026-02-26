require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connect = require('./db.js');
const app = express();

const { createNote, getAllNotes, getNoteById, updateNote, deleteNote,editNote } = require('./contoller/note.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect(process.env.MONGODB_URL);

app.get('/api/notes', getAllNotes);
app.get('/api/notes/:id', getNoteById);
app.post('/api/notes', createNote);
app.put('/api/notes/edit/:id', editNote);
app.put('/api/notes/:id', updateNote);
app.delete('/api/notes/:id', deleteNote);

app.get('/', (req, res) => {
    res.send("Notes API is running!");
});
// sever started 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});