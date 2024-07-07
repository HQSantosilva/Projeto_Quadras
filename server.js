require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Adicionando cookie-parser

const quadraRoutes = require('./routes/quadraRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const horarioRoutes = require('./routes/horarioRoutes');
const agendaRoutes = require('./routes/agendaRoutes');
const { buscarAgendamentos } = require('./models/agendamentoModel');
const modelListaAgenda = require('./models/modelListaAgenda');
const Cliente = require('./models/cliente');
const Horario = require('./models/horario');
const Quadra = require('./models/quadra');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('/models', express.static('models'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/projeto')
    .then(() => console.log('Conexão com MongoDB estabelecida'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const cliente = await Cliente.findOne({ email, senha });
        if (cliente) {
            res.status(200).json({ message: 'Login realizado com sucesso', data: cliente });
        } else {
            res.status(401).json({ message: 'Email ou senha incorretos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao realizar login' });
    }
});




app.use('/quadras', quadraRoutes);
app.use('/clientes', clienteRoutes);
app.use('/horarios', horarioRoutes);
app.use('/agenda', agendaRoutes);

// Rotas para enviar arquivos estáticos HTML
app.get('/criarCliente', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'telas', 'menu', 'criarCliente.html'));
});

app.get('/criarQuadra', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'telas', 'menu', 'criarQuadra.html'));
});

app.get('/gerenciarQuadra', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'telas', 'menu', 'gerenciarQuadra.html'));
});

app.get('/criarHorario', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'telas', 'menu', 'criarHorario.html'));
});

app.get('/gerenciarHorario', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'telas', 'menu', 'gerenciarHorario.html'));
});

app.get('/criarAgenda', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'telas', 'menu', 'criarAgenda.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'telas', 'menu', 'home.html'));
});

app.get('/sobreNos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'telas', 'menu', 'sobreNos.html'));
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'telas', 'menu', 'contato.html'));
});

app.get('/gerenciarCliente', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'telas', 'menu', 'gerenciarCliente.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'telas', 'menu', 'home.html'));
});

// Exemplo de rota protegida que retorna dados
app.get('/api/clientes', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        console.error('Erro ao obter clientes:', error);
        res.status(500).send('Erro ao obter clientes');
    }
});

// Exemplo de rota protegida que retorna dados
app.get('/api/horarios', async (req, res) => {
    try {
        const horarios = await Horario.find();
        res.json(horarios);
    } catch (error) {
        console.error('Erro ao obter horários:', error);
        res.status(500).send('Erro ao obter horários');
    }
});

// Exemplo de rota protegida que retorna dados
app.get('/quadras', async (req, res) => {
    try {
        const quadras = await Quadra.find();
        res.json(quadras);
    } catch (error) {
        console.error('Erro ao obter quadras:', error);
        res.status(500).send('Erro ao obter quadras');
    }
});

// Exemplo de rota que retorna um arquivo HTML estático
app.get('/listaAgenda', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'telas', 'listaAgenda.html'));
});

// Exemplo de rota protegida que retorna dados
app.get('/agendamentos', async (req, res) => {
    try {
        const agendamentos = await buscarAgendamentos();
        res.json(agendamentos);
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        res.status(500).json({ error: 'Erro ao buscar agendamentos' });
    }
});

// Exemplo de rota protegida que retorna dados
app.get('/api/dadosAgenda', async (req, res) => {
    try {
        const dadosAgenda = await modelListaAgenda.buscarDadosAgenda();
        res.json(dadosAgenda);
    } catch (error) {
        console.error('Erro ao buscar dados da agenda:', error);
        res.status(500).json({ error: 'Erro ao buscar dados da agenda' });
    }
});

// Exemplo de rota protegida que retorna dados
app.get('/api/dadosAgendaData', async (req, res) => {
    const { dataSelecionada } = req.query;
    try {
        const dadosAgenda = await modelListaAgenda.buscarDadosAgendaPorData(dataSelecionada);
        res.json(dadosAgenda);
    } catch (error) {
        console.error('Erro ao buscar os dados da agenda:', error);
        res.status(500).json({ error: 'Erro ao buscar os dados da agenda' });
    }
});

// Exemplo de rota que retorna configurações protegidas
app.get('/config', (req, res) => {
    res.json({ API_URL: process.env.API_URL });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
