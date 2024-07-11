const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Crear una publicación
router.post('/create', async (req, res) => {
    const { userId, content } = req.body;
    const post = new Post({ userId, content });
    await post.save();
    res.status(201).send(post);
});

// Editar una publicación
router.put('/edit', async (req, res) => {
    const { postId, content } = req.body;
    const post = await Post.findByIdAndUpdate(postId, { content }, { new: true });
    res.send(post);
});

// Eliminar una publicación
router.delete('/delete', async (req, res) => {
    const { postId } = req.body;
    await Post.findByIdAndDelete(postId);
    res.send('Publicación eliminada');
});

// Obtener todas las publicaciones
router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
});

// Agregar un comentario
router.post('/comment', async (req, res) => {
    const { postId, userId, content } = req.body;
    const comment = new Comment({ postId, userId, content });
    await comment.save();
    res.status(201).send(comment);
});

module.exports = router;