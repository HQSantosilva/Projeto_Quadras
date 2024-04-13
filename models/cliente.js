const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    nome: String,
    email: String,
    cpf: String,
    telefone: String,
    endereco: String
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
