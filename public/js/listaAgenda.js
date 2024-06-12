async function preencherGrade() {
    try {
        const dataSelecionada = document.getElementById('dataSelecionada').value;
        const response = await fetch(`http://localhost:3000/api/dadosAgendaData?dataSelecionada=${dataSelecionada}`);

        if (!response.ok) {
            throw new Error('Erro ao obter os dados da agenda');
        }

        if (response.ok) {
            const dadosAgenda = await response.json();
            const tabela = document.getElementById('agenda-list');
            let tabelaHTML = '';

            dadosAgenda.forEach(item => {
                const dataReservaFormatada = new Date(item.dataReserva).toLocaleDateString('pt-BR');
                tabelaHTML += `
                    <tr>
                        <td>${item.clienteNome}</td>
                        <td>${item.quadraNome}</td>
                        <td>${dataReservaFormatada}</td>
                        <td>${item.horarioInicio}:00 - ${item.horarioFim}:00</td>
                        <td>${item.status}</td>
                    </tr>
                `;
            });

            tabela.innerHTML = tabelaHTML;
        }
    } catch (error) {
        console.error('Erro ao preencher a grade:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const inputData = document.getElementById('dataSelecionada');
    if (inputData) {
        const hoje = new Date();
        const dataHojeFormatada = hoje.toISOString().split('T')[0];
        inputData.value = dataHojeFormatada;

        preencherGrade();

        inputData.addEventListener('change', preencherGrade);
    } else {
        console.error('Elemento com ID "dataSelecionada" não encontrado.');
    }
});
