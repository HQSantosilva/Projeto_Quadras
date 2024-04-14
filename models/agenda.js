const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
    clienteId : Number,
    quadraId : Number,
    servicoId : Number,
    dataReserva : Date,
    dataCadastro : Date
});

const Agenda = mongoose.model('Agenda', agendaSchema);

module.exports = Agenda;
