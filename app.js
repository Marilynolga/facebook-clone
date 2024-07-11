const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect('mongodb://127.0.0.1/facebook-clone', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Rutas
const usersRoutes = require('./routes/users');
const friendsRoutes = require('./routes/friends');
const postsRoutes = require('./routes/posts');

app.use('/users', usersRoutes);
app.use('/friends', friendsRoutes);
app.use('/posts', postsRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});