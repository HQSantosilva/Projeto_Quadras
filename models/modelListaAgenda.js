const Agenda = require('./agenda');
const Cliente = require('./cliente');
const Horario = require('./horario');
const Quadra = require('./quadra');

async function buscarDadosAgenda() {
    try {
        const dadosAgenda = await Agenda.find()
            .populate('clienteId', 'nome') 
            .populate('quadraId', 'nome') 
            .populate('horarioId', 'inicio fim'); 

        const dadosFormatados = dadosAgenda.map(agenda => ({
            id: agenda._id,
            dataReserva: agenda.dataReserva,
            status: agenda.status,
            clienteNome: agenda.clienteId.nome,
            quadraNome: agenda.quadraId.nome,
            horarioInicio: agenda.horarioId.inicio,
            horarioFim: agenda.horarioId.fim
        }));

        return dadosFormatados;
    } catch (error) {
        console.error('Erro ao buscar os dados da agenda:', error);
        throw error;
    }
}
module.exports = { buscarDadosAgenda };
