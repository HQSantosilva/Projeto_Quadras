const mongoose = require('mongoose');

const quadraSchema = new mongoose.Schema({
    nome: String,
    foto: String,
    descricao: String
});

const Quadra = mongoose.model('Quadra', quadraSchema);

module.exports = Quadra;
