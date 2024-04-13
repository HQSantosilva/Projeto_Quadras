const express = require('express');
const Quadra = require('../models/quadra');

const router = express.Router();

// Rota para lidar com as requisições POST do formulário de criação de quadra
router.post('/criar', async (req, res) => {
    try {
        const { nome, foto, descricao } = req.body;

        const quadra = new Quadra({
            nome,
            foto,
            descricao
        });

        await quadra.save();
        res.send('Quadra criada com sucesso!');
    } catch (error) {
        console.error('Erro ao criar quadra:', error);
        res.status(500).send('Erro ao criar quadra');
    }
});

module.exports = router;
