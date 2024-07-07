const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    telefone: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    endereco: String,
    status: {
        type: String,
        default: 'Ativo'
    },
    dataCadastro: {
        type: Date,
        default: Date.now
    },
    tipo: {
        type: String,
        required: true,
        default: 'user'
    }
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
