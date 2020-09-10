const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const itemsRoutes = require('./routes/api/items');
const authRoutes = require('./routes/api/auth');
const usersRoutes = require('./routes/api/users');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const db = process.env.MONGO_URI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));

app.use('/api/items', itemsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server started at port ${PORT}`)});
