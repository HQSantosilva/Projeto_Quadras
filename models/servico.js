const mongoose = require('mongoose');

const servicoSchema = new mongoose.Schema({
    quadraId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quadra'
    },
    titulo: String,
    descricao: String,
    duracao: String,
    status: String,
    dataCadastro: {
        type: Date,
        default: Date.now
    }
});

const Servico = mongoose.model('Servico', servicoSchema);

module.exports = Servico;
