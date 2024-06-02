const Agenda = require('./agenda');
const Cliente = require('./cliente');
const Horario = require('./horario');
const Quadra = require('./quadra');

async function buscarDadosAgendaPorData(dataSelecionada) {
    try {
        // Calcula a data final (7 dias após a data selecionada)
        const dataFinal = new Date(dataSelecionada);
        dataFinal.setDate(dataFinal.getDate() + 7);

        // Realiza a consulta na base de dados com base nas datas selecionadas
        const dadosAgenda = await Agenda.find({
            dataReserva: {
                $gte: new Date(dataSelecionada),
                $lt: new Date(dataFinal)
            }
        })
        .populate('clienteId', 'nome') 
        .populate('quadraId', 'nome') 
        .populate('horarioId', 'inicio fim'); 

        // Formata os dados obtidos conforme necessário
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

module.exports = { buscarDadosAgendaPorData };
