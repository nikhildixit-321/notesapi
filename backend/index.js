require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connect = require('./db.js')
const app = express();

app.use(cors());

connect(process.env.MONGODB_URL);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});