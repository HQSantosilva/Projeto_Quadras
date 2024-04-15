const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
    clienteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    quadraId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quadra'
    },
    servicoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Servico'
    },
    dataReserva: Date,
    dataCadastro: {
        type: Date,
        default: Date.now
    }
});

const Agenda = mongoose.model('Agenda', agendaSchema);

module.exports = Agenda;
