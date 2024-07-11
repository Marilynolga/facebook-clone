const express = require('express');
const router = express.Router();
const Friend = require('../models/Friend');

// Enviar solicitud de amistad
router.post('/add', async (req, res) => {
    const { userId, friendId } = req.body;
    const friendRequest = new Friend({ userId, friendId });
    await friendRequest.save();
    res.status(201).send(friendRequest);
});

// Aceptar solicitud de amistad
router.post('/accept', async (req, res) => {
    const { userId, friendId } = req.body;
    const friendRequest = await Friend.findOneAndUpdate({ userId, friendId, status: 'pending' }, { status: 'accepted' });
    res.send(friendRequest);
});

// Rechazar solicitud de amistad
router.post('/decline', async (req, res) => {
    const { userId, friendId } = req.body;
    const friendRequest = await Friend.findOneAndUpdate({ userId, friendId, status: 'pending' }, { status: 'declined' });
    res.send(friendRequest);
});

// Obtener lista de amigos
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const friends = await Friend.find({ userId, status: 'accepted' });
    res.send(friends);
});

module.exports = router;