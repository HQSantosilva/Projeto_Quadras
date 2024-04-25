const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');const quadraRoutes = require('./routes/quadraRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const horarioRoutes = require('./routes/horarioRoutes');
const agendaRoutes = require('./routes/agendaRoutes');
const { buscarAgendamentos } = require('./models/agendamentoModel');
const modelListaAgenda = require('./models/modelListaAgenda');
const app = express();
const PORT = process.env.PORT || 3000;
app.use('/models', express.static('models'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/projeto')
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
    res.sendFile(__dirname + '/public/telas/menu/criarAgenda.html');
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/telas/menu/home.html');
});

app.get('/sobreNos', (req, res) => {
    res.sendFile(__dirname + '/public/telas/menu/sobreNos.html');
});

app.get('/contato', (req, res) => {
    res.sendFile(__dirname + '/public/telas/menu/contato.html');
});

app.get('/clienteGerenciar', (req, res) => {
    res.sendFile(__dirname + '/public/telas/menu/criarCliente.html');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/telas/menu/home.html');
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
    res.sendFile(path.join(__dirname, 'public', 'telas', 'listaAgenda.html'));
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

/*app.get('/api/dadosAgenda', async (req, res) => {
    try {
        const dadosAgenda = await modelListaAgenda.buscarDadosAgenda();
        res.json(dadosAgenda);
    } catch (error) {
        console.error('Erro ao buscar dados da agenda:', error);
        res.status(500).json({ error: 'Erro ao buscar dados da agenda' });
    }
});*/

app.get('/api/dadosAgenda', async (req, res) => {
    const { dataSelecionada } = req.query; 
    try {
        const dadosAgenda = await modelListaAgenda.buscarDadosAgendaPorData(dataSelecionada);
        res.json(dadosAgenda);
    } catch (error) {
        console.error('Erro ao buscar os dados da agenda:', error);
        res.status(500).json({ error: 'Erro ao buscar os dados da agenda' });
    }
});
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
