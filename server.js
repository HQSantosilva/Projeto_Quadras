const express = require('express');
const mongoose = require('mongoose');
const quadraRoutes = require('./routes/quadraRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const servicoRoutes = require('./routes/servicoRoutes');
const horarioRoutes = require('./routes/horarioRoutes');
const agendaRoutes = require('./routes/agendaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Conexão com o banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/projeto', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexão com MongoDB estabelecida'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.use('/quadras', quadraRoutes);
app.use('/clientes', clienteRoutes);
app.use('/servicos', servicoRoutes);
app.use('/horarios', horarioRoutes);
app.use('/agendas', agendaRoutes);

app.get('/cliente', (req, res) => {
    res.sendFile(__dirname + '/public/telas/criarCliente.html');
});

app.get('/quadra', (req, res) => {
    res.sendFile(__dirname + '/public/telas/criarQuadra.html');
});

app.get('/horario', (req, res) => {
    res.sendFile(__dirname + '/public/telas/criarHorario.html');
});

app.get('/agenda', (req, res) => {
    res.sendFile(__dirname + '/public/telas/criarAgenda.html');
});

app.get('/servico', (req, res) => {
    res.sendFile(__dirname + '/public/telas/criarServico.html');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/telas/index.html');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
