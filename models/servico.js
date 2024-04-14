const mongoose = require('mongoose');

const servicoSchema = new mongoose.Schema({
    quadraId : Number,
    titulo : String,
    descricao : String,
    duracao : String,
    status : String,
    dataCadastro : Date
});

const Servico = mongoose.model('Servico', servicoSchema);

module.exports = Servico;
