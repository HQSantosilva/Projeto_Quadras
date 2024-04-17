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
    horarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Horario'
    },
    dataReserva: Date,
    dataCadastro: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Ativo', 'Pendente', 'Recusado'],
        default: 'Pendente'
    }
});

const Agenda = mongoose.model('Agenda', agendaSchema);

module.exports = Agenda;
