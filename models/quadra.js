const mongoose = require('mongoose');

const quadraSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    descricao: String,
    tipo: {
        type: String,
        enum: ['futsal', 'campo'],
        required: true
    },
    foto: String,
    dataDeCadastro: {
        type: Date,
        default: Date.now
    }
});

const Quadra = mongoose.model('Quadra', quadraSchema);

module.exports = Quadra;
