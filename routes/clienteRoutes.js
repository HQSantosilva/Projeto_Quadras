const express = require('express');
const Cliente = require('../models/cliente');

const router = express.Router();

// Rota para lidar com as requisições POST do formulário de cadastro de clientes
router.post('/cadastro', async (req, res) => {
    try {
        const { nome, email, cpf, telefone, endereco } = req.body;

        const cliente = new Cliente({
            nome,
            email,
            cpf,
            telefone,
            endereco
        });

        await cliente.save();
        res.send('Cliente cadastrado com sucesso!');
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        res.status(500).send('Erro ao cadastrar cliente');
    }
});

module.exports = router;
