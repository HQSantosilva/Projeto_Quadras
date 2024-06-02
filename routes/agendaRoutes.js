const express = require('express');
const Agenda = require('../models/agenda');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { clienteId, quadraId, horarioId, dataReserva } = req.body;

        const agenda = new Agenda({
            clienteId,
            quadraId,
            horarioId,
            dataReserva
        });

        await agenda.save();
        res.send('Agenda criada com sucesso!');
    } catch (error) {
        console.error('Erro ao criar agenda:', error);
        res.status(500).send('Erro ao criar agenda');
    }
});


router.put('/:id', async (req, res) => {
    const { clienteId, quadraId, horarioId, dataReserva, status } = req.body;
    try {
        const agenda = await Agenda.findByIdAndUpdate(req.params.id, {
            clienteId,
            quadraId,
            horarioId,
            dataReserva,
            status
        });
        res.send('Registro de agenda atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar agenda:', error);
        res.status(500).send('Erro ao atualizar agenda');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const agenda = await Agenda.findByIdAndDelete(req.params.id);
        res.send('Registro de agenda excluído com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir agenda:', error);
        res.status(500).send('Erro ao excluir agenda');
    }
});

router.get('/', async (req, res) => {
    try {
        const filtro = {};
        if (req.query.clienteId) filtro.clienteId = req.query.clienteId;
        if (req.query.quadraId) filtro.quadraId = req.query.quadraId;
        if (req.query.horarioId) filtro.horarioId = req.query.horarioId;
        if (req.query.dataReserva) filtro.dataReserva = req.query.dataReserva;
        if (req.query.status) filtro.status = req.query.status;

        const agendas = await Agenda.find(filtro);
        res.json(agendas);
    } catch (error) {
        console.error('Erro ao buscar agendas:', error);
        res.status(500).send('Erro ao buscar agendas');
    }
});

router.get('/horarios', async (req, res) => {
    try {
        const { quadraId } = req.query;
        const filtro = {};
        if (quadraId) filtro.quadraId = quadraId;

        const horarios = await Horario.find(filtro);
        res.json(horarios);
    } catch (error) {
        console.error('Erro ao buscar horários:', error);
        res.status(500).send('Erro ao buscar horários');
    }
});

module.exports = router;
