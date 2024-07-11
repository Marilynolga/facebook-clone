const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = 'your_secret_key'; // Cambia esto a algo más seguro

// Registrar usuario
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send(user);
});

// Iniciar sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, SECRET_KEY);
        res.send({ token });
    } else {
        res.status(401).send('Credenciales incorrectas');
    }
});

// Editar perfil
router.put('/edit', async (req, res) => {
    const { userId, profile } = req.body;
    const user = await User.findByIdAndUpdate(userId, { profile }, { new: true });
    res.send(user);
});

// Eliminar cuenta
router.delete('/delete', async (req, res) => {
    const { userId } = req.body;
    await User.findByIdAndDelete(userId);
    res.send('Cuenta eliminada');
});

module.exports = router;