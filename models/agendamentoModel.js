const Agendamento = require('./agenda');

async function buscarAgendamentos() {
    try {
        const agendamentos = await Agendamento.find({})
            .populate('idQuadra', 'nome')
            .populate('idHorario', 'inicio fim')
            .populate('idUsuario', 'nome')
            .exec();
        return agendamentos;
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        throw error;
    }
}

module.exports = { buscarAgendamentos };
