require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(express.json());

const AppRouter = require('./routes/app');
app.use('/app', AppRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
