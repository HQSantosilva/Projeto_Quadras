const express = require('express');
const Servico = require('../models/servico');

const router = express.Router();

// Rota para lidar com as requisições POST do formulário de criação de quadra
router.post('/criar', async (req, res) => {
    try {
        const { quadraId, titulo, descricao, duracao, status } = req.body;

        // Verifica se o campo quadraId está presente nos dados recebidos do formulário
        if (!quadraId) {
            return res.status(400).send('ID da quadra não fornecido');
        }

        const servico = new Servico({
            quadraId,
            titulo,
            descricao,
            duracao,
            status
        });

        await servico.save();
        res.send('Serviço criado com sucesso!');
    } catch (error) {
        console.error('Erro ao criar serviço:', error);
        res.status(500).send('Erro ao criar serviço');
    }
});

router.get('/', async (req, res) => {
    try {
        const servicos = await Servico.find();
        res.json(servicos);
    } catch (error) {
        console.error('Erro ao buscar serviços:', error);
        res.status(500).send('Erro ao buscar serviços');
    }
});

router.put('/:id', async (req, res) => {
    const { quadraId, titulo, descricao, duracao, status, dataCadastro } = req.body;
    try {
        const servico = await Servico.findByIdAndUpdate(req.params.id, {
            quadraId,
            titulo,
            descricao,
            duracao,
            status,
            dataCadastro
        });
        res.send('Serviço atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar serviço:', error);
        res.status(500).send('Erro ao atualizar serviço');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const servico = await Servico.findByIdAndDelete(req.params.id);
        res.send('Serviço excluído com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir serviço:', error);
        res.status(500).send('Erro ao excluir serviço');
    }
});

router.get('/', async (req, res) => {
    try {
        const filtro = {};
        if (req.query.quadraId) {
            filtro.quadraId = req.query.quadraId;
        }
        if (req.query.titulo) {
            filtro.titulo = req.query.titulo;
        }
        if (req.query.descricao) {
            filtro.descricao = req.query.descricao;
        }
        if (req.query.duracao) {
            filtro.duracao = req.query.duracao;
        }
        if (req.query.status) {
            filtro.status = req.query.status;
        }
        if (req.query.dataCadastro) {
            filtro.dataCadastro = req.query.dataCadastro;
        }

        const servicos = await Servico.find(filtro);

        res.json(servicos);
    } catch (error) {
        console.error('Erro ao buscar agendas:', error);
        res.status(500).send('Erro ao buscar agendas');
    }
});
module.exports = router;
