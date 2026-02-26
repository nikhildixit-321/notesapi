require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connect = require('./db.js')
const app = express();
const noteHandler = require('./contoller/note.js')
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connect(process.env.MONGODB_URL);

app.get('/', noteHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});