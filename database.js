const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/projeto', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexão com MongoDB estabelecida'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

module.exports = mongoose;
