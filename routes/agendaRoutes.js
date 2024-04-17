const express = require('express');
const Agenda = require('../models/agenda');

const router = express.Router();

// Rota para lidar com as requisições POST do formulário de criação de agendamento
router.post('/', async (req, res) => {
    try {
        const { clienteId, quadraId, servicoId, dataReserva } = req.body;

        const agenda = new Agenda({
            clienteId,
            quadraId,
            servicoId,
            dataReserva
        });

        await agenda.save();
        res.send('Agenda criada com sucesso!');
    } catch (error) {
        console.error('Erro ao criar agenda:', error);
        res.status(500).send('Erro ao criar agenda');
    }
});

// Rota para atualizar um registro de agenda existente
router.put('/:id', async (req, res) => {
    const { clienteId, quadraId, servicoId, dataReserva, dataCadastro } = req.body;
    try {
        const agenda = await Agenda.findByIdAndUpdate(req.params.id, {
            clienteId,
            quadraId,
            servicoId,
            dataReserva,
            dataCadastro
        });
        res.send('Registro de agenda atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar agenda:', error);
        res.status(500).send('Erro ao atualizar agenda');
    }
});

// Rota para excluir um registro de agenda
router.delete('/:id', async (req, res) => {
    try {
        const agenda = await Agenda.findByIdAndDelete(req.params.id);
        res.send('Registro de agenda excluído com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir agenda:', error);
        res.status(500).send('Erro ao excluir agenda');
    }
});

// Rota para buscar agendas com base em filtros opcionais
router.get('/', async (req, res) => {
    try {
        const filtro = {};
        if (req.query.clienteId) filtro.clienteId = req.query.clienteId;
        if (req.query.quadraId) filtro.quadraId = req.query.quadraId;
        if (req.query.servicoId) filtro.servicoId = req.query.servicoId;
        if (req.query.dataReserva) filtro.dataReserva = req.query.dataReserva;
        if (req.query.dataCadastro) filtro.dataCadastro = req.query.dataCadastro;

        const agendas = await Agenda.find(filtro);
        res.json(agendas);
    } catch (error) {
        console.error('Erro ao buscar agendas:', error);
        res.status(500).send('Erro ao buscar agendas');
    }
});

module.exports = router;
