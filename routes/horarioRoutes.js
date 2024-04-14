const express = require('express');
const Horario = require('../models/horario');

const router = express.Router();

// Rota para lidar com as requisições POST do formulário de criação de quadra
router.post('/criar', async (req, res) => {
    try {
        const { quadraId, servicoId, dias, inicio, fim, dataCadastro } = req.body;

        const horario = new Horario({
            quadraId, 
            servicoId, 
            dias, 
            inicio, 
            fim, 
            dataCadastro
        });

        await horario.save();
        res.send('Horário criado com sucesso!');
    } catch (error) {
        console.error('Erro ao criar horário:', error);
        res.status(500).send('Erro ao criar horário');
    }
});

router.put('/:id', async (req, res) => {
    const { quadraId, servicoId, dias, inicio, fim, dataCadastro } = req.body;
    try {
        const horario = await Horario.findByIdAndUpdate(req.params.id, {
            quadraId, 
            servicoId, 
            dias, 
            inicio, 
            fim, 
            dataCadastro
        });
        res.send('Registro de horário atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar horário:', error);
        res.status(500).send('Erro ao atualizar horário');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const horario = await Horario.findByIdAndDelete(req.params.id);
        res.send('Registro de horário excluído com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir horário:', error);
        res.status(500).send('Erro ao excluir horário');
    }
});


router.get('/', async (req, res) => {
    try {
        const filtro = {};
        if (req.query.quadraId) {
            filtro.quadraId = req.query.quadraId;
        }
        if (req.query.servicoId) {
            filtro.servicoId = req.query.servicoId;
        }
        if (req.query.dias) {
            filtro.dias = req.query.dias;
        }
        if (req.query.inicio) {
            filtro.inicio = req.query.inicio;
        }
        if (req.query.fim) {
            filtro.fim = req.query.fim;
        }
        if (req.query.dataCadastro) {
            filtro.dataCadastro = req.query.dataCadastro;
        }

        const horarios = await Horario.find(filtro);

        res.json(horarios);
    } catch (error) {
        console.error('Erro ao buscar agendas:', error);
        res.status(500).send('Erro ao buscar agendas');
    }
});
module.exports = router;
