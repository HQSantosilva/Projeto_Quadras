const mongoose = require('mongoose');

const horarioSchema = new mongoose.Schema({
    quadraId : Number,
    servicoId : Number, 
    dias : Number, 
    inicio : Date, 
    fim : Date, 
    dataCadastro : Date
});

const Horario = mongoose.model('Horario', horarioSchema);

module.exports = Horario;
