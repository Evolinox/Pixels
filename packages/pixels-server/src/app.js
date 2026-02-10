const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const pictureRoutes = require('./routes/pictureRoutes');
const albumRoutes = require('./routes/albumRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/storage', express.static(path.join(__dirname, '../storage')));

app.use('/auth', authRoutes);
app.use('/pictures', pictureRoutes);
app.use('/albums', albumRoutes);
app.use('/users', userRoutes);

module.exports = app;