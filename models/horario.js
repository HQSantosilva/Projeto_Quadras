const mongoose = require('mongoose');

const horarioSchema = new mongoose.Schema({
    quadraId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quadra'
    },
    dias: {
        type: [String],
        enum: ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo']
    },
    inicio: String,
    fim: String,
    dataCadastro: {
        type: Date,
        default: Date.now
    }
});

const Horario = mongoose.model('Horario', horarioSchema);

module.exports = Horario;
