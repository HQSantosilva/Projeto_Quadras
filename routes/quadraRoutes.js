const express = require('express');
const Quadra = require('../models/quadra');

const router = express.Router();

router.post('/criar', async (req, res) => {
    try {
        const { nome, foto, descricao, tipo } = req.body;

        const quadra = new Quadra({
            nome,
            foto,
            descricao,
            tipo
        });

        await quadra.save();
        res.send('Quadra criada com sucesso!');
    } catch (error) {
        console.error('Erro ao criar quadra:', error);
        res.status(500).send('Erro ao criar quadra');
    }
});

router.put('/:id', async (req, res) => {
    const { nome, foto, descricao, tipo } = req.body;
    try {
        const quadra = await Quadra.findByIdAndUpdate(req.params.id, {
            nome,
            foto,
            descricao,
            tipo
        });
        res.send('Quadra atualizada com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar quadra:', error);
        res.status(500).send('Erro ao atualizar quadra');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const quadra = await Quadra.findByIdAndDelete(req.params.id);
        res.send('Quadra excluída com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir quadra:', error);
        res.status(500).send('Erro ao excluir quadra');
    }
});

router.get('/', async (req, res) => {
    try {
        const filtro = {};
        if (req.query.nome) {
            filtro.nome = req.query.nome;
        }
        const quadras = await Quadra.find(filtro);

        res.json(quadras);
    } catch (error) {
        console.error('Erro ao buscar quadras:', error);
        res.status(500).send('Erro ao buscar quadras');
    }
});
module.exports = router;
