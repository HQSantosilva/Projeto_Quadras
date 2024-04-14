const express = require('express');
const mongoose = require('mongoose');
const quadraRoutes = require('./routes/quadraRoutes');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Conexão com o banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/projeto', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexão com MongoDB estabelecida'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rota para as quadras
app.use('/quadras', quadraRoutes);

// Rota para os clientes
app.use('/clientes', clienteRoutes);

app.get('/cliente', (req, res) => {
    res.sendFile(__dirname + '/public/telas/cliente.html');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/telas/index.html');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
