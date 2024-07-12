const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

router.get('/', async (req, res) => {
    try {
        const games = await Game.findAll();
        res.json(games);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch games' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { board, currentPlayer, status } = req.body;
        const game = await Game.create({ board, currentPlayer, status });
        res.json(game);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create game' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { board, currentPlayer, status } = req.body;
        const game = await Game.findByPk(id);
        if (game) {
            game.board = board;
            game.currentPlayer = currentPlayer;
            game.status = status;
            await game.save();
            res.json(game);
        } else {
            res.status(404).json({ error: 'Game not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Unable to update game' });
    }
});

module.exports = router;
