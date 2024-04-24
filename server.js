const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); 
const quadraRoutes = require('./routes/quadraRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const horarioRoutes = require('./routes/horarioRoutes');
const agendaRoutes = require('./routes/agendaRoutes');
const { buscarAgendamentos } = require('./models/agendamentoModel');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/projeto', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexão com MongoDB estabelecida'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.use('/quadras', quadraRoutes);
app.use('/clientes', clienteRoutes);
app.use('/horarios', horarioRoutes);
app.use('/api/agendamentos', agendaRoutes);

const Cliente = require('./models/cliente');
const Quadra = require('./models/quadra');
const Horario = require('./models/horario');
const Agenda = require('./models/agenda');

app.get('/criarCliente', (req, res) => {
    res.sendFile(__dirname + '/public/telas/criarCliente.html');
});

app.get('/criarQuadra', (req, res) => {
    res.sendFile(__dirname + '/public/telas/criarQuadra.html');
});

app.get('/criarHorario', (req, res) => {
    res.sendFile(__dirname + '/public/telas/criarHorario.html');
});

app.get('/criarAgenda', (req, res) => {
    res.sendFile(__dirname + '/public/telas/criarAgenda.html');
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/telas/index.html');
});

app.get('/api/clientes', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        console.error('Erro ao obter clientes:', error);
        res.status(500).send('Erro ao obter clientes');
    }
});

app.get('/api/horarios', async (req, res) => {
    try {
        const horarios = await Horario.find();
        res.json(horarios);
    } catch (error) {
        console.error('Erro ao obter horários:', error);
        res.status(500).send('Erro ao obter horários');
    }
});

app.get('/api/quadras', async (req, res) => {
    try {
        const quadras = await Quadra.find();
        res.json(quadras);
    } catch (error) {
        console.error('Erro ao obter quadras:', error);
        res.status(500).send('Erro ao obter quadras');
    }
});

app.get('/listaAgenda', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'telas/listaAgenda.html'));
});

app.get('/agendamentos', async (req, res) => {
    try {
        const agendamentos = await buscarAgendamentos();
        res.json(agendamentos);
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        res.status(500).json({ error: 'Erro ao buscar agendamentos' });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
