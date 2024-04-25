const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
    clienteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    quadraId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quadra',
        required: true
    },
    horarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Horario',
        required: true
    },
    dataReserva: {
        type: Date,
        required: true
    },
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
