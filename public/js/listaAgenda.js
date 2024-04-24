async function preencherGrade() {
    try {
        const response = await fetch('/api/dadosAgenda');
        const dadosAgenda = await response.json();
        const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
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
    } catch (error) {
        console.error('Erro ao preencher a grade:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    preencherGrade();
});
