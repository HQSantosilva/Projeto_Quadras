async function preencherGrade(dataSelecionada) {
    try {
        // Faz uma solicitação HTTP para buscar os dados da agenda com base na data selecionada
        const dataSelecionada = document.getElementById('dataSelecionada').value;
        const response = await fetch(`/api/dadosAgenda?dataSelecionada=${dataSelecionada}`);
        
        if (!response.ok) {
            throw new Error('Erro ao obter os dados da agenda');
        }
        
        if (response.ok) {
            const dadosAgenda = await response.json();
            const diasSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
            const horasDia = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
            const tabela = document.getElementById('tabelaAgenda');
        
            let tabelaHTML = `
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th></th> <!-- Célula vazia no canto superior esquerdo -->
                            ${diasSemana.map(dia => `<th>${dia}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
            `;
        
            horasDia.forEach(hora => {
                tabelaHTML += '<tr>';
                tabelaHTML += `<th>${hora}</th>`;
                diasSemana.forEach(dia => {
                    const dado = dadosAgenda.find(item => item.horarioInicio === hora && item.diaSemana === dia);
                    if (dado) {
                        tabelaHTML += `<td>${dado.status}</td>`; 
                    } else {
                        tabelaHTML += '<td>Disponível</td>'; 
                    }
                });
                tabelaHTML += '</tr>';
            });
        
            tabelaHTML += `
                    </tbody>
                </table>
            `;
        
            tabela.innerHTML = tabelaHTML;
        }
    } catch (error) {
        console.error('Erro ao preencher a grade:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const inputData = document.getElementById('dataSelecionada');
    const hoje = new Date();
    const dataHojeFormatada = hoje.toISOString().split('T')[0];
    const tabela = document.getElementById('tabelaAgenda');
    inputData.value = dataHojeFormatada;
    if (tabela) {
        preencherGrade();
    } else {
        console.error('Elemento com ID "tabelaAgenda" não encontrado.');
    }
});
