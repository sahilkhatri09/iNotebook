const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const connectToMongo = require('./db');
const cors = require('cors');



connectToMongo();
const app = express();
const port = 4000;


app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`inotebook backend listening at http://localhost:${port}`)
})