const express = require('express');
const Cliente = require('../models/cliente');

const router = express.Router();

// Rota para lidar com as requisições POST do formulário de cadastro de clientes
router.post('/cadastro', async (req, res) => {
    try {
        const { nome, email, cpf, telefone, endereco, senha, tipo } = req.body;

        const cliente = new Cliente({
            nome,
            email,
            cpf,
            telefone,
            endereco,
            senha,
            tipo
        });

        await cliente.save();
        res.send(cliente);
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        res.status(500).send('Erro ao cadastrar cliente');
    }
});

router.put('/:id', async (req, res) => {
    const { nome, email, cpf, telefone, endereco, senha, status } = req.body;
    try {
        const cliente = await Cliente.findByIdAndUpdate(req.params.id, {
            nome,
            email,
            cpf,
            telefone,
            endereco,
            senha,
            status
        });
        res.send('Cliente atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        res.status(500).send('Erro ao atualizar cliente');
    }
});

// router.post('/login', async (req, res) => {
//     try {
//         const { email, senha } = req.body;
//         const cliente = await Cliente.findOne({ email, senha });

//         if (!cliente) {
//             return res.status(401).send('Email ou senha incorretos');
//         }

//         res.send(cliente);
//     } catch (error) {
//         console.error('Erro ao realizar login:', error);
//         res.status(500).send('Erro ao realizar login');
//     }
// });

router.delete('/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndDelete(req.params.id);
        res.send('Cliente excluído com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        res.status(500).send('Erro ao excluir cliente');
    }
});

router.get('/', async (req, res) => {
    try {
        const filtro = {};
        if (req.query.nome) {
            filtro.nome = req.query.nome;
        }
        if (req.query.email) {
            filtro.email = req.query.email;
        }
        if (req.query.cpf) {
            filtro.cpf = req.query.cpf;
        }
        if (req.query.telefone) {
            filtro.telefone = req.query.telefone;
        }
        if (req.query.endereco) {
            filtro.endereco = req.query.endereco;
        }
        const clientes = await Cliente.find(filtro);

        res.json(clientes);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).send('Erro ao buscar clientes');
    }
});

router.get('/perfil/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        res.json(cliente);
    } catch (error) {
        console.error('Erro ao buscar cliente por ID:', error);
        res.status(500).send('Erro ao buscar cliente por ID');
    }
});

module.exports = router;
